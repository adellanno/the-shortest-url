import { Request, Response } from "express";
import { decodeController } from "../../decode";
import * as DatabaseQueries from "../../../../services/store/store";

describe("decode controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  it("should return a 400 Bad Request status and relevant message if the url is not provided", () => {
    mockRequest = {
      query: {
        encryptedUrl: "",
      },
    };
    decodeController(mockRequest as Request, mockResponse as Response);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.send).toBeCalledWith({
      data: null,
      message: "A url must be provided",
    });
  });

  it("should return a 400 Bad Request status and url missing message if the url contains suspicious characters", () => {
    mockRequest = {
      query: {
        encryptedUrl: "https://shorturl.com/<>LAM39AX",
      },
    };
    decodeController(mockRequest as Request, mockResponse as Response);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.send).toBeCalledWith({
      data: null,
      message: "The provided url is not valid",
    });
  });

  it("should return a 400 Bad Request status and relevant error message if the url provided is not a valid url", () => {
    mockRequest = {
      query: {
        encryptedUrl: "xlvaev",
      },
    };
    decodeController(mockRequest as Request, mockResponse as Response);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.send).toBeCalledWith({
      data: null,
      message: "The provided url is not valid",
    });
  });

  it("should return a 400 Bad Request status and relevant error message if there is no path on the url", () => {
    mockRequest = {
      query: {
        encryptedUrl: "https://shorturl.com",
      },
    };
    decodeController(mockRequest as Request, mockResponse as Response);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.send).toBeCalledWith({
      data: null,
      message: "The provided url is not valid",
    });
  });

  it("should return a 404 not found and relevant error message if no matching url is found", () => {
    mockRequest = {
      query: {
        encryptedUrl: "https://shorturl.com/XAV4391",
      },
    };
    jest.spyOn(DatabaseQueries, "getEncryptedUrl").mockReturnValueOnce(null);

    decodeController(mockRequest as Request, mockResponse as Response);
    expect(mockResponse.status).toBeCalledWith(404);
    expect(mockResponse.send).toBeCalledWith({
      data: null,
      message:
        "The page you are looking for might have been removed, had its name changed or is unavailable.",
    });
  });

  it("should return a 200 success response and the url data if a matching url is found", () => {
    mockRequest = {
      query: {
        encryptedUrl: "https://shorturl.com/XAV4391",
      },
    };
    jest.spyOn(DatabaseQueries, "getEncryptedUrl").mockReturnValueOnce({
      createdAt: 1672682487,
      id: "258aa2c",
      isActive: true,
      isDeleted: false,
      shortUrl: "https://shorturl.com/258aa2c",
      url: "https://example.com/page/1325335",
    });

    decodeController(mockRequest as Request, mockResponse as Response);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.send).toBeCalledWith({
      message: "Success.",
      data: {
        createdAt: 1672682487,
        id: "258aa2c",
        isActive: true,
        isDeleted: false,
        shortUrl: "https://shorturl.com/258aa2c",
        url: "https://example.com/page/1325335",
      },
    });
  });
});
