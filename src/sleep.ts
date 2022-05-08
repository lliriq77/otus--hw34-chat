export const sleep = async (x: number) =>
  new Promise((r) => setTimeout(r, x)).catch((error) => console.log(error));
