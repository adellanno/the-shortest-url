
import NodeCache from 'node-cache';
import { getEncryptedUrl, storeEncryptedUrl } from './queries'

describe('database', () => {

    describe('#storeEncryptedUrl', () => {

        it('should not store the encrypted url if unique id is missing', () => {
            const setMock = jest.spyOn(NodeCache.prototype, 'set')
            storeEncryptedUrl({ id: '', url: 'wwww.example.com/page/125124'})
            expect(setMock).toBeCalledTimes(0)
        })
    
        it('should correctly store the encrypted url if all data is present', () => {
            const setMock = jest.spyOn(NodeCache.prototype, 'set')
            storeEncryptedUrl({ id: 'MA9GFA9', url: 'wwww.example.com/page/125124'})
            expect(setMock).toBeCalledTimes(1)
        })
    })

    describe('#getEncryptedUrl', () => {
        it('should return null if no encrypted url is found', () => {
            jest.spyOn(NodeCache.prototype, 'get').mockReturnValue(null)
            expect(getEncryptedUrl('HA0429A')).toEqual(null)
        })

        it('should return encrypted url object if a matching id is found', () => {
            jest.spyOn(NodeCache.prototype, 'get').mockReturnValue({ id: 'MA9GFA9', url: 'wwww.example.com/page/125124'})
            expect(getEncryptedUrl('HA0429A')).toEqual({ id: 'MA9GFA9', url: 'wwww.example.com/page/125124'})
        })
    })
})