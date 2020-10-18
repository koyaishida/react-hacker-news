import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUserProfile, getElapsedTime } from "../.helper/posts";
import dompurify from "dompurify";

export const renderMarkup = (markup: string): { __html: string } => {
  return { __html: dompurify.sanitize(markup) };
};

const UserMyPage = () => {
  const selector = useSelector((state) => state);
  const path = selector.router.location.pathname;
  const id = path.split("/user/")[1];

  const [name, setName] = useState<string>();
  const [about, setAbout] = useState<string>("");
  const [created, setCreated] = useState<number>(0);
  const [karma, setKarma] = useState<number>();

  useEffect(() => {
    fetchUserProfile(id).then((profile) => {
      setName(profile.id);
      setAbout(profile.about);
      setCreated(profile.created);
      setKarma(profile.karma);
    });
  }, [id]);

  return (
    <div>
      <h3>ユーザー情報</h3>
      {name && (
        <div>
          <p>name：{name}</p>
          <p>created at:{getElapsedTime(created)}</p>
          <p>karma:{karma}</p>
          <div dangerouslySetInnerHTML={renderMarkup(about)} />
        </div>
      )}
    </div>
  );
};

export default UserMyPage;
