import { transformResponse } from './transformResponse'

describe('transformResponse', () => {
    it('should sucessfully transform a response if only a message is given', () => {
        expect(transformResponse('The provided url is not valid')).toEqual(
            {
                "data": null, 
                "message": "The provided url is not valid"
            }
        )
    })

    it('should sucessfully transform a response if a msesage and data is given', () => {
        expect(transformResponse(
            'The provided url is not valid',
            {
                "createdAt": 1672682487, 
                "id": "258aa2c", 
                "isActive": true, 
                "isDeleted": false, 
                "shortUrl": "https://shorturl.com/258aa2c", 
                "url": "https://example.com/page/1325335"
            }
        )).toEqual(
            {
                "data": {
                    "createdAt": 1672682487, 
                    "id": "258aa2c", 
                    "isActive": true, 
                    "isDeleted": false, 
                    "shortUrl": "https://shorturl.com/258aa2c", 
                    "url": "https://example.com/page/1325335"
                }, 
                "message": "The provided url is not valid"
            }
        )
    })
})