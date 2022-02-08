import React from "react";
import { Button } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import tinycolor from "tinycolor2";

import useStyles from "./styles";

export default function Notification({ variant, ...props }) {
  var classes = useStyles();
  var theme = useTheme();

  return (
    <div
      className={'contained'}
    >
      <div className={classes.messageContainer}>
        {props.extraButton && props.extraButtonClick && (
          <Button
            onClick={props.extraButtonClick}
            disableRipple
            className={classes.extraButton}
          >
            {props.extraButton}
          </Button>
        )}
      </div>
    </div>
  );
}