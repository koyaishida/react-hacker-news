import React from "react";
import styled from "styled-components";
import { TextInput } from "../UIkit";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchFieldContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

type Props = {
  query: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: (search: string) => void;
};

const SearchField: React.FC<Props> = ({ query, onChange, search }) => {
  return (
    <SearchFieldContainer>
      <TextInput
        type={"text"}
        label={" 検索"}
        onChange={onChange}
        value={query}
        required={false}
      />
      <FontAwesomeIcon
        onClick={() => search(query)}
        icon={faSearch}
        style={{ fontSize: 28 }}
      />
    </SearchFieldContainer>
  );
};

export default SearchField;
