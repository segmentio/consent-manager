import { doNotTrack } from '../'

describe('doNotTrack', () => {
  beforeEach(() => {
    navigator = {} as Navigator
    window = {} as Window & typeof globalThis
  })

  test('doNotTrack() supports standard API', () => {
    // @ts-ignore
    navigator.doNotTrack = '1'
    expect(doNotTrack()).toBe(true)

    // @ts-ignore
    navigator.doNotTrack = '0'
    expect(doNotTrack()).toBe(false)

    // @ts-ignore
    navigator.doNotTrack = 'unspecified'
    expect(doNotTrack()).toBe(null)
  })

  test('doNotTrack() supports window', () => {
    // @ts-ignore
    navigator.doNotTrack = undefined

    // @ts-ignore
    window.doNotTrack = '1'
    expect(doNotTrack()).toBe(true)

    // @ts-ignore
    window.doNotTrack = '0'
    expect(doNotTrack()).toBe(false)

    // @ts-ignore
    window.doNotTrack = 'unspecified'
    expect(doNotTrack()).toBeNull()
  })

  test('doNotTrack() support yes/no', () => {
    // @ts-ignore
    navigator.doNotTrack = 'yes'
    expect(doNotTrack()).toBe(true)

    // @ts-ignore
    navigator.doNotTrack = 'no'
    expect(doNotTrack()).toBe(false)
  })

  test('doNotTrack() supports ms prefix', () => {
    // @ts-ignore
    navigator.doNotTrack = undefined
    // @ts-ignore
    window.doNotTrack = undefined

    // @ts-ignore
    navigator.msDoNotTrack = '1'
    expect(doNotTrack()).toBe(true)

    // @ts-ignore
    navigator.msDoNotTrack = '0'
    expect(doNotTrack()).toBe(false)

    // @ts-ignore
    navigator.msDoNotTrack = 'unspecified'
    expect(doNotTrack()).toBeNull()
  })
})
