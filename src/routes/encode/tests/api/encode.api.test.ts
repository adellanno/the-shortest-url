import { app } from '../../../../../index'
import request  from 'supertest'
import NodeCache from '#services/store/database'

describe('POST /encode', () => {
     afterEach(() => {
        NodeCache.flushAll()
     })
     
    it('responds with a 400 code if not url is provided', async () => {
        const response = await request(app)
            .post('/encode')
            .send({
                "url": ""
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(response.statusCode).toEqual(400)
        expect(response.body.message).toEqual('A url must be provided')
    });

    it('responds with a 400 code if the url contains suspicious characters', async () => {
        const response = await request(app)
            .post('/encode')
            .send({
                "url": "https://example.com/te<>st"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(response.statusCode).toEqual(400)
        expect(response.body.message).toEqual('The provided url is not valid')
    });

    
    it('responds with a 200 code if a short url is successfully created', async () => {
        const response = await request(app)
            .post('/encode')
            .send({
                "url": "https://example.com/page/1/article/2"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual('Success.')
        expect(response.body).toEqual(
            {
                "message": "Success.",
                "data": {
                    "createdAt": expect.any(Number), 
                    "id": expect.any(String), 
                    "isActive": true, 
                    "isDeleted": false, 
                    "shortUrl": expect.any(String), 
                    "url": "https://example.com/page/1/article/2"
                }
            }
        )
    });
});