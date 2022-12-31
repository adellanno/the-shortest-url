import { NextFunction, Request, Response } from "express";
import { encodeController } from "./encode";

describe('encode controller', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    // let nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
      mockRequest = {
      };
      mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn() ,
      };
    });

    it ('should return a 400 Bad Request status and url missing message if the url provided is not a valid url', () => {
        mockRequest = { 
            body: { 
                url: '' 
            }
        }
        encodeController(
            mockRequest as Request,
            mockResponse as Response
        )
        expect(mockResponse.status).toBeCalledWith(400)
        expect(mockResponse.send).toBeCalledWith("A url must be provided")
    })

    it ('should return a 400 Bad Request status and relevant error message if the url provided is not a valid url', () => {
        mockRequest = { 
            body: { 
                url: 'xa3a' 
            }
        }
        encodeController(
            mockRequest as Request,
            mockResponse as Response
        )
        expect(mockResponse.status).toBeCalledWith(400)
        expect(mockResponse.send).toBeCalledWith("The provided url is not valid")
    })

})