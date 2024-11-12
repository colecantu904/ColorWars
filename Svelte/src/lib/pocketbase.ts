import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

// linode ip goes here, i am not sure about what port tho??
export const pb = new PocketBase('http://172.105.153.41:8080');

export const records1 = await pb.collection('TotalClicks').getFullList({
    sort: '-created',
});