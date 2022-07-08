// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import FormData from "form-data";

const handler = async (req, res) => {
  const { userId, token } = req.query;
  const body = new FormData();
  const todoItem = req.body;
  body.append("data", JSON.stringify(todoItem));

  if (req.method === "POST") {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/todo-users/${userId}?populate=*`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { todo } = data.data.attributes;

    return res.status(200).json({ todo });
  }

  if (req.method === "PATCH") {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/todo-users/${userId}?populate=*`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { todo } = data.data.attributes;

    return res.status(200).json({ updatedTodoList: todo });
  }

  res.status(400).json({ error: `${req.method} method is not permited` });
};

export default handler;
