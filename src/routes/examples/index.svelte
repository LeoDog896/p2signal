<script lang="ts">
  export let links: { name: string, href: string }[] = [
    {
      name: "Chat",
      href: "chat"
    }, 
    {
      name: "Low-level peer connection",
      href: "connection"
    }
  ]
</script>

{#each links as { href, name }}
  <a {href}>{name}</a>
{/each}