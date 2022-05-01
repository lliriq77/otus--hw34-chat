import { ref, set, child, get } from "firebase/database";
import { store } from "./store";
import { database } from "./firebase";
import { getVersion, setVersion } from "./version";
import { render } from "./render";
import { initialState } from "./state";

export async function createMessanger(el: HTMLDivElement) {
  let dbVersion = await getVersion();
  const state = store.getState();

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

  setInterval(
    () =>
      get(child(db, `chat/data`))
        .then((snapsht) => {
          if (snapsht.exists() && snapsht.val().version !== dbVersion) {
            setVersion(snapsht.val().version);
            dbVersion = snapsht.val().version;

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
        }),
    2000
  );

  form.addEventListener("click", () => {
    if (input.value) {
      const dbRef = ref(database);
      get(child(dbRef, `chat/data`))
        .then((snapshot) => {
          const id = Date.now();

          if (snapshot.exists()) {
            set(ref(database, "chat/data"), {
              ...snapshot.val(),
              history: snapshot.val().history.concat([
                {
                  msg: input.value,
                  id,
                },
              ]),
              version: id,
            }).then(() => {
              get(child(dbRef, `chat/data`)).then((snapsht) => {
                if (snapsht.exists()) {
                  store.dispatch({
                    type: "SEND_MESSAGE",
                    payload: snapsht.val(),
                  });
                  input.value = "";
                } else {
                  console.log("No data available");
                }
              });
            });
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  clearButton.addEventListener("click", () => {
    const dbRef = ref(database);

    set(ref(database, "chat/data"), { ...initialState.data })
      .then(async () => {
        get(child(dbRef, `chat/data`)).then(async (snapsht) => {
          if (snapsht.exists()) {
            setVersion(snapsht.val().version);

            dbVersion = await getVersion();

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
