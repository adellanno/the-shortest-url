import { Request, Response } from "express";
import { encodeController } from "../../encode";
import * as EncodeController from "../../encode";
import * as DatabaseQueries from "../../../../services/store/store";

describe("encode controller", () => {
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
      body: {
        url: "",
      },
    };
    encodeController(mockRequest as Request, mockResponse as Response);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.send).toBeCalledWith({
      data: null,
      message: "A url must be provided",
    });
  });

  it("should return a 400 Bad Request status and url missing message if the url contains suspicious characters", () => {
    mockRequest = {
      body: {
        url: "https://example.co.uk/<>s",
      },
    };
    encodeController(mockRequest as Request, mockResponse as Response);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.send).toBeCalledWith({
      data: null,
      message: "The provided url is not valid",
    });
  });

  it("should return a 400 Bad Request status and relevant error message if the url provided is not a valid url", () => {
    mockRequest = {
      body: {
        url: "xa3a",
      },
    };
    encodeController(mockRequest as Request, mockResponse as Response);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.send).toBeCalledWith({
      data: null,
      message: "The provided url is not valid",
    });
  });

  it("should invoke the recursive collision check 4 times if three collisions are detected", () => {
    mockRequest = {
      body: {
        url: "https://example.com/page/1325335",
      },
    };
    const recursiveCollisionCheckMock = jest.spyOn(
      EncodeController,
      "recursiveCollisionCheck"
    );
    jest.spyOn(DatabaseQueries, "getEncryptedUrl").mockReturnValueOnce({
      createdAt: 1672682487,
      id: "LAM39AX",
      isActive: true,
      isDeleted: false,
      shortUrl: "https://shorturl.com/LAM39AX",
      url: "https://example.com/page/245151",
    });
    jest.spyOn(DatabaseQueries, "getEncryptedUrl").mockReturnValueOnce({
      createdAt: 1672682487,
      id: "XAKF0LA",
      isActive: true,
      isDeleted: false,
      shortUrl: "https://shorturl.com/XAKF0LA",
      url: "https://example.com/page/245151",
    });

    jest.spyOn(DatabaseQueries, "getEncryptedUrl").mockReturnValueOnce({
      createdAt: 1672682487,
      id: "MN293AL",
      isActive: true,
      isDeleted: false,
      shortUrl: "https://shorturl.com/MN293AL",
      url: "https://example.com/page/245151",
    });

    encodeController(mockRequest as Request, mockResponse as Response);

    expect(recursiveCollisionCheckMock).toBeCalledTimes(4);
  });

  it("should return a 200 success response if storeEncryptedUrl is successful", () => {
    mockRequest = {
      body: {
        url: "https://example.com/page/1325335",
      },
    };
    jest.spyOn(DatabaseQueries, "getEncryptedUrl").mockReturnValueOnce(null);
    jest.spyOn(DatabaseQueries, "storeEncryptedUrl").mockReturnValueOnce({
      id: "258aa2c",
      shortUrl: "https://shorturl.com/258aa2c",
      url: "https://example.com/page/1325335",
    });

    encodeController(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.send).toBeCalledWith({
      message: "Success.",
      data: {
        id: "258aa2c",
        shortUrl: "https://shorturl.com/258aa2c",
        url: "https://example.com/page/1325335",
      },
    });
  });

  it("should return a 500 response if storeEncryptedUrl returns false", () => {
    mockRequest = {
      body: {
        url: "https://example.com/page/1325335",
      },
    };
    jest.spyOn(DatabaseQueries, "getEncryptedUrl").mockReturnValueOnce(null);
    jest.spyOn(DatabaseQueries, "storeEncryptedUrl").mockReturnValueOnce(false);

    encodeController(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toBeCalledWith(500);
    expect(mockResponse.send).toBeCalledWith({
      data: null,
      message: "An unexpected error occured, please try again.",
    });
  });
});
