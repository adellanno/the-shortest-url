import { v4 as uuidv4 } from 'uuid';
import { getEncryptedUrl, storeEncryptedUrl } from './database/queries'

export type EncryptedUrlObject = {
    id?: string;
    url?: string;
}

export const checkForHashCollision = (id: string) => {
    // console.log(myCache.get(uniqueId))
}

export const encodeUrl = (url?: string): EncryptedUrlObject => {
    // generate random string, removing empty characters and limit length to 7 characters.
    const id = uuidv4().replace(/-/g, '').slice(0, 7)

    const encryptedUrlObject: EncryptedUrlObject = { id, url };

    return encryptedUrlObject
}
