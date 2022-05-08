import { store } from "./store";
import { render } from "./render";
import { createMessanger } from "./app";

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
});
