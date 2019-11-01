import React, { useState } from "react";

import * as sdk from "../../sdk";

import { Button } from "../Button";
import { EditingInput } from "../EditingInput";

export const InfoBox = ({ folder, onRename = () => null }) => {
  const [visibility, setVisibility] = useState(true);
  const changeVisibility = () => setVisibility(!visibility);

  if (visibility)
    return <Button onClick={() => changeVisibility()} value={folder.name} />;

  return (
    <EditingInput
      initialState={folder.name}
      changeVisibility={changeVisibility}
      onSubmit={value =>
        sdk.renameFolder(folder.id, value).then(() => onRename(value))
      }
    />
  );
};
