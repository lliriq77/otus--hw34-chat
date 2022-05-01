export interface iAppState {
  data: {
    history: { msg: string; id: number }[];
    version: number;
  };
}

export const initialState: iAppState = {
  data: {
    history: [{ msg: "start your conversation here", id: 1650735000000 }],
    version: 1650735000000,
  },
};
