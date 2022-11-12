// import "./style.css";
// import "dotenv/config";
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app"),
});

console.log(import.meta.env.VITE_GRAPHQL_ENDPOINT);
export default app;
