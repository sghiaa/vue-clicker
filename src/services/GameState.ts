import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    count: useStorage('count', 0),
    souls: useStorage('souls', 0),
    autoClicker: useStorage('autoClicker', 0),
    fasterClicker: useStorage('fasterClicker', 0),
    fastestClicker: useStorage('fastestClicker', 0),
    multiplier: useStorage('multiplier', 1),
    autoClickerMultiplier: useStorage('autoClickerMultiplier', 1),
    fasterClickerMultiplier: useStorage('fasterClickerMultiplier', 1),
    fastestClickerMultiplier: useStorage('fastestClickerMultiplier', 1),
    prestigeNumber: useStorage('prestigeNumber', 1),
    prestigeExponent: useStorage('prestigeExponent', 1.1),
    prestigeCost: useStorage('prestigeCost', 50000),
    multiplierExponent: useStorage('multiplierExponent', 1.25),
  }),
  getters: {
      getCount(): number {
          return this.count
      },
      getSouls(): number {
          return this.souls
      },
      getAutoClicker(): number {
          return this.autoClicker
      },
      getFasterClicker(): number {
          return this.fasterClicker
      },
      getFastestClicker(): number {
          return this.fastestClicker
      },
      getMultiplier(): number {
          return this.multiplier
      },
      getAutoClickerMultiplier(): number {
          return this.autoClickerMultiplier
      },
      getFasterClickerMultiplier(): number {
          return this.fasterClickerMultiplier
      },
      getFastestClickerMultiplier(): number {
          return this.fastestClickerMultiplier
      },
      getPrestigeNumber(): number {
          return this.prestigeNumber
      },
      getMultiplierExponent(): number {
          return this.multiplierExponent
      },
  },
  actions: {
      incrementCount(value: number) {
          this.count += value;
      },
      spendCount(value: number) {
          this.count -= value;
      },
      incrementSouls(value: number) {
          this.souls += value;
      },
      spendSouls(value: number) {
          this.souls -= value;
      },
      incrementAutoClicker(value: number) {
          this.autoClicker += value;
      },
      incrementFasterClicker(value: number) {
          this.fasterClicker += value;
      },
      incrementFastestClicker(value: number) {
          this.fastestClicker += value;
      },
      incrementMultiplier(value: number) {
          this.multiplier += value;
      },
      prestige() {
        this.prestigeNumber++;
        this.count = 0;
        this.souls++;
        this.autoClicker = 0;
        this.fasterClicker = 0;
        this.fastestClicker = 0;
        this.multiplier = this.prestigeNumber;
        this.prestigeCost = Math.ceil(this.prestigeCost * this.prestigeExponent);
      },
      hardReset() {
        this.count = 0;
        this.souls = 0;
        this.autoClicker = 0;
        this.fasterClicker = 0;
        this.fastestClicker = 0;
        this.multiplier = 1;
        this.autoClickerMultiplier = 1;
        this.fasterClickerMultiplier = 1;
        this.fastestClickerMultiplier = 1;
        this.prestigeNumber = 1;
        this.prestigeExponent = 1.1;
        this.prestigeCost = 50000;
        this.multiplierExponent = 1.25;
      }
  },
})