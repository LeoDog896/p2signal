<script lang="ts">
  import { onMount } from "svelte";
  import { renderCanvas } from "scannable"

  enum Author {
    SELF,
    OTHER
  }

  let readyToChat = false
  let canvas: HTMLCanvasElement

  onMount(() => {
    const rtc = new RTCPeerConnection({ 'iceServers': [{ urls: "stun:stun.gmx.net" }] })

    renderCanvas("https://example.com", canvas)

    rtc.addEventListener("icecandidate", () => {

    })
  })

  let messages: { author: Author, message: string }[] = []
</script>

<div class="m-8 w-full h-full md:w-3/4 lg:w-1/2 p-4 border-gray-300 bg-white border mx-auto rounded-md shadow-lg">
  {#if readyToChat}
    {#if messages.length == 0}
      <p class="w-full text-center">No chat messages. Send some!</p>
    {:else}
      <div class="flex flex-col">
        {#each messages as message}
          <div class="w-min mb-4 {message.author == Author.SELF ? "items-start mr-[25%]" : "items-end ml-auto"}">
            <p class="p-4 {message.author == Author.SELF ? "bg-gray-200" : "bg-blue-200"}">{message.message}</p>
          </div>
        {/each}
      </div>
      <input class="text-center w-full mx-auto" placeholder="Send a message.">
    {/if}
  {:else}
    <p class="text-2xl font-bold w-full text-center border-b border-red-300 border-dashed pb-3 mb-4">No one is connected.</p>
    <p class="w-full text-center">Have a friend scan the QR code below <span class="font-bold">OR</span> scan their QR code.</p>
    <div class="m-5 border w-min h-min mx-auto border-gray-200">
      <canvas class="m-5" bind:this={canvas} width=200 height=200></canvas>
    </div>
  {/if}
</div>