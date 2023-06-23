import React from "react";
import "./App.scss";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from 'react-redux';
import { store } from "./store/store";
import Loading from "./components/Loading/Loading";
import Splash from "./components/Splash/Splash";
import ErrorBoundary from "./ErrorBoundary";
import Notification from "./components/Notification/Notification";
// import LibraryApp from "./config/LibraryApp";
import '@lottus23/lottus-elements-utc/elements';
import env from "./enviroment/environment";
// require('dotenv').config()

document.documentElement.style.setProperty("--typebrand",env.mark)

export const App = () => {

  return (
    <>
      <ErrorBoundary>
        {/* <LibraryApp /> */}
        <Provider store={store}>
          <AppRoutes />
          <Loading/>
          <Splash />
          <Notification />
        </Provider>
      </ErrorBoundary>
    </>
  );
};
