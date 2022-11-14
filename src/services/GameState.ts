import { reactive } from 'vue'

export const state = reactive({
  count: 0,
  autoClicker: 0,
  fasterClicker: 0,
  fastestClicker: 0,
  multiplier: 1,
  autoClickerMultiplier: 1,
  fasterClickerMultiplier: 1,
  fastestClickerMultiplier: 1,
  prestigeNumber: 1,
  multiplierExponent: 1.25,
})