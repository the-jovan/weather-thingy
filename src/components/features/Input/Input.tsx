import React, { FunctionComponent } from "react";
import classes from "./input.module.scss";

import Button from "../../ui/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Input: FunctionComponent<{
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  placeholder: string;
  addFn: () => void;
  searchFn: () => void;
}> = ({ searchTerm, setSearchTerm, placeholder, addFn, searchFn }) => {
  return (
    <div className={classes.wrapper}>
      <Button
        customClass={classes.plus}
        type="circle"
        text={<FontAwesomeIcon icon={faPlus} />}
        clickFn={addFn}
      />
      <input
        className={classes.input}
        type="text"
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.currentTarget.value)
        }
        placeholder={placeholder}
      />
      <Button
        customClass={classes.search}
        type="regular"
        text="Search"
        clickFn={searchFn}
      />
    </div>
  );
};

export default Input;
