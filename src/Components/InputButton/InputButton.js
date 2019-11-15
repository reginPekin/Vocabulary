import React from "react";

import { EditingInput } from "../EditingInput";
import { Button } from "../Button";

export const InputButton = ({
  visibility,
  changeVisibility,
  onChange,
  text,
  inputClassName = null,
  buttonClassName = null
}) => {
  console.log(visibility);
  if (!visibility) {
    return (
      <EditingInput
        inputClassName={inputClassName}
        value={text}
        changeVisibility={() => changeVisibility(true)}
        onSubmit={value => {
          onChange(value);
        }}
      />
    );
  }
  return (
    <Button
      onClick={() => changeVisibility(false)}
      buttonClassName={buttonClassName}
    >
      {text}
    </Button>
  );
};
