import test from 'ava'
import {doNotTrack} from '../src'

test.beforeEach(() => {
  global.navigator = {}
  global.window = {}
})

test.serial('doNotTrack() supports standard API', t => {
  global.navigator.doNotTrack = '1'
  t.true(doNotTrack())

  global.navigator.doNotTrack = '0'
  t.false(doNotTrack())

  global.navigator.doNotTrack = 'unspecified'
  t.is(doNotTrack(), null)
})

test.serial('doNotTrack() supports window', t => {
  global.window.doNotTrack = '1'
  t.true(doNotTrack())

  global.window.doNotTrack = '0'
  t.false(doNotTrack())

  global.window.doNotTrack = 'unspecified'
  t.is(doNotTrack(), null)
})

test.serial('doNotTrack() support yes/no', t => {
  global.navigator.doNotTrack = 'yes'
  t.true(doNotTrack())

  global.navigator.doNotTrack = 'no'
  t.false(doNotTrack())
})

test.serial('doNotTrack() supports ms prefix', t => {
  global.navigator.msDoNotTrack = '1'
  t.true(doNotTrack())

  global.navigator.msDoNotTrack = '0'
  t.false(doNotTrack())

  global.navigator.msDoNotTrack = 'unspecified'
  t.is(doNotTrack(), null)
})
