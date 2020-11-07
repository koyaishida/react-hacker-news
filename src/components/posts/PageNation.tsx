import React, { useCallback } from "react";
import styled from "styled-components";

const PageNationContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

type Props = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const PageNation: React.FC<Props> = ({ currentPage, setCurrentPage }) => {
  const prevPage = useCallback(() => {
    setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
  }, [setCurrentPage]);

  const nextPage = useCallback(() => {
    setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
  }, [setCurrentPage]);

  return (
    <PageNationContainer>
      {currentPage !== 1 ? <p onClick={prevPage}>prev</p> : <div></div>}
      <p>page {`${currentPage}/10`}</p>
      {currentPage !== 10 ? <p onClick={nextPage}>more</p> : <div></div>}
    </PageNationContainer>
  );
};

export default PageNation;
