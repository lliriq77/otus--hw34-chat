export interface iAppState {
  data: {
    [key: string]: { body: string; id: number };
  };
}

export const initialState: iAppState = {
  data: {
    "10000000000": { body: "start your conversation here", id: 1650735000000 },
  },
};
