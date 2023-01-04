import { app } from "../../../../../server";
import request from "supertest";
import NodeCache from "../../../../services/store/database";

describe("GET /decode", () => {
  afterEach(() => {
    NodeCache.flushAll();
  });

  it("responds with a 400 code if not url is provided", async () => {
    const response = await request(app)
      .get("/decode?encryptedUrl=")
      .expect("Content-Type", /json/);
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual("A url must be provided");
  });

  it("responds with a 400 code if the url contains suspicious characters", async () => {
    const response = await request(app)
      .get("/decode?encryptedUrl=https://shortlink.com/KASGA93<>")
      .expect("Content-Type", /json/);
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual("The provided url is not valid");
  });

  it("responds with a 404 code if the url cannot be found", async () => {
    const response = await request(app)
      .get("/decode?encryptedUrl=https://shortlink.com/LFACM39")
      .expect("Content-Type", /json/);
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual(
      "The page you are looking for might have been removed, had its name changed or is unavailable."
    );
  });

  it("responds with a 200 code if the url is successfully found", async () => {
    NodeCache.set("LFACM39", {
      createdAt: 1672682487,
      id: "LFACM39",
      isActive: true,
      isDeleted: false,
      shortUrl: "https://shorturl.com/LFACM39",
      url: "https://example.com/page/42652461",
    });

    const response = await request(app)
      .get("/decode?encryptedUrl=https://shortlink.com/LFACM39")
      .expect("Content-Type", /json/);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      message: "Success.",
      data: {
        createdAt: 1672682487,
        id: "LFACM39",
        isActive: true,
        isDeleted: false,
        shortUrl: "https://shorturl.com/LFACM39",
        url: "https://example.com/page/42652461",
      },
    });
  });

  it("responds with a 200 code if the protocol is excluded from the url in the query parameter", async () => {
    NodeCache.set("LFACM39", {
      createdAt: 1672682487,
      id: "LFACM39",
      isActive: true,
      isDeleted: false,
      shortUrl: "https://shorturl.com/LFACM39",
      url: "https://example.com/page/42652461",
    });

    const response = await request(app)
      .get("/decode?encryptedUrl=shortlink.com/LFACM39")
      .expect("Content-Type", /json/);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      message: "Success.",
      data: {
        createdAt: 1672682487,
        id: "LFACM39",
        isActive: true,
        isDeleted: false,
        shortUrl: "https://shorturl.com/LFACM39",
        url: "https://example.com/page/42652461",
      },
    });
  });

  it("responds with a 200 code if the protocol is excluded and only 'www' is used in the url", async () => {
    NodeCache.set("LFACM39", {
      createdAt: 1672682487,
      id: "LFACM39",
      isActive: true,
      isDeleted: false,
      shortUrl: "https://shorturl.com/LFACM39",
      url: "https://example.com/page/42652461",
    });

    const response = await request(app)
      .get("/decode?encryptedUrl=www.shortlink.com/LFACM39")
      .expect("Content-Type", /json/);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      message: "Success.",
      data: {
        createdAt: 1672682487,
        id: "LFACM39",
        isActive: true,
        isDeleted: false,
        shortUrl: "https://shorturl.com/LFACM39",
        url: "https://example.com/page/42652461",
      },
    });
  });
});
