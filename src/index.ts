import { store } from "./store";
import { createMessanger } from "./app";
import "./css/index.css";
import { render } from "./render";

store.subscribe(render);
createMessanger(document.querySelector("div") as HTMLDivElement);
