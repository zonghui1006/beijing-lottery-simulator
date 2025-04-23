import React from "react";
import ReactDOM from "react-dom/client";
import RootRouter from "./router"; // 上面写的组件
import "./index.css";
// import "antd/dist/antd.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootRouter />
  </React.StrictMode>
);
