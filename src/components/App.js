import React from "react";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import MessageList from "./MessageList";

const theme = createMuiTheme({});

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.grow}>
        <AppBar position="static">
          <Container maxWidth="lg">
            <Toolbar>
              <Typography variant="h6" noWrap>
                Help.com React Code Challenge
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
        <MessageList />
      </div>
    </ThemeProvider>
  );
}
