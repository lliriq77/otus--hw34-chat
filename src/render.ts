import { store } from "./store";

export const render = function render() {
  const el = document.querySelector("div") as HTMLDivElement;
  const state = store.getState();
  const div = el.querySelector(".messanger") as HTMLDivElement;

  div.innerHTML = "";

  Object.keys(state.chatData.data).forEach((key) => {
    const p = document.createElement("p");

    if (state.chatData.data[key] && key !== "10000000000") {
      const sentDate = new Date(state.chatData.data[key].id);
      p.innerHTML = `
                <span>
                ${state.chatData.data[key].body}
                </span>
                <span class='timer'>
                ${sentDate.getHours()}:${sentDate.getMinutes()}
                </span>
                `;
      div.append(p);
    }
  });

  div.scrollTop = 20000;
};
