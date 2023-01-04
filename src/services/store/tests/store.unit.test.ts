import NodeCache from "../database";
import { getEncodedUrl, storeEncodedUrl } from "../store";

describe("database", () => {
  beforeEach(() => {
    Date.now = jest.fn(() => 1672679916000);
  });

  describe("#storeEncodedUrl", () => {
    it("should not store the encoded url if unique id is missing", () => {
      const setMock = jest.spyOn(NodeCache, "set");
      storeEncodedUrl({ id: "", url: "https://example.com/page/125124" });
      expect(setMock).toBeCalledTimes(0);
    });

    it("should correctly store the encoded url if all data is present and return the transformed object", () => {
      const setMock = jest.spyOn(NodeCache, "set");
      expect(
        storeEncodedUrl({
          id: "MA9GFA9",
          url: "https://example.com/page/125124",
        })
      ).toEqual({
        id: "MA9GFA9",
        shortUrl: "https://shorturl.com/MA9GFA9",
        url: "https://example.com/page/125124",
      });
      expect(setMock).toBeCalledTimes(1);
    });
  });

  describe("#getEncodedUrl", () => {
    it("should return null if no encoded url is found", () => {
      jest.spyOn(NodeCache, "get").mockReturnValue(null);
      expect(getEncodedUrl("HA0429A")).toEqual(null);
    });

    it("should return encoded url object if a matching id is found", () => {
      jest.spyOn(NodeCache, "get").mockReturnValue({
        id: "MA9GFA9",
        url: "https://example.com/page/125124",
        shortUrl: "https://shorturl.com/MA9GFA9",
        isActive: true,
        isDeleted: false,
        createdAt: 1672676589,
      });
      expect(getEncodedUrl("HA0429A")).toEqual({
        id: "MA9GFA9",
        url: "https://example.com/page/125124",
        shortUrl: "https://shorturl.com/MA9GFA9",
        isActive: true,
        isDeleted: false,
        createdAt: 1672676589,
      });
    });
  });
});
