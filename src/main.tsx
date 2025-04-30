import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { parseAmplifyConfig } from "aws-amplify/utils";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

const amplifyConfig = parseAmplifyConfig(outputs);
Amplify.configure({
  ...amplifyConfig,
  API: {
    ...amplifyConfig.API,
    REST: outputs.custom.API,
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
