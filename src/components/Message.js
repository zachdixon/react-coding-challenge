import React, { useState, useCallback } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Priorities } from "../constants";

const useStyles = makeStyles(() => ({
  content: {
    color: "#000"
  },
  close: {
    padding: 4
  },
  error: {
    backgroundColor: "#F56236"
  },
  info: {
    backgroundColor: "#88FCA3"
  },
  warning: {
    backgroundColor: "#FCE788"
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

export function MessageContent({
  className,
  id,
  message,
  priority,
  onClose,
  ...other
}) {
  const classes = useStyles();
  return (
    <SnackbarContent
      className={clsx(
        classes[Priorities[priority]],
        classes.content,
        className
      )}
      aria-describedby="message-id"
      message={<span id="message-id">{message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

export default function Message({
  id,
  message,
  priority,
  time,
  defaultOpen = true
}) {
  const [open, setOpen] = useState(defaultOpen);

  const handleClose = useCallback(
    (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    },
    [setOpen]
  );

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <MessageContent
        message={message}
        priority={priority}
        onClose={handleClose}
      />
    </Snackbar>
  );
}
