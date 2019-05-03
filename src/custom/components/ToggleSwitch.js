import React from "react";
import Switch from "@material-ui/core/Switch";

export function ToggleSwitch({ state, onChange }) {
  return (
    <div>
      <Switch
        checked={state}
        onChange={onChange}
        value="sameAsBilling"
      />
    </div>
  );
}
