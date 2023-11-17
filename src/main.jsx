import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

const colors = {
   primary: {
      900: "var(--primary-medium)",
      700: "var(--primary)",
   },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <BrowserRouter>
         <ChakraProvider theme={theme}>
            <App />
         </ChakraProvider>
      </BrowserRouter>
   </React.StrictMode>
);
