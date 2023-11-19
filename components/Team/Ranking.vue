<template>
  <div class="py-4">
    <h2 class="text-base font-semibold leading-7">
      Poule:
    </h2>
    <p class="font-thin">{{ poule.naam }} - {{ poule.categorie }}</p>
    <table class="mt-4 w-full whitespace-nowrap text-left border-separate border-spacing-y-4">
      <colgroup>
        <col class="">
        <col class="w-full sm:w-6/12">
        <col class="">
        <col class="">
        <col class="">
        <col class="">
        <col class="">
        <col class="">
      </colgroup>
      <thead class="border-b border-white/10 text-sm leading-6 ">
        <tr>
          <th scope="col" class="py-2 px-2 text-left font-semibold sm:table-cell">R</th>
          <th scope="col" class="py-2 px-2 font-semibold">Team</th>
          <th scope="col" class="hidden py-2 px-2 text-center font-semibold sm:table-cell">W</th>
          <th scope="col" class="hidden py-2 px-2 text-center font-semibold sm:table-cell">D</th>
          <th scope="col" class="hidden py-2 px-2 text-center font-semibold sm:table-cell">L</th>
          <th scope="col" class="hidden py-2 px-2 text-center font-semibold sm:table-cell">+</th>
          <th scope="col" class="hidden py-2 px-2 text-center font-semibold sm:table-cell">-</th>
          <th scope="col" class="py-2 px-2 text-center font-semibold sm:table-cell">P</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/5">
        <tr v-for="team in poule.teams" v-bind:key="team.guid">
          <td class="text-green-600 px-2 text-left">{{ team.rangNr.trim() }}</td>
          <td class="px-2 text-left">{{ team.naam }}</td>
          <td class="hidden px-2 text-center sm:table-cell font-thin">{{ team.wedWinst }}</td>
          <td class="hidden px-2 text-center sm:table-cell font-thin">{{ team.wedGelijk }}</td>
          <td class="hidden px-2 text-center sm:table-cell font-thin">{{ team.wedVerloren }}</td>
          <td class="hidden px-2 text-center sm:table-cell font-thin">{{ team.ptVoor }}</td>
          <td class="hidden px-2 text-center sm:table-cell font-thin">{{ team.ptTegen }}</td>
          <td class="px-2 text-center sm:table-cell">{{ team.wedPunt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ teamguid: string }>()

const url = new URL('https://vblcb.wisseq.eu/VBLCB_WebService/data/TeamDetailByGuid')
url.searchParams.append('teamguid', props.teamguid)

const resp = await useFetch(url.toString())
const poule = resp.data.value[0].poules[0]
</script>
