import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUserProfile, getElapsedTime } from "../.helper/posts";

const UserMyPage = () => {
  const selector = useSelector((state) => state);
  const path = selector.router.location.pathname;
  const id = path.split("/user/")[1];

  const [name, setName] = useState<string>();
  const [about, setAbout] = useState<string>();
  const [created, setCreated] = useState<number>(0);
  const [karma, setKarma] = useState<number>();

  useEffect(() => {
    fetchUserProfile(id).then((profile) => {
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
          <p>name：{name}</p>
          <p>description:{about}</p>
          <p>created at:{getElapsedTime(created)}</p>
          <p>karma:{karma}</p>
        </div>
      )}
    </div>
  );
};

export default UserMyPage;
