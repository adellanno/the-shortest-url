import { encodeUrl } from "./encodeUrl";

describe("encode url", () => {
  it("should return an encodedUrlObject with a random 7 character string", () => {
    const response = encodeUrl("https://www.example.com/page/1/article/4");
    expect(response.url).toEqual("https://www.example.com/page/1/article/4");
    expect(typeof response.id).toEqual("string");
    expect(response.id.length).toEqual(7);
    expect(response).toEqual({
      id: expect.any(String),
      url: "https://www.example.com/page/1/article/4",
    });
  });
});
