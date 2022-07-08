// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import FormData from "form-data";

const handler = async (req, res) => {
  const { id, userId, token } = req.query;

  const body = new FormData();

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/todo-users/${userId}?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const { todo } = data.data.attributes;

  const newTodo = todo.filter((item) => item.id.toString() !== id);

  body.append("data", JSON.stringify({ todo: newTodo }));

  await axios.put(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/todo-users/${userId}?populate=*`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.status(200).json({ newTodo });
};

export default handler;
