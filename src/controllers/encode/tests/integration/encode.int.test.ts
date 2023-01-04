import { Request, Response } from "express";
import { encodeController } from "../../../../controllers/encode/encode";
import NodeCache from "../../../../services/store/database";

describe("encode controller integration tests", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    NodeCache.flushAll();
  });

  it("should return a 200 success response and a JSON object with relevant data if the short url is successfully stored", () => {
    mockRequest = {
      body: {
        url: "https://example.com/page/1/article/45",
      },
    };

    encodeController(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        message: "Success.",
        data: expect.objectContaining({
          id: expect.any(String),
          url: "https://example.com/page/1/article/45",
          shortUrl: expect.any(String),
        }),
      })
    );
  });
});
