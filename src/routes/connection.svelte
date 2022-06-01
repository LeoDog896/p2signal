<!-- A raw example of peer connection. Essentially a port of stun-only-rtc with this library. -->
<script lang="ts">
  import { createPeerConnection, type AnswererPeerConnection, type OffererPeerConnection } from "$lib/peerConnection"

  let messages: { author: "us" | "them", message: string }[] = []

  let localOffer = "";
  let localAnswer = "";
  let remoteOffer = "";
  let remoteAnswer = "";

  let chatMessage = ""

  let activeRoom: "create" | "bob" | "alice" | "chat" = "create"
  let activeChat: RTCDataChannel | null = null;

  let bob: OffererPeerConnection | null = null;
  let alice: AnswererPeerConnection | null = null;

  async function activateBob() {
    activeRoom = "bob"
    bob = await createPeerConnection("offerer")

    localOffer = bob.description;

    bob.on("connect", channel => {
      activeRoom = "chat";
      activeChat = channel;
    })

    bob.on("message", message => messages = [...messages, { author: "them", message }])

    bob.on("disconnect", () => {
      activeRoom = "create"
      activeChat = null;
      bob = null;
    })
  }

  async function activateAlice() {
    activeRoom = "alice"
    alice = await createPeerConnection("answerer")

    alice.on("connect", channel => {
      activeRoom = "chat";
      activeChat = channel;
    })

    alice.on("message", message => messages = [...messages, { author: "them", message }])

    alice.on("disconnect", () => {
      activeRoom = "create"
      activeChat = null;
      alice = null;
    })
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
    <button disabled={remoteAnswer == ""} on:click={() => bob?.connect(remoteAnswer)}>Okay, I pasted it.</button>
  </div>

  <div class:hidden={activeRoom != "alice"}>
    <h3>ALICE: Paste the "offer" you received</h3>
    <input bind:value={remoteOffer}><br>
    <button on:click={async () => {
      localAnswer = await alice?.connect(remoteOffer) ?? "";
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