import { store } from "./store";
import { render } from "./render";
import { createMessanger } from "./app";
import { sleep } from "./sleep";

describe("app", () => {
  document.body.append(document.createElement("div"));
  // const div = document.querySelector("div") as HTMLDivElement;

  beforeAll(() => {
    store.subscribe(render);
    createMessanger(document.querySelector("div") as HTMLDivElement);
  });

  it.skip("displays messages", async () => {
    const buttons = document.querySelectorAll("button");
    const input = document.querySelector("input") as HTMLInputElement;
    const form = document.querySelector("form") as HTMLFormElement;

    // clear chat
    buttons[0].dispatchEvent(new Event("click"));
    await sleep(1000);
    input.value = "first test msg";
    form.dispatchEvent(new Event("click"));
    await sleep(1000);

    input.value = "second test msg";
    form.dispatchEvent(new Event("click"));

    await sleep(1000);
    const messages = document.querySelectorAll("p");
    console.log(messages[0]);
    expect(messages.length).toBe(2);
  });
});
