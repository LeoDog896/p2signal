<script lang="ts">

  enum Author {
    SELF,
    OTHER
  }

  let messages: { author: Author, message: string}[] = [
    {
      author: Author.SELF,
      message: "Hello!"
    },
    {
      author: Author.OTHER,
      message: "Hi!"
    }
  ]
</script>

<div class="m-8 xl:w-1/2 p-4 border-gray-300 border mx-auto">
  <div class="flex flex-col">
    {#each messages as message}
      <div class="w-min mb-4 {message.author == Author.SELF ? "items-start mr-[25%]" : "items-end ml-auto"}">
        <p class="p-4 {message.author == Author.SELF ? "bg-gray-200" : "bg-blue-200"}">{message.message}</p>
      </div>
    {/each}
  </div>

  <input class="text-center w-full mx-auto" placeholder="Send a message.">
</div>