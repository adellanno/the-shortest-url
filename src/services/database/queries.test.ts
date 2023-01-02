
import NodeCache from './database'
import { getEncryptedUrl, storeEncryptedUrl } from './queries'

describe('database', () => {
    beforeEach(() => {
        Date.now = jest.fn(() => 1672679916000) 
    })

    describe('#storeEncryptedUrl', () => {


        it('should not store the encrypted url if unique id is missing', () => {
            const setMock = jest.spyOn(NodeCache, 'set')
            storeEncryptedUrl({ id: '', url: 'wwww.example.com/page/125124'})
            expect(setMock).toBeCalledTimes(0)
        })
    
        it('should correctly store the encrypted url if all data is present and return the transformed object', () => {
            const setMock = jest.spyOn(NodeCache, 'set')
            expect(storeEncryptedUrl({ id: 'MA9GFA9', url: 'wwww.example.com/page/125124'})).toEqual(
                {
                    createdAt: 1672679916, 
                    id: "MA9GFA9", 
                    isActive: true, 
                    isDeleted: false, 
                    shortUrl: "https://shorturl.com/MA9GFA9", 
                    url: "wwww.example.com/page/125124"
                }
            )
            expect(setMock).toBeCalledTimes(1)
        })
    })

    describe('#getEncryptedUrl', () => {
        it('should return null if no encrypted url is found', () => {
            jest.spyOn(NodeCache, 'get').mockReturnValue(null)
            expect(getEncryptedUrl('HA0429A')).toEqual(null)
        })

        it('should return encrypted url object if a matching id is found', () => {
            jest.spyOn(NodeCache, 'get').mockReturnValue(
                { 
                    id: 'MA9GFA9', 
                    url: 'wwww.example.com/page/125124',
                    shortUrl: 'https://shorturl.com/MA9GFA9',
                    isActive: true,
                    isDeleted: false,
                    createdAt: 1672676589
                }
            )
            expect(getEncryptedUrl('HA0429A')).toEqual({ 
                id: 'MA9GFA9', 
                url: 'wwww.example.com/page/125124',
                shortUrl: 'https://shorturl.com/MA9GFA9',
                isActive: true,
                isDeleted: false,
                createdAt: 1672676589
            })
        })
    })
})