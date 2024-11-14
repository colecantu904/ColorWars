<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
</svelte:head>

<!-- Simple component that accepts a color style and applies to the button, needs better styling -->
<script>
	import { quintOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

  export let color, pb, key;

  let currentClicks = 0;
  let canClick = true;
  let fontsize = 1;
  const globalTimer = 1;
  

  // we need to functions, onClick that updates the current amount of clicks and checks if you have stopped clikcing for so many seconds
  // and a second function that updates with the pb with the amonut of clicks made in that time

  async function updatePb( colorKey , clicks ) {
    if ( currentClicks == clicks ) {
      // who knows if the canClick actually works?
      canClick = false;
      try {
      // Update the record with the specified id and new data
      const record = await pb.collection('TotalClicks').getOne(colorKey, {
    expand: 'relField1,relField2.subRelField',
      });

      const data = {
        "clicks": record.clicks + clicks,
      };

      await pb.collection('TotalClicks').update(colorKey, data);

    } catch (err) {
      console.error('Error updating record:', err);
    }
    canClick = true;
    currentClicks = 0;
    }
  }

  async function onClick() {
    if (canClick) {
      currentClicks += 1;

      // after updating currentClicks, set a timer to globalTimer and when it goes off update pb
      let click = currentClicks;
      setTimeout(() => {updatePb( key, click )}, 2000);
    }

    function calcSize( clicks ) {
      return clicks * 20;
    }

  }

</script>

<!-- You were looking at svelt transition, no svelte ANIMATE!!!!-->
<div class="color-button">
  <button style="background-color: {color};" on:click={() => onClick()}>
    {#if currentClicks != 0}
      <p style="font-size: 175%;">+&nbsp;{currentClicks}</p>
    {:else}
      <div></div>
    {/if}
  </button>
</div>

<!-- Make like a simple hover and onClick animation -->
<style>
  .color-button {
    width: 100vw;
    height: 80vh;
    max-width: 50%;
  }

  button {
    height: 100%;
    width: 100%;
    background-color: "white";
    border-radius: 9px;
    border: 5px solid solid;
  }

@keyframes wiggle {

0% {
  transform: translateX(0em);
}

40% {
  transform: translateX(-2em);
}

80% {
  transform: translateX(2em);
}

100% {
  transform: translateX(0em);

}
}

.color-button.active {
  animation: wiggle 1s linear;
}


  .clicked{
    animation: wiggle 1s linear;
    
  }

    .color-button:hover {
      background-color: #fff
  }
</style>