import { ApolloProvider } from "@apollo/client";
import { createRoot } from "react-dom/client";
import apolloClient from "./apollo-client.js";
import App from "./App.jsx";
import "./styles/global.scss";

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
);
