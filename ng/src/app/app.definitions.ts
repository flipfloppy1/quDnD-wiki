export enum Duration {
  Action = "action",
  Reaction = "reaction",
  ItemInteraction = "item_interaction",
  BonusAction = "bonus_action",
  FreeAction = "free_action",
}

export enum DamageType {
  Acid = "dmgacid",
  Blg = "dmgbludgeoning",
  Cold = "dmgcold",
  Fire = "dmgfire",
  Force = "dmgforce",
  Lightning = "dmglightning",
  Necrotic = "dmgnecrotic",
  Piercing = "dmgpiercing",
  Poison = "dmgpoison",
  Psychic = "dmgpsychic",
  Radiant = "dmgradiant",
  Slashing = "dmgslashing",
  Thunder = "dmgthunder",
}

export enum DmgAffinityLevel {
  AffinityResistant = "resistant",
  AffinityWeak = "weak",
  AffinityImmune = "immune",
}

export enum Stat {
  StatNone = "none",
  AC = "ac",
  Speed = "speed",
  Level = "level",
  PB = "proficiency",
  HP = "hp",
  STR = "str",
  DEX = "dex",
  CON = "con",
  INT = "int",
  WIS = "wis",
  CHA = "cha",
  STR_BONUS = "strBonus",
  DEX_BONUS = "dexBonus",
  CON_BONUS = "conBonus",
  INT_BONUS = "intBonus",
  WIS_BONUS = "wisBonus",
  CHA_BONUS = "chaBonus",
  TOHIT = "tohit",
  IN = "initiative",
  STRSave = "strsave",
  DEXSave = "dexsave",
  CONSave = "consave",
  INTSave = "intsave",
  WISSave = "wissave",
  CHASave = "chasave",
}

export enum EffectType {
  DAZED = "Dazed",
  STUNNED = "Stunned",
}

export interface DiceRoll {
  dice: string[];
  offset: number;
  statBonus: Stat;
}

export interface Effect {
  effect: EffectType;
  conditions: string[];
  reasons: string[];
  rounds: DiceRoll;
}

export interface Attack {
  dmgType: DamageType;
  damage: DiceRoll;
  conditions: string[];
}

export interface Ability {
  id: string;
  duration: Duration;
  summary: string;
  description: string;
  conditions: string[];
  attacks: Attack[];
  effects: Effect[];
}

export interface FeatBuff {
  stat: Stat;
  value: string;
  conditions: string[];
}

export interface Feat {
  id: string;
  name: string;
  buffs: FeatBuff[];
  abilities: Ability[];
  description: string;
  prereqs: string[];
  imgUrl: string;
}
