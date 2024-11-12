import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'


export default defineConfig({
  build:{
    target: "esnext", // or "es2019",
  },
  // other part of your config 
  // plugins: [vue()],
  // ...
  plugins: [svelte()],
})