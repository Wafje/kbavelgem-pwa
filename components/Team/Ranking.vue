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
        <tr v-for="team in poule.teams">
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

const url = new URL('http://vblcb.wisseq.eu/VBLCB_WebService/data/TeamDetailByGuid')
url.searchParams.append('teamguid', props.teamguid)

const resp = await useFetch(url.toString())
const poule = resp.data.value[0].poules[0]

console.log(poule)

const statuses = { Completed: 'text-green-400 bg-green-400/10', Error: 'text-rose-400 bg-rose-400/10' }
const activityItems = [
  {
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: '2d89f0c8',
    branch: 'main',
    status: 'Completed',
    duration: '25s',
    date: '45 minutes ago',
    dateTime: '2023-01-23T11:00',
  },
  {
    user: {
      name: 'Lindsay Walton',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: '249df660',
    branch: 'main',
    status: 'Completed',
    duration: '1m 32s',
    date: '3 hours ago',
    dateTime: '2023-01-23T09:00',
  },
  {
    user: {
      name: 'Courtney Henry',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: '11464223',
    branch: 'main',
    status: 'Error',
    duration: '1m 4s',
    date: '12 hours ago',
    dateTime: '2023-01-23T00:00',
  },
  {
    user: {
      name: 'Courtney Henry',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: 'dad28e95',
    branch: 'main',
    status: 'Completed',
    duration: '2m 15s',
    date: '2 days ago',
    dateTime: '2023-01-21T13:00',
  },
  {
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: '624bc94c',
    branch: 'main',
    status: 'Completed',
    duration: '1m 12s',
    date: '5 days ago',
    dateTime: '2023-01-18T12:34',
  },
  {
    user: {
      name: 'Courtney Henry',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: 'e111f80e',
    branch: 'main',
    status: 'Completed',
    duration: '1m 56s',
    date: '1 week ago',
    dateTime: '2023-01-16T15:54',
  },
  {
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: '5e136005',
    branch: 'main',
    status: 'Completed',
    duration: '3m 45s',
    date: '1 week ago',
    dateTime: '2023-01-16T11:31',
  },
  {
    user: {
      name: 'Whitney Francis',
      imageUrl:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: '5c1fd07f',
    branch: 'main',
    status: 'Completed',
    duration: '37s',
    date: '2 weeks ago',
    dateTime: '2023-01-09T08:45',
  },
]
</script>
