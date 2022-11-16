import App from "./App.svelte";
import { initialize_database } from "./database/Sqlite";

const app = new App({
  target: document.getElementById("app"),
});
export default app;

initialize_database();
