import NodeCache from 'node-cache';

const myCache = new NodeCache();

// export singleton to so that all queries use same node cache instance
export default myCache;