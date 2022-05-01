export const getVersion: () => Promise<string> = async function getVersion() {
  return localStorage.getItem("chatApp") || "0";
};

export const setVersion: (id: string) => void = function setVersion(id) {
  localStorage.setItem("chatApp", id);
};
