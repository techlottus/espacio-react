import React from "react";
import { Navbar } from "./components/Navbar/Navbar";
import ScreenError from "./shared/ScreenError/ScreenError";
import './ErrorBoundary.scss';
import { texts } from "./texts/indexText";
import { Button } from "./components/Button/Button";
import env from './enviroment/environment';
import { postLogErrorsHttp } from "./services/logs/logsService";
import { getImageOfAssetsMark } from "./helpers/getImages";

const buttonError = {
  type: "primary",
  title: "Ir a login",
  size: "small",
  icon: "",
  lyIcon: false,
  disabled: false,
  isExpand: false,
};

const dataNavBar = {
  urlLogo: getImageOfAssetsMark(texts?.terms?.images?.navBar),
  iconsRight: [],
};

class ErrorBoundary extends React.Component {


  constructor(props) {
    super(props);
    this.state = { hasError: false, msg: null };
  }

  onLogo() {
    window.location.href = env.redirectLoginHome + '/login';
  }

  componentDidCatch(error, info) {
    const { message } = new Error(error);
    // Display fallback UI
    this.setState({ hasError: true, msg: message });
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, info);

  }

  render() {
    const { history } = this.props;
    if (this.state.hasError) {
      postLogErrorsHttp(this.state.msg,history.pathname).then(() => {});;
      return (
        <div className="errorboundary-container">
          <Navbar data={dataNavBar} onLogo={this.onLogo}/>
          <ScreenError msg="Estamos teniendo problemas" />
          <div style={{
            marginTop: "24px",
            marginBottom: "24px",
            fontSize: "16px"
          }}>{this.state.msg}</div>
          <Button data={buttonError} onClick={this.onLogo} />
        </div>
      )
    }
    return this.props.children;
  }
}

export default ErrorBoundary;