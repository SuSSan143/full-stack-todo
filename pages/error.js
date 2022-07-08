import React from "react";
import { useRouter } from "next/router";

const Error = () => {
  const { error } = useRouter().query;
  console.log(error)
  return <div>error</div>;
};

export default Error;
