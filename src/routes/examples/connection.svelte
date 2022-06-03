<!-- A raw example of peer connection. Essentially a port of stun-only-rtc with this library. -->
<script lang="ts">
  import { createPeerConnection, type AnswererPeerConnection, type OffererPeerConnection } from "$lib/connection/peerConnection"

  let messages: { author: "us" | "them", message: string }[] = []

  let localOffer = "";
  let localAnswer = "";
  let remoteOffer = "";
  let remoteAnswer = "";

  let chatMessage = ""

  let activeRoom: "create" | "bob" | "alice" | "chat" = "create"
  let activeChat: RTCDataChannel | null = null;

  let peer: OffererPeerConnection | AnswererPeerConnection | null = null;

  function activate() {
    if (!peer) return

    peer.on("connect", channel => {
      activeRoom = "chat";
      activeChat = channel;
    })

    peer.on("message", message => messages = [...messages, { author: "them", message }])

    peer.on("disconnect", () => {
      activeRoom = "create"
      activeChat = null;
      peer = null;
    })
  }

  async function activateBob() {
    activeRoom = "bob"
    peer = await createPeerConnection("offerer")

    localOffer = peer.description;

    activate()
  }

  async function activateAlice() {
    activeRoom = "alice"
    peer = await createPeerConnection("answerer")

    activate()
  }
</script>
<div class="m-8">
  <div class:hidden={activeRoom != "create"}>
    <h3>Create or join a room?</h3>
    <button on:click={activateBob}>BOB: Create</button>
    <button on:click={activateAlice}>ALICE: Join</button>
  </div>

  <div class:hidden={activeRoom != "bob"}>
    <h3>BOB: Send your local offer to ALICE</h3>
    <input readonly bind:value={localOffer}>
    <br>
    <h3>Then, paste the "answer" you received</h3>
    <input bind:value={remoteAnswer}><br>
    <button disabled={remoteAnswer == ""} on:click={() => peer?.connect(remoteAnswer)}>Okay, I pasted it.</button>
  </div>

  <div class:hidden={activeRoom != "alice"}>
    <h3>ALICE: Paste the "offer" you received</h3>
    <input bind:value={remoteOffer}><br>
    <button on:click={async () => {
      localAnswer = await peer?.connect(remoteOffer) ?? "";
    }} disabled={remoteOffer == ""}>Okay, I pasted it.</button>
    <h3>Then, send your local answer to BOB</h3>
    <input bind:value={localAnswer}>
  </div>

  <div class:hidden={activeRoom != "chat"}>
    <h1 class="text-2xl">Chat</h1>
    <div>
      {#each messages as { author, message }}
        <span>{author}: {message}</span><br/>
      {/each}
    </div>
    <input 
      bind:value={chatMessage} 
      placeholder="Send a message"
      on:keypress={event => {
        if (event.key == "Enter" && chatMessage) {
          activeChat?.send(chatMessage);
          messages = [...messages, { author: "us", message: chatMessage }]
          chatMessage = ""
        }
      }}
    >
  </div>
</div>