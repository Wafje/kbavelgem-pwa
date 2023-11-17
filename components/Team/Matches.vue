<template>
  <ul role="list" class="divide-y divide-gray-100">
    <li v-for="match in matches" :key="matches.guid">
      <div class="flex flex-col items-center pt-4">
        <div class="font-thin">
          {{ convertDate(match.datumString, match.beginTijd) }}
        </div>
        <div class="py-1 flex flex-row justify-between w-full">
          <div class="flex-1 flex items-center justify-start">
            <img class="h-8 w-8 rounded-full bg-gray-50 ring-2 ring-white object-cover" :src="getImageUrl(match.tTGUID)">
            <span class="px-2 text-xs font-thin">{{ match.tTNaam }}</span>
          </div>
          <div class="px-1 flex-shrink text-xl font-semibold">
            {{ convertScore(match.uitslag) }}
          </div>
          <div class="flex-1 flex items-center justify-end text-right">
            <span class="px-2 text-xs font-thin">{{ match.tUNaam }}</span>
            <img class="h-8 w-8 rounded-full bg-gray-50 ring-2 ring-white object-cover" :src="getImageUrl(match.tUGUID)">
          </div>
        </div>
      </div>
      <div class="flex justify-end py-4">
        <button type="button" class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="openMaps(match.guid)">
          {{ match.accNaam }}
          <MapPinIcon class="-mr-0.5 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { MapPinIcon } from '@heroicons/vue/24/outline'
import moment from 'moment'
import { isIfStatement } from 'typescript'

const props = defineProps<{ teamguid: string }>()

const url = new URL('https://vblcb.wisseq.eu/VBLCB_WebService/data/TeamMatchesByGuid')
url.searchParams.append('teamguid', props.teamguid)

const resp = await useFetch(url.toString())
const matches: Array<object> = resp.data.value
matches.sort((a, b) => { return a.jsDTCode - b.jsDTCode })

const getImageUrl = (guid: string) => {
  const regex = /BVBL\d+/g
  return `https://vblcb.wisseq.eu/vbldata/organisatie/${guid.match(regex)}_Small.jpg`
}

const convertDate = (date: string, time: string) => {
  const dt = moment(date + ' ' + time, 'DD-MM-YYYY HH.mm')
  return dt.format('dd DD MMM. HH:mm')
}

const convertScore = (score: string) => {
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

const getAddress = async (matchGuid: string) => {
  const url = new URL('https://vblcb.wisseq.eu/VBLCB_WebService/data/MatchesByWedGuid')
  url.searchParams.append('issguid', matchGuid)

  const resp = await useFetch(url.toString())
  const addressStruct = resp.data.value[0].doc.accommodatieDoc

  return `${addressStruct.naam || ''} ${addressStruct.adres.straat || ''} ${addressStruct.adres.huisNr || ''}${addressStruct.adres.huisNrToev || ''} ${addressStruct.adres.plaats || ''}`
}

const getAddressURI = async (matchGuid: string) => {
  const { isAndroid, isIos } = useDevice()
  const address = await getAddress(matchGuid)
  address.replaceAll(' ', '+')

  if (isAndroid) {
    return new URL('geo:0,0?q=' + address)
  } else if (isIos) {
    return new URL('https://maps.apple.com/?q=' + address)
  } else {
    return new URL('https://maps.google.com/?q=' + address)
  }
}

const openMaps = (matchGuid: string) => {
  const windowReference = window.open()

  getAddressURI(matchGuid).then((url) => {
    if (windowReference) {
      windowReference.location = url.toString()
    }
  })
}
</script>
