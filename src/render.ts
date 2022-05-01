import { store } from "./store";

export const render = function render() {
  const el = document.querySelector("div") as HTMLDivElement;
  const state = store.getState();
  const div = el.querySelector(".messanger") as HTMLDivElement;

  div.innerHTML = "";

  if (state.chatData.data.history.length > 1) {
    state.chatData.data.history.splice(1).forEach((element) => {
      const p = document.createElement("p");

      if (element.msg) {
        const sentDate = new Date(element.id);
        p.innerHTML = `
                <span>
                ${element.msg}
                </span>
                <span class='timer'>
                ${sentDate.getHours()}:${sentDate.getMinutes()}
                </span>
                `;
        div.append(p);
      }
    });
  } else {
    state.chatData.data.history.forEach((element) => {
      const p = document.createElement("p");

      if (element.msg) {
        const sentDate = new Date(element.id);
        p.innerHTML = `
                <span>
                ${element.msg}
                </span>
                <span class='timer'>
                ${sentDate.getHours()}:${sentDate.getMinutes()}
                </span>
                `;
        div.append(p);
      }
    });
  }

  div.scrollTop = 20000;
};
