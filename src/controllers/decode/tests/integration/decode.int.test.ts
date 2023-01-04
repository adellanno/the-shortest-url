import { Request, Response } from "express";
import { decodeController } from "../../../../controllers/decode/decode";
import NodeCache from "../../../../services/store/database";
import { storeEncodedUrl } from "../../../../services/store/store";

describe("decode controller integration tests", () => {
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

  it("should return a 404 response if no matching url can be found", () => {
    mockRequest = {
      query: {
        encodedUrl: "https://shorturl.com/LK84621",
      },
    };
    decodeController(mockRequest as Request, mockResponse as Response);
    expect(mockResponse.status).toBeCalledWith(404);
    expect(mockResponse.send).toBeCalledWith({
      data: null,
      message:
        "The page you are looking for might have been removed, had its name changed or is unavailable.",
    });
  });

  it("should return a 200 response if a matching url is found", () => {
    storeEncodedUrl({
      id: "AB67GH",
      url: "https://example.com/page/XNSIAF9",
    });

    mockRequest = {
      query: {
        encodedUrl: "https://shorturl.com/AB67GH",
      },
    };
    decodeController(mockRequest as Request, mockResponse as Response);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.send).toBeCalledWith({
      data: {
        createdAt: expect.any(Number),
        id: "AB67GH",
        isActive: true,
        isDeleted: false,
        shortUrl: "https://shorturl.com/AB67GH",
        url: "https://example.com/page/XNSIAF9",
      },
      message: "Success.",
    });
  });
});
