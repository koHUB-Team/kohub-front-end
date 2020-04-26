import React from "react";
import ReactDOM from "react-dom";
import Root from "./client/Root";
import * as serviceWorker from "./serviceWorker";
import "./index.scss";

ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.unregister();
// serviceWorker.register();
// webpack-dev-server, --open : 자동으로 브라우저 열어줌, --hot : hot realod 저장했을 때 자동적으로 reload 해줌
// "start": "cross-env NODE_PATH=src react-scripts start",
//"build": "cross-env NODE_PATH=src react-scripts build",
