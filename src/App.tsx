import * as React from "react";
import Router from "./router";
import Header from "./components/header/Header";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 148px 0;
  max-width: 960px;
  text-align: "center";
  margin: 0 auto;
`;

function App() {
  return (
    <>
      <Header />
      <Wrapper>
        <Router />
      </Wrapper>
    </>
  );
}

export default App;
