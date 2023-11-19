<template>
  <div class="py-2">
    <table class="w-full whitespace-nowrap text-left border-separate border-spacing-y-4">
      <colgroup>
        <col class="">
        <col class="w-full">
        <col class="">
        <col class="">
      </colgroup>
      <thead class="border-b border-white/10 text-sm leading-6 ">
        <tr>
          <th scope="col" class="py-2 px-2 text-left font-semibold sm:table-cell">#</th>
          <th scope="col" class="py-2 px-2 font-semibold">Name</th>
          <th scope="col" class="py-2 px-2 text-center font-semibold sm:table-cell">F</th>
          <th scope="col" class="py-2 px-2 text-center font-semibold sm:table-cell">3</th>
          <th scope="col" class="py-2 px-2 text-center font-semibold sm:table-cell">P</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/5">
        <tr v-for="player in players" v-bind:key="player.nr">
          <td class="text-green-600 px-2 text-left">{{ player.nr }}</td>
          <td class="px-2 text-left">{{ player.name }}</td>
          <td class="px-2 text-center sm:table-cell">{{ player.fouls }}</td>
          <td class="px-2 text-center sm:table-cell">{{ player.p3 }}</td>
          <td class="px-2 text-center sm:table-cell">{{ player.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ players: Array }>()
</script>
