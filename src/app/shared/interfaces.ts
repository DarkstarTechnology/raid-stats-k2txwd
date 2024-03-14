export type race = 'Demon' | 'Dragon' | 'Gnome' | 'Kobold' | 'None' | 'Plant' | 'Troll' | 'Undead' | 'Slime';

// Table alliance
export interface Alliance {
  primary: race[];
  secondary: race[];
  tertiary: race[];
  first_raid_date: number;
  id: number;
}
export interface AllianceInput {
  primary: race[];
  secondary: race[];
  tertiary: race[];
  first_raid_date: number;
  id?: number;
}
const alliance = {
  tableName: 'alliance',
  columns: ['primary', 'secondary', 'tertiary', 'first_raid_date', 'id'],
  requiredForInsert: ['primary', 'secondary', 'tertiary', 'first_raid_date'],
  primaryKey: 'id',
  foreignKeys: {},
  $type: null as unknown as Alliance,
  $input: null as unknown as AllianceInput
} as const;

// Table daily_alliance_stats
export interface DailyAllianceStats {
  raid_day: Date | null;
  race_group: string | null;
  kills: number | null;
}
export interface DailyAllianceStatsInput {
  raid_day?: Date | null;
  race_group?: string | null;
  kills?: number | null;
}
const daily_alliance_stats = {
  tableName: 'daily_alliance_stats',
  columns: ['raid_day', 'race_group', 'kills'],
  requiredForInsert: [],
  primaryKey: null,
  foreignKeys: {},
  $type: null as unknown as DailyAllianceStats,
  $input: null as unknown as DailyAllianceStatsInput
} as const;

// Table db_stats
export interface DbStats {
  avg_raids_day: number | null;
  oldest_raid_date: Date | null;
  total_raids: number | null;
  total_players: number | null;
}
export interface DbStatsInput {
  avg_raids_day?: number | null;
  oldest_raid_date?: Date | null;
  total_raids?: number | null;
  total_players?: number | null;
}
const db_stats = {
  tableName: 'db_stats',
  columns: ['avg_raids_day', 'oldest_raid_date', 'total_raids', 'total_players'],
  requiredForInsert: [],
  primaryKey: null,
  foreignKeys: {},
  $type: null as unknown as DbStats,
  $input: null as unknown as DbStatsInput
} as const;

// Table peak_raid_hours
export interface PeakRaidHours {
  time_window: string | null;
  raid_count: number | null;
}
export interface PeakRaidHoursInput {
  time_window?: string | null;
  raid_count?: number | null;
}
const peak_raid_hours = {
  tableName: 'peak_raid_hours',
  columns: ['time_window', 'raid_count'],
  requiredForInsert: [],
  primaryKey: null,
  foreignKeys: {},
  $type: null as unknown as PeakRaidHours,
  $input: null as unknown as PeakRaidHoursInput
} as const;

// Table player_in_raid
export interface PlayerInRaid {
  name: string;
  reddit_id: string;
  attack_time: number;
  attack_position: number;
  is_snipe: boolean;
  race: race | null;
}
export interface PlayerInRaidInput {
  name: string;
  reddit_id: string;
  attack_time: number;
  attack_position: number;
  is_snipe: boolean;
  race?: race | null;
}
const player_in_raid = {
  tableName: 'player_in_raid',
  columns: ['name', 'reddit_id', 'attack_time', 'attack_position', 'is_snipe', 'race'],
  requiredForInsert: ['name', 'reddit_id', 'attack_time', 'attack_position', 'is_snipe'],
  primaryKey: 'name',
  foreignKeys: { reddit_id: { table: 'raid', column: 'reddit_id', $type: null as unknown as Raid }, },
  $type: null as unknown as PlayerInRaid,
  $input: null as unknown as PlayerInRaidInput
} as const;

// Table player_stats
export interface PlayerStats {
  name: string | null;
  race: race | null;
  avg_time: number | null;
  avg_position: number | null;
  participation: number | null;
  snipe_ratio: number | null;
  snipe_attempts: number | null;
  total_raids: number | null;
}
export interface PlayerStatsInput {
  name?: string | null;
  race?: race | null;
  avg_time?: number | null;
  avg_position?: number | null;
  participation?: number | null;
  snipe_ratio?: number | null;
  snipe_attempts?: number | null;
  total_raids?: number | null;
}
const player_stats = {
  tableName: 'player_stats',
  columns: ['name', 'race', 'avg_time', 'avg_position', 'participation', 'snipe_ratio', 'snipe_attempts', 'total_raids'],
  requiredForInsert: [],
  primaryKey: null,
  foreignKeys: {},
  $type: null as unknown as PlayerStats,
  $input: null as unknown as PlayerStatsInput
} as const;

// Table raid
export interface Raid {
  reddit_id: string;
  title: string;
  date: number;
  kill: string | null;
  race: race;
}
export interface RaidInput {
  reddit_id: string;
  title: string;
  date: number;
  kill?: string | null;
  race: race;
}
const raid = {
  tableName: 'raid',
  columns: ['reddit_id', 'title', 'date', 'kill', 'race'],
  requiredForInsert: ['reddit_id', 'title', 'date', 'race'],
  primaryKey: 'reddit_id',
  foreignKeys: {},
  $type: null as unknown as Raid,
  $input: null as unknown as RaidInput
} as const;


export interface TableTypes {
  alliance: {
    select: Alliance;
    input: AllianceInput;
  };
  daily_alliance_stats: {
    select: DailyAllianceStats;
    input: DailyAllianceStatsInput;
  };
  db_stats: {
    select: DbStats;
    input: DbStatsInput;
  };
  peak_raid_hours: {
    select: PeakRaidHours;
    input: PeakRaidHoursInput;
  };
  player_in_raid: {
    select: PlayerInRaid;
    input: PlayerInRaidInput;
  };
  player_stats: {
    select: PlayerStats;
    input: PlayerStatsInput;
  };
  raid: {
    select: Raid;
    input: RaidInput;
  };
}

export const tables = {
  alliance,
  daily_alliance_stats,
  db_stats,
  peak_raid_hours,
  player_in_raid,
  player_stats,
  raid,
}

export interface LineChartSeries {
    name: string;
    series: Kvp[];
}

interface Kvp {
    name: string;
    value: string;
}

export interface NavItem {
    title: string;
    icon: string | undefined;
    route: string;
  }
  
  export interface NavItem {
    title: string;
    icon: string | undefined;
    route: string;
  }
  
  export interface Result<T> {
    data: T | undefined;
    error?: string;
  }

export interface RaidApi<T> {
    data: T | undefined;
    total_count: number;
    error?: string;
    error_code?: string;
}

export interface StatsApi {
    items: PlayerStats[];
    total_count: number;
    error?: string;
}