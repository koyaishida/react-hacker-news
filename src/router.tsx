import React from "react";
import { Switch, Route } from "react-router";
import { PostList, Comments, UserMyPage } from "./templates";
// import Auth from "./Auth";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={PostList} />
      <Route exact path="/comments/:id" component={Comments} />
      <Route exact path="/usermypage" component={UserMyPage} />
    </Switch>
  );
};

export default Router;
