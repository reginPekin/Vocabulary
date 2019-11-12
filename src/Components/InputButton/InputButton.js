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
  if (!visibility) {
    return (
      <EditingInput
        inputClassName={inputClassName}
        value={text}
        changeVisibility={() => changeVisibility()}
        onSubmit={value => {
          onChange(value);
        }}
      />
    );
  }
  return (
    <Button
      onClick={() => changeVisibility()}
      buttonClassName={buttonClassName}
    >
      {text}
    </Button>
  );
};
