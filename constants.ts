import { MoodConfig, MoodLevel } from "./types";

export const MOOD_CONFIGS: MoodConfig[] = [
  {
    id: MoodLevel.ROCKET,
    label: "火箭急速升空",
    description: "冲动 / 失控预警 / 无法停止",
    color: "bg-bipolar-rocket",
    iconName: "Rocket",
    value: 3
  },
  {
    id: MoodLevel.FERRIS_WHEEL,
    label: "摩天轮上升",
    description: "轻微高涨 / 创意 / 掌控感",
    color: "bg-bipolar-ferris",
    iconName: "FerrisWheel",
    value: 1.5
  },
  {
    id: MoodLevel.STEADY,
    label: "平稳陆地",
    description: "日常 / 波澜不惊",
    color: "bg-bipolar-steady",
    iconName: "Trees",
    value: 0
  },
  {
    id: MoodLevel.HOLDING_BREATH,
    label: "泳池憋气",
    description: "轻度压抑 / 需用力维持",
    color: "bg-bipolar-breath",
    iconName: "Waves",
    value: -1.5
  },
  {
    id: MoodLevel.DEEP_SEA,
    label: "深海潜行",
    description: "重度抑郁 / 迟缓 / 窒息感",
    color: "bg-bipolar-sea",
    iconName: "Anchor",
    value: -2.5
  },
  {
    id: MoodLevel.ABYSS,
    label: "无底深渊",
    description: "危机状态 / 失去光亮",
    color: "bg-bipolar-abyss",
    iconName: "Orbit",
    value: -3
  }
];

export const MOCK_DATA = [
  { date: 'Mon', value: 0, sleep: 7.5, menstruation: false },
  { date: 'Tue', value: 1.5, sleep: 6, menstruation: false },
  { date: 'Wed', value: 1.5, sleep: 5, menstruation: true },
  { date: 'Thu', value: 0, sleep: 8, menstruation: true },
  { date: 'Fri', value: -1.5, sleep: 9, menstruation: true },
  { date: 'Sat', value: -2.5, sleep: 11, menstruation: false },
  { date: 'Sun', value: -1.5, sleep: 8.5, menstruation: false },
];

export const TAGS_POOL = [
    "焦虑", "易怒", "空虚", "平静", "创意爆发", "无法入睡", "嗜睡", "购物冲动", "社交回避"
];