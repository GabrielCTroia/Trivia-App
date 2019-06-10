import { data } from './mockData';

export const fetch = () => Promise.resolve(data).then((r) => r.results);
