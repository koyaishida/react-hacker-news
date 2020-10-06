import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile, getElapsedTime } from "../reducks/posts/operation";
import { push } from "connected-react-router";

const UserMyPage = () => {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const path = selector.router.location.pathname;
  const id = path.split("/user/")[1];

  const [name, setName] = useState<string>();
  const [about, setAbout] = useState<string>();
  const [created, setCreated] = useState<number>(0);
  const [karma, setKarma] = useState<number>();

  useEffect(() => {
    getUserProfile(id).then((profile) => {
      setName(profile.id);
      setAbout(profile.about);
      setCreated(profile.created);
      setKarma(profile.karma);
      console.log(profile, "profile");
    });
  }, [id]);

  return (
    <div>
      <h3>ユーザーページ</h3>
      {name && (
        <div>
          <p>{id}</p>
          <p>{about}</p>
          <p>{getElapsedTime(created)}</p>
        </div>
      )}
      <button onClick={() => dispatch(push("/"))}>go back home</button>
    </div>
  );
};

export default UserMyPage;
