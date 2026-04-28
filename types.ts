export enum MoodLevel {
  ROCKET = 'rocket', // Mania
  FERRIS_WHEEL = 'ferris_wheel', // Hypomania
  STEADY = 'steady', // Euthymia (Baseline)
  HOLDING_BREATH = 'holding_breath', // Mild Depression
  DEEP_SEA = 'deep_sea', // Moderate/Severe Depression
  ABYSS = 'abyss' // Crisis
}

export type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'snowy';

export const DEPRESSION_SYMPTOMS = [
  "缺少热情", "体力下降", "记忆力差", "食欲减退", "社交回避", "自我伤害念头", "不愿出门"
];

export const MANIA_SYMPTOMS = [
  "过分热情", "思维奔逸", "语速变快", "冲动购物", "无饥饿感", "无视危险", "异样念头"
];

export interface MoodConfig {
  id: MoodLevel;
  label: string;
  description: string;
  color: string;
  iconName: string; // Mapping to Lucide icon manually
  value: number; // For charting (-3 to +3)
}

export interface SleepData {
  hours: number;
  difficultyFallingAsleep: boolean;
  earlyWakeUp: boolean;
  fallAsleepTime?: string;
  wakeUpTime?: string;
}

export interface MedicationData {
  taken: boolean;
  name: string;
  sideEffects: string;
}

export interface DailyLog {
  id: string;
  date: string;
  weather: WeatherType;
  mood: MoodLevel;
  sleep: SleepData;
  menstrualDay: number; // 0 = not menstruating
  symptoms: string[];
  triggers: string[];
  medication: MedicationData;
  note: string;
}

export interface InsightMessage {
  text: string;
  type: 'comfort' | 'pattern' | 'safety';
}