// @ts-nocheck
import { useState } from "react";

import Head from "next/head";
import Image from "next/image";

import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import FormData from "form-data";

import {
  AddButton,
  ButtonContainer,
  DeleteItemButton,
  Form,
  Header,
  Heading,
  IconButton,
  Input,
  Main,
  NoItemImage,
  Text,
  TodoContainer,
  TodoFilterButton,
  TodoFilterContainer,
  TodoFooter,
  TodoFooterButton,
  TodoFooterText,
  TodoItem,
  TodoItemContainer,
  TodoItems,
} from "../components/TodoStyledComponents";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Todo({
  todos: receivedTodos,
  username,
  userID,
  theme,
  session,
}) {
  const [todoItem, setTodoItem] = useState("");
  const [todos, setTodos] = useState(receivedTodos);
  const [isLightTheme, setIsLightTheme] = useState(theme);
  const [todoFilterStatus, setTodoFilterStatus] = useState("All");
  const router = useRouter();

  const handleInputChange = (e) => {
    const { value } = e.target;
    setTodoItem(value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const todo = [{ item: todoItem }, ...todos];

    const { data } = await axios.post(
      `/api/setTodo?userId=${userID}&token=${session.jwt}`,
      {
        todo,
      }
    );

    setTodos(data.todo);
    setTodoItem("");
  };

  const deleteTodoItem = async (id) => {
    await axios.delete(
      `/api/deleteTodo/${id}?userId=${userID}&token=${session.jwt}`
    );

    setTodos((currentValue) => currentValue.filter((item) => item.id !== id));
  };

  const updateTodoList = async (id) => {
    const updatedTodo = todos.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isCompleted: !item.isCompleted,
        };
      }
      return item;
    });

    await axios.patch(`/api/setTodo?userId=${userID}&token=${session.jwt}`, {
      todo: updatedTodo,
    });
    setTodos(updatedTodo);
  };

  const filterTodoItem = async (e) => {
    const { innerHTML } = e.target;
    setTodoFilterStatus(innerHTML);
    const {
      data: { filteredTodoList },
    } = await axios.get(
      `/api/filterTodo?filter=${innerHTML}&userId=${userID}&token=${session.jwt}`
    );
    setTodos(filteredTodoList);
  };

  const clearCompleted = async () => {
    const ids = todos
      .filter((item) => {
        return item.isCompleted === true;
      })
      .map(({ id }) => id);

    await axios.patch(
      `/api/clearCompleted?userId=${userID}&token=${session.jwt}`,
      ids
    );

    setTodos((currentValues) =>
      currentValues.filter((item) => !ids.includes(item.id))
    );
  };

  const handleThemeChange = async () => {
    const body = new FormData();
    body.append("data", JSON.stringify({ isLightTheme: !isLightTheme }));
    await axios.put(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/todo-users/${userID}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${session.jwt}`,
        },
      }
    );
    setIsLightTheme(!isLightTheme);
  };

  const handleLogout = async () => {
    const { url } = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(url);
  };

  return (
    <>
      <Head>
        <title>TODO </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/favicon-32x32.png" />
      </Head>

      <Main islighttheme={isLightTheme}>
        <Header>
          <Heading>todo</Heading>
          <ButtonContainer>
            <IconButton onClick={handleLogout}>
              <Image
                src="/images/undraw_forgot_password_re_hxwm.svg"
                alt="login button"
                height={50}
                width={50}
              />
            </IconButton>
            <IconButton onClick={handleThemeChange}>
              <Image
                src={`/images/icon-${isLightTheme ? "sun" : "moon"}.svg`}
                alt="theme icon"
                height={25}
                width={25}
              />
            </IconButton>
          </ButtonContainer>
        </Header>
        <TodoContainer>
          <Form id="form" onSubmit={handleFormSubmit}>
            <Input
              islighttheme={isLightTheme.toString()}
              placeholder="Create a new Todo..."
              autoFocus
              required
              type="text"
              value={todoItem}
              onChange={handleInputChange}
            />
            <AddButton form="form" type="submit" value="Add" />
          </Form>
          <TodoItemContainer islighttheme={isLightTheme}>
            <TodoItems isScrollBarVisible={todos.length > 5}>
              {todos.length ? (
                todos.map((item) => (
                  <TodoItem key={item.id}>
                    <input
                      id={item.id}
                      checked={item.isCompleted}
                      type="checkbox"
                      onChange={() => updateTodoList(item.id)}
                    />
                    <Text
                      htmlFor={item.id}
                      islighttheme={isLightTheme}
                      isCompleted={item.isCompleted}
                    >
                      {item.item}
                    </Text>
                    <DeleteItemButton onClick={() => deleteTodoItem(item.id)}>
                      <Image
                        src="/images/icon-cross.svg"
                        alt="cancel icon"
                        height={16}
                        width={16}
                      />
                    </DeleteItemButton>
                  </TodoItem>
                ))
              ) : (
                <NoItemImage>
                  <span>No items yet</span>

                  <Image
                    src="/images/undraw_waiting__for_you_ldha.svg"
                    alt="no item image"
                    height={230}
                    width={230}
                  />
                </NoItemImage>
              )}
            </TodoItems>
            <TodoFooter>
              <TodoFooterText>{`${todos.length} items`}</TodoFooterText>
              <TodoFooterButton onClick={clearCompleted}>
                Clear Completed
              </TodoFooterButton>
            </TodoFooter>
          </TodoItemContainer>
        </TodoContainer>
        <TodoFilterContainer islighttheme={isLightTheme}>
          <TodoFilterButton
            currentStatus={todoFilterStatus}
            onClick={filterTodoItem}
          >
            All
          </TodoFilterButton>
          <TodoFilterButton
            currentStatus={todoFilterStatus}
            onClick={filterTodoItem}
          >
            Active
          </TodoFilterButton>
          <TodoFilterButton
            currentStatus={todoFilterStatus}
            onClick={filterTodoItem}
          >
            Completed
          </TodoFilterButton>
        </TodoFilterContainer>
      </Main>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return { props: { session } };
  }

  const filteredUser = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/todo-users?filters[users_permissions_user][id][$in]=${session.id}&populate=users_permissions_user`,
    {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
    }
  );

  let userID;
  let isLightTheme;

  if (filteredUser.data.data.length === 0 && session.provider !== "local") {
    const data = JSON.stringify({
      data: {
        users_permissions_user: session.id,
      },
    });
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/todo-users?populate=users_permissions_user`,
      headers: {
        Authorization: `Bearer ${session.jwt}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    const newUserdata = await axios(config);
    userID = newUserdata.data.data.id;
    isLightTheme = newUserdata.data.data.attributes.isLightTheme;
  } else {
    userID = filteredUser.data.data[0].id;
    isLightTheme = filteredUser.data.data[0].attributes.isLightTheme;
  }

  const {
    data: { data },
  } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/todo-users/${userID}?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
    }
  );
  const todos = data.attributes.todo;
  const username =
    data.attributes.users_permissions_user.data.attributes.username;

  return {
    props: {
      todos,
      username,
      userID,
      theme: isLightTheme,
      session,
    },
  };
}