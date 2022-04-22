import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import store from "./store/store";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";

import App from "./App";
import NotFound from "./pages/404/NotFound";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ErrorBoundary
    FallbackComponent={NotFound}
    onReset={() => window.location.reload()}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>
);
