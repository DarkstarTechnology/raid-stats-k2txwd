//const BASE_URL = 'https://raid-api-DarkstarTechnol.replit.app/api/';
const BASE_URL = '/api/';
const PIR_URL = `${BASE_URL}playerInRaid`;
const ALLIANCE_URL = `${BASE_URL}alliance`;
const RAID_URL = `${BASE_URL}raid`;
const ALLIANCE_DAILY_URL = `${ALLIANCE_URL}/daily`;
const PLAYER_STATS_URL = `${BASE_URL}playerStats`;
const DB_STATS_URL = `${BASE_URL}databaseStats`;
const PEAK_RAID_HOURS_URL = `${BASE_URL}peakRaidHours`;
const PEAK_RAID_HOURS_ALLIANCE_URL = `${BASE_URL}peakRaidHoursAlliance`;

export const endpoints = {
  PIR_URL,
  ALLIANCE_URL,
  RAID_URL,
  ALLIANCE_DAILY_URL,
  PLAYER_STATS_URL,
  DB_STATS_URL,
  PEAK_RAID_HOURS_URL,
  PEAK_RAID_HOURS_ALLIANCE_URL
}