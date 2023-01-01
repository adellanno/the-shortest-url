import Nodecache from './database'
import { EncryptedUrlObject } from '../encodeUrl'


// abstraction of a database layer allowing this faux database (using node-cache) to be easily swapped in future

export const storeEncryptedUrl = (EncryptedUrlObject: EncryptedUrlObject) => {

    if (!EncryptedUrlObject.id) return
    
    // utilising the expiry is one means of preventing hash collisions 
    Nodecache.set(EncryptedUrlObject.id, EncryptedUrlObject, 10000);
}

export const getEncryptedUrl = (id?: string): EncryptedUrlObject | null => {
    if (!id) return null

    const encryptedUrl = Nodecache.get(id);

    if (!encryptedUrl) return null

    return encryptedUrl
}