import { ref, set, child, get, push, update } from "firebase/database";
import { store } from "./store";
import { database } from "./firebase";
import { render } from "./render";
import { initialState } from "./state";

export async function createMessanger(el: HTMLDivElement) {
  const state = store.getState();
  const socket = new WebSocket("ws://192.168.1.65:3030");

  socket.onclose = () => {
    console.log("socket closed");
  };

  socket.onopen = () => {
    console.log("socket opened");
  };

  socket.onmessage = async (event) => {
    store.dispatch({
      type: "SEND_MESSAGE",
      payload: JSON.parse(await event.data.text()),
    });
  };

  el.innerHTML = `
    <div class='header'>
    <span>Any Chat Name</span>
    <button class='header__button gray'>✂</button>
    </div>
<div class='messanger'></div>
<form class='form' onsubmit='return false;'>
<input class='form__input white' type='text'>
<button class='form__button gray' type ='submit'>→</button>
</form>
`;

  if (state.chatData.data) {
    render();
  }
  const input = el.querySelector("input") as HTMLInputElement;
  const form = el.querySelector("form") as HTMLFormElement;
  const clearButton = el.querySelector("button") as HTMLButtonElement;
  const db = ref(database);

  get(child(db, `chat/data`))
    .then((snapsht) => {
      if (snapsht.exists()) {
        store.dispatch({
          type: "SEND_MESSAGE",
          payload: snapsht.val(),
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  form.addEventListener("click", () => {
    if (input.value) {
      const id = Date.now();
      const postData = {
        body: input.value,
        id,
      };

      const newPostKey = push(child(ref(database), "chat/data")).key as string;

      const updates: {
        [x: string]: {
          body: string;
          id: number;
        };
      } = {};

      updates[`chat/data/${newPostKey}`] = postData;
      input.value = "";

      socket.send(JSON.stringify({ [newPostKey]: postData }));

      update(ref(database), updates);
    }
  });

  clearButton.addEventListener("click", () => {
    const dbRef = ref(database);

    set(ref(database, "chat/data"), { ...initialState.data })
      .then(() => {
        get(child(dbRef, `chat/data`)).then(async (snapsht) => {
          if (snapsht.exists()) {
            store.dispatch({
              type: "CLEAR_HISTORY",
              payload: snapsht.val(),
            });
          } else {
            console.log("No data available");
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
