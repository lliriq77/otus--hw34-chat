import { store } from "./store";

describe("store", () => {
  it("is an object", () => {
    expect(store).toBeInstanceOf(Object);
  });

  it("has methods", () => {
    expect(store.getState).toBeInstanceOf(Function);
    expect(store.subscribe).toBeInstanceOf(Function);
    expect(store.dispatch).toBeInstanceOf(Function);
    expect(store.replaceReducer).toBeInstanceOf(Function);
  });

  it("returns initial state", () => {
    expect(store.getState()).toStrictEqual({
      chatData: {
        data: {
          history: [{ msg: "start your conversation here", id: 1650735000000 }],
          version: 1650735000000,
        },
      },
    });
  });
});
