import React, { useCallback } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

type Props = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const PageNation: React.FC<Props> = ({ currentPage, setCurrentPage }) => {
  const prevPage = useCallback(() => {
    setCurrentPage((prevCurrentPage) =>
      currentPage !== 1 ? prevCurrentPage - 1 : 1
    );
  }, []);

  const nextPage = useCallback(() => {
    if (currentPage === 10) {
      return;
    }
    setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
  }, []);

  return (
    <Wrapper>
      {currentPage !== 1 ? <p onClick={prevPage}>prev</p> : <div></div>}
      <p>page {`${currentPage}/10`}</p>
      {currentPage !== 10 ? <p onClick={nextPage}>more</p> : <div></div>}
    </Wrapper>
  );
};

export default PageNation;
