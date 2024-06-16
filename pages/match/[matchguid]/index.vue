<template>
  <div class="mx-auto max-w-2xl">
    <div class="flex flex-col items-center py-4">
      <div class="font-thin">
        {{ convertDate(match.datumString, match.beginTijd) }}
      </div>
      <div class="py-1 flex flex-row justify-between w-full">
        <div class="flex-1 flex items-center justify-start">
          <img
            class="h-8 w-8 rounded-full bg-gray-50 ring-2 ring-white object-cover"
            :src="getImageUrl(match.teamThuisGUID)"
          >
          <span class="px-2 text-xs font-thin">{{ match.teamThuisNaam }}</span>
        </div>
        <div class="px-1 flex-shrink font-semibold">
          <button
            v-if="match.uitslag"
            type="button"
            class="no_highlights inline-flex items-center gap-x-1.5 rounded-md bg-white text-yellow-700 shadow px-3 py-2 text-base font-semibold hover:bg-yellow-50"
          >
            {{ convertScore(match.uitslag) }}
          </button>
        </div>
        <div class="flex-1 flex items-center justify-end text-right">
          <span class="px-2 text-xs font-thin">{{ match.teamUitNaam }}</span>
          <img
            class="h-8 w-8 rounded-full bg-gray-50 ring-2 ring-white object-cover"
            :src="getImageUrl(match.teamUitGUID)"
          >
        </div>
      </div>
    </div>
    <h2 class="text-base font-semibold leading-7">
      Home:
    </h2>
    <MatchPlayers :players="homePlayers" />
    <h2 class="text-base font-semibold leading-7">
      Away:
    </h2>
    <MatchPlayers :players="awayPlayers" />
  </div>
</template>

<script setup>
import moment from 'moment'

const route = useRoute()

const url = new URL('https://vblcb.wisseq.eu/VBLCB_WebService/data/MatchByWedGuid')
url.searchParams.append('issguid', route.params.matchguid)

const resp = await useFetch(url.toString())
const match = resp.data.value[0].doc

const respParticipants = await useFetch('https://vblcb.wisseq.eu/VBLCB_WebService/data/DwfDeelByWedGuid', {
  method: 'PUT',
  body: {
    AuthHeader: 'na',
    WQVer: 'ddc1.0',
    WedGUID: route.params.matchguid,
    CRUD: 'R',
  },
})

const homeParticipants = respParticipants.data.value.TtDeel
const awayParticipants = respParticipants.data.value.TuDeel

const home = {}
for (const p of homeParticipants.filter(p => p.Functie === 'S')) {
  home[p.RelGUID] = {
    nr: parseInt(p.RugNr),
    name: p.Naam,
    score: 0,
    fouls: 0,
    p3: 0,
  }
}

const away = {}
for (const p of awayParticipants.filter(p => p.Functie === 'S')) {
  away[p.RelGUID] = {
    nr: parseInt(p.RugNr),
    name: p.Naam,
    score: 0,
    fouls: 0,
    p3: 0,
  }
}

const respEvents = await useFetch('https://vblcb.wisseq.eu/VBLCB_WebService/data/DwfVgngByWedGuid', {
  method: 'PUT',
  headers: {
    Authorization: 'na',
  },
  body: {
    AuthHeader: 'na',
    WQVer: 'ddc1.0',
    WedGUID: route.params.matchguid,
    CRUD: 'R',
  },
})

if (respEvents.data.value && respEvents.data.value.GebNis) {
  const events = respEvents.data.value.GebNis

  for (const e of events) {
    let team
    if (e.TofU === 'T') {
      team = home
    } else if (e.TofU === 'U') {
      team = away
    } else {
      continue
    }

    if (team[e.RelGUID]) {
      if (e.GebType === 10) {
        const regex = /\d+/g
        const points = parseInt(e.Text.match(regex))
        team[e.RelGUID].score += points
        if (points === 3) { team[e.RelGUID].p3 += 1 }
      } else if (e.GebType === 30) {
        team[e.RelGUID].fouls += 1
      }
    }
  }
}

const homePlayers = Object.values(home)
const awayPlayers = Object.values(away)

const getImageUrl = (guid) => {
  if (!guid) { return }
  const regex = /BVBL\d+/g
  return `https://vblcb.wisseq.eu/vbldata/organisatie/${guid.match(regex)}_Small.jpg`
}

const convertDate = (date, time) => {
  const dt = moment(date + ' ' + time, 'DD-MM-YYYY HH.mm')
  return dt.format('dd DD MMM. HH:mm')
}

const convertScore = (score) => {
  const regex = /\d+/g
  const arr = [...score.matchAll(regex)]

  if (arr.length === 2) {
    return `${arr[0]} - ${arr[1]}`
  } else if (score === '') {
    return ''
  } else {
    return '? - ?'
  }
}

</script>

<style>
.no_highlights{
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
</style>
