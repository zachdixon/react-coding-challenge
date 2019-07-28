import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import useApi from "../api";
import Message from "./Message";
import MessageColumn from "./MessageColumn";
import { Priorities } from "../constants";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  container: {
    padding: theme.spacing(3)
  },
  btnController: {
    marginRight: theme.spacing(3)
  },
  columnWrapper: {
    padding: theme.spacing(2.5)
  }
}));

export default React.memo(function MessageList() {
  const classes = useStyles();
  const { messages, start, stop, remove, removeAll, isRunning } = useApi({
    run: true
  });
  const toggleMessageGenerator = useCallback(() => {
    isRunning ? stop() : start();
  }, [isRunning, start, stop]);
  return (
    <>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container justify="center">
          <Button
            variant="contained"
            color="primary"
            onClick={toggleMessageGenerator}
            className={classes.btnController}
          >
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => removeAll()}
          >
            Clear
          </Button>
        </Grid>
        <div className={classes.columnWrapper}>
          <Grid container spacing={5}>
            {Object.keys(Priorities).map(priority => (
              <MessageColumn
                key={priority}
                priority={priority}
                title={Priorities[priority]}
                messages={messages.filter(
                  message => message.priority === parseInt(priority)
                )}
                onRemove={remove}
                onRemoveAll={removeAll}
              />
            ))}
          </Grid>
        </div>
      </Container>
      {!!messages.length && messages[0].priority === 1 && (
        <Message
          key={messages[0].id}
          message={messages[0].message}
          priority={messages[0].priority}
        />
      )}
    </>
  );
});
