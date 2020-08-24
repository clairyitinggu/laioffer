import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./assets/css/style.css";
import Form from "./components/Form";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Form />, document.getElementById("root"));

registerServiceWorker();