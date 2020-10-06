import React from "react";
import { Switch, Route } from "react-router";
import { PostList, Comments, UserMyPage, SignIn, SignUp } from "./templates";
import Auth from "./Auth";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={PostList} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/comments/:id" component={Comments} />
      <Auth>
        <Route exact path="/usermypage" component={UserMyPage} />
      </Auth>
    </Switch>
  );
};

export default Router;
