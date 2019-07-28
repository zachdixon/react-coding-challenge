import React from "react";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import Badge from "@material-ui/core/Badge";
import { MessageContent } from "./Message";

const useStyles = makeStyles(theme => ({
  header: {
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    textTransform: "capitalize"
  },
  messageContent: {
    marginBottom: theme.spacing(1)
  }
}));

export default function MessageColumn({
  title,
  priority,
  messages,
  onRemove,
  onRemoveAll
}) {
  const classes = useStyles();
  return (
    <Grid item md={4} xs={12}>
      <header className={classes.header}>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
        <div>
          <IconButton onClick={() => onRemoveAll(priority)}>
            <Badge badgeContent={messages.length} color="secondary">
              <DeleteSweepIcon />
            </Badge>
          </IconButton>
        </div>
      </header>
      {messages.map(message => (
        <MessageContent
          key={message.id}
          {...message}
          onClose={() => onRemove(message.id)}
          className={classes.messageContent}
        />
      ))}
    </Grid>
  );
}
