// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

const handler = async (req, res) => {
  const { userId, token } = req.query;

  const {
    data: { data },
  } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/todo-users/${userId}?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const todos = data.attributes.todo;

  res.status(200).json({ todos });
};

export default handler;
