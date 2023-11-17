<template>
  <div>
    <h2 class="text-sm font-medium text-gray-500">
      Teams
    </h2>
    <ul role="list" class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      <NuxtLink v-for="team in teams" :key="team.naam" :to="team.guid" class="col-span-1 flex rounded-md shadow-sm">
        <div
          class="flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
          :style="{ backgroundColor: team.shirtKleur }"
        >
          {{ abbreviation(teamname, team.naam) }}
        </div>
        <div class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
          <div class="flex-1 truncate px-4 py-2 text-sm">
            <p class="font-medium text-gray-900 hover:text-gray-600">
              {{ team.naam }}
            </p>
            <p class="text-gray-500">
              {{ team.categorie }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </ul>
    <ul>
      <p>isDesktop {{ isDesktop }}</p>
      <p>isMobile {{ isMobile }}</p>
      <p>isIos {{ isIos }}</p>
      <p>isAndroid {{ isAndroid }}</p>
      <p>isWindows {{ isWindows }}</p>
      <p>isMacOS {{ isMacOS }}</p>
      <p>isChrome {{ isChrome }}</p>
      <p>isSafari {{ isSafari }}</p>
    </ul>
  </div>
</template>

<script setup>
const resp = await useFetch('https://vblcb.wisseq.eu/VBLCB_WebService/data/OrgDetailByGuid?issguid=BVBL1413')
const teamname = resp.data.value[0].naam
const teams = resp.data.value[0].teams

const abbreviation = (teamname, name) => {
  return name.replace(teamname, '').trim()
}

const { isDesktop, isMobile, isIos, isAndroid, isWindows, isMacOS, isChrome, isSafari } = useDevice()

</script>
