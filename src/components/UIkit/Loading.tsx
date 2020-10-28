import React from "react";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import {
  getLoadingState,
  getLoadingText,
} from "../../reducks/loading/selector";
import styled from "styled-components";

const Wrapper = styled.section`
  padding: 144px;
  height: 840px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

const Loading: React.FC<any> = ({ children }) => {
  const selector = useSelector((state) => state);
  const isBeingLoaded = getLoadingState(selector);
  const loadingText = getLoadingText(selector);

  return (
    <div>
      {isBeingLoaded ? (
        <Wrapper>
          <ReactLoading
            type={"spinningBubbles"}
            color="#303e59"
            height={216}
            width={216}
          />
          <p>{loadingText}</p>
        </Wrapper>
      ) : (
        children
      )}
    </div>
  );
};

export default Loading;
