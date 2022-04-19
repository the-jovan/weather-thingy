import React, { FunctionComponent } from "react";
import classes from "./input.module.scss";

import Button from "../../ui/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Input: FunctionComponent<{
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  placeholder: string;
}> = ({ searchTerm, setSearchTerm, placeholder }) => {
  return (
    <div className={classes.wrapper}>
      {/* one button here is unnecessary, since both look like they "add" new thing */}
      <Button
        customClass={classes.plus}
        type="circle"
        text={<FontAwesomeIcon icon={faPlus} />}
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
      <Button customClass={classes.add} type="regular" text="Add" />
    </div>
  );
};

export default Input;
