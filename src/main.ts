// import "./style.css";
// import "dotenv/config";
import App from "./App.svelte";
import { initialize_database } from "./database/Sqlite";

const app = new App({
  target: document.getElementById("app"),
});

// initialize_database();
export default app;
