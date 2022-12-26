import React, { HTMLProps } from "react";

interface SearchBoxProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSearch: (input: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onSearch, ...rest }) => {
  return (
    <input
      type="text"
      className="form-control"
      id="seachbar"
      placeholder="Search..."
      value={value}
      onChange={(e) => {
        onSearch(e.currentTarget.value);
      }}
    />
  );
};

export default SearchBox;
