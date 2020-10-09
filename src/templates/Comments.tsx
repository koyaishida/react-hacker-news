import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPost,
  getElapsedTime,
  // fetchComments,
} from "../reducks/posts/operation";
// import { fetchCommentsAction } from "../reducks/posts/actions";
import { getComments } from "../reducks/posts/selector";
import { Post } from "../reducks/posts/types";
import { push } from "connected-react-router";
import Comment from "../components/posts/Comment";

const Comments = () => {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const path = selector.router.location.pathname;
  const comments = getComments(selector);
  const id = path.split("/comments/")[1];
  const [post, setPost] = useState<Post>();
  // const [comments, setComments] = useState<any>([]);

  useEffect(() => {
    getPost(id).then((post) => {
      setPost(post);
    });
  }, [id, dispatch]);

  return (
    <div>
      {post && (
        <div>
          <p>{post.title}</p>
          <p>{post.by}</p>
          <p>{post.descendants}</p>
          <p>{getElapsedTime(post.time)}</p>
        </div>
      )}

      {comments.length > 0 &&
        comments.map((comment: any, i: any) => (
          <Comment comment={comment} key={i} />
        ))}
      <button onClick={() => dispatch(push("/"))}>go back home</button>
    </div>
  );
};

export default Comments;
