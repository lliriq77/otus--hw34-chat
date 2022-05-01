import { getVersion, setVersion } from "./version";

describe("getVersion", () => {
  it("returns actual state version", async () => {
    setVersion("777");
    expect(await getVersion()).toStrictEqual("777");
  });
});
