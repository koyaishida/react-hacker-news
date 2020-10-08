import React from "react";

const Comment: React.FC<any> = (props) => {
  console.log(props);
  return <div>{props.text}</div>;
};

export default Comment;
