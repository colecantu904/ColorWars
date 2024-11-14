import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

// linode ip goes here, i am not sure about what port tho??
// 172.105.153.41
export const pb = new PocketBase('http://127.0.0.1:8090');

export const records1 = await pb.collection('TotalClicks').getFullList({
    sort: '-created',
});