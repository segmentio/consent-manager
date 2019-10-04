import CMB from './consent-manager-builder'
import CM from './consent-manager'
export {openDialog as openConsentManager} from './consent-manager/container'

export const ConsentManagerBuilder = CMB
export const ConsentManager = CM

export function doNotTrack() {
  let doNotTrackValue =
    navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack

  // Normalise Firefox < 32
  // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/doNotTrack
  if (doNotTrackValue === 'yes') {
    doNotTrackValue = '1'
  } else if (doNotTrackValue === 'no') {
    doNotTrackValue = '0'
  }

  if (doNotTrackValue === '1') {
    return true
  }
  if (doNotTrackValue === '0') {
    return false
  }
  return null
}
