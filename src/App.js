import React from "react";
import Main from './Main';
import TopBar from "./TopBar";


class ClassicFormPage extends React.Component {
  render() {
    return (
        <div id="classicformpage">
          <TopBar />

          <Main />
      </div>
    );
  }
}

export default ClassicFormPage;