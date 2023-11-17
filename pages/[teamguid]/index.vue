<template>
  <div class="mx-auto max-w-2xl">
    <TabGroup>
      <TabList class="flex space-x-1 rounded-xl bg-green-900/20 p-1">
        <Tab v-for="category in categories" :key="category" v-slot="{ selected }" as="template">
          <button
            :class="[
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
              'ring-white/60 ring-offset-2 ring-offset-green-700 outline-none',
              selected
                ? 'bg-white text-green-700 shadow'
                : 'text-green-100 hover:bg-white/[0.12] hover:text-white',
            ]"
          >
            {{ category }}
          </button>
        </Tab>
      </TabList>
      <TabPanels class="mt-2">
        <TabPanel>
          <TeamRanking :teamguid="route.params.teamguid" />
        </TabPanel>
        <TabPanel>
          <TeamMatches :teamguid="route.params.teamguid" />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

const route = useRoute()

const url = new URL('https://vblcb.wisseq.eu/VBLCB_WebService/data/TeamDetailByGuid')
url.searchParams.append('teamguid', route.params.teamguid)

const resp = await useFetch(url.toString())
const team = resp.data.value[0]

const categories = ['Ranking', 'Matches']
</script>
