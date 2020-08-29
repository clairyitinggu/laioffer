import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./assets/css/style.css";
import Form from "./components/Form";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";

<<<<<<< HEAD
ReactDOM.render(<Form />, document.getElementById("root"));
=======
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root"));
>>>>>>> 840b046b9336df31c3cbfba308db6233ccf9524f

registerServiceWorker();