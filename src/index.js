import React from "react";
import ReactDOM from "react-dom";
import AppComponent from "./components/App";
import "./index.css";
const NewApp = require("./components/App").default;

function renderApp(App) {
  ReactDOM.render(<App />, document.getElementById("root"));
}

renderApp(AppComponent);

if (module.hot) {
  module.hot.accept("./components/App", () => {
    renderApp(NewApp);
  });
}
