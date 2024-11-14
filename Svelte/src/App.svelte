<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
</svelte:head>

<script lang="ts">
  import Counter from './lib/Counter.svelte'
  import ColorBox from './colorBox.svelte';
  import InfoBox from './infoBox.svelte';
  import { pb, records1 } from './lib/pocketbase'

  let colorRecords = Array.from({ length: records1.length }, (_, index) => [records1[index].id, records1[index].clicks, records1[index].color_id]);
  console.log(colorRecords);

  for (let i = 0; i < colorRecords.length; i++) {
    pb.collection('TotalClicks').subscribe(colorRecords[i][0], function (e) {
      colorRecords[i][1] = e.record.clicks;
    }, { /* other options like expand, custom headers, etc. */ });

  }

</script>

<!-- Basically we need to just have a click adder that increases with each click, then, when the user stops clicking for a few seconds 
 (1.5 secs) then we will disable the button, push to pb, then renable the button (it can be button independant)-->

<main>
  <div class="container">
    {#each colorRecords as value}
      <p>{value[2]}  {value[1]}&nbsp;&nbsp;</p>
    {/each}
  </div>

  <div class="container">
    {#each records1 as record}
      <ColorBox color={record.color_id} pb={pb} key={record.id} />
    {/each}
  </div>
  
</main>

<style>
  .container {
    width: 100vw;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
</style>
