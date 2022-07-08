// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import absoluteUrl from "next-absolute-url";

const handler = async (req, res) => {
  const { filter, userId, token } = req.query;
  const { origin } = absoluteUrl(req);
  const {
    data: { todos },
  } = await axios.get(`${origin}/api/getTodo?userId=${userId}&token=${token}`);

  let filteredTodoList = [...todos];

  if (filter === "Completed") {
    filteredTodoList = [...todos.filter((item) => item.isCompleted)];
  }

  if (filter === "Active") {
    filteredTodoList = [...todos.filter((item) => !item.isCompleted)];
  }

  res.json({ filteredTodoList });
};

export default handler;
