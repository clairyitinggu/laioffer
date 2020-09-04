import React from "react";
import Main from './Main';
import TopBar from "./TopBar";
import { TOKEN_KEY} from "./constants";

class ClassicFormPage extends React.Component {
    state = {
        isLoggedIn: Boolean(localStorage.getItem(TOKEN_KEY)),
    }

    handleLoginSucceed = (token) => {
        console.log("store token: ", token);
        localStorage.setItem(TOKEN_KEY, token)
        this.setState({isLoggedIn: true});
    }

    handleLogout = () => {
        localStorage.removeItem(TOKEN_KEY);
        this.setState({isLoggedIn: false});
    }

    render() {
        return (
            <div id="classicformpage">
                <TopBar/>

                <Main
                    handleLogout={this.handleLogout}
                    handleLoginSucceed={this.handleLoginSucceed}
                    isLoggedIn={this.state.isLoggedIn}
                />
            </div>
        );
    }
}

export default ClassicFormPage;