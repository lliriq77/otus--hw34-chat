import { store } from "./store";
import { render } from "./render";
import { createMessanger } from "./app";
import { sleep } from "./sleep";

describe("render", () => {
  document.body.append(document.createElement("div"));
  const div = document.querySelector("div") as HTMLDivElement;

  beforeAll(() => {
    store.subscribe(render);
    createMessanger(document.querySelector("div") as HTMLDivElement);
  });

  it("creates markup", () => {
    expect(div.innerHTML).toBeTruthy();
  });

  it("has 2 buttons", () => {
    const buttons = document.querySelectorAll("button");

    expect(buttons.length).toBe(2);
  });

  it("has 1 input", () => {
    const inputs = document.querySelectorAll("input");

    expect(inputs.length).toBe(1);
  });

  it("displays messages", async () => {
    const buttons = document.querySelectorAll("button");
    const input = document.querySelector("input") as HTMLInputElement;
    const form = document.querySelector("form") as HTMLFormElement;

    // clear chat
    buttons[0].dispatchEvent(new Event("click"));
    input.value = "first test msg";
    form.dispatchEvent(new Event("click"));
    await sleep(2000);

    input.value = "second test msg";
    form.dispatchEvent(new Event("click"));

    await sleep(1000);
    const messages = document.querySelectorAll("p");
    expect(messages.length).toBe(2);
  });
});
