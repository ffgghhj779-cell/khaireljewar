export interface VolumetricInput {
  lengthM: number
  widthM: number
  heightM: number
  grossWeightKg: number
  mode: 'sea' | 'air'
}

export interface VolumetricResult {
  cbm: number
  volumetricWeightKg: number
  chargeableWeightKg: number
  containersEstimate: number
}

const SEA_DIVISOR = 1000
const AIR_DIVISOR = 6000

export function calculateVolumetrics(input: VolumetricInput): VolumetricResult {
  const cbm = (input.lengthM * input.widthM * input.heightM)
  const volumetricWeightKg =
    input.mode === 'air'
      ? (input.lengthM * 100 * (input.widthM * 100) * (input.heightM * 100)) / AIR_DIVISOR
      : cbm * SEA_DIVISOR
  const chargeableWeightKg = Math.max(input.grossWeightKg, volumetricWeightKg)
  const containersEstimate = Math.ceil(cbm / 33.2)

  return {
    cbm: Math.round(cbm * 100) / 100,
    volumetricWeightKg: Math.round(volumetricWeightKg),
    chargeableWeightKg: Math.round(chargeableWeightKg),
    containersEstimate: Math.max(1, containersEstimate),
  }
}

export function mtToKg(mt: number): number {
  return mt * 1000
}
