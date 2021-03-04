import { Button } from "@material-ui/core";
import React, { useState } from "react";

enum modeState {
  create,
  edit,
  read,
}

const EditSideBar = () => {
  const [mode, setMode] = useState(modeState.read);

  switch (mode) {
    case modeState.read:
      return (
        <div>
          <Button
            color="primary"
            type="button"
            onClick={() => {
              setMode(modeState.edit);
            }}
          >
            Edit Article
          </Button>
        </div>
      );

    case modeState.edit:
      return (
        <div>
          <Button
            color="primary"
            type="button"
            onClick={() => {
              setMode(modeState.read);
            }}
          >
            Save Article
          </Button>
        </div>
      );

    default:
      return <div>unknown mode</div>;
  }
};

export default EditSideBar;
