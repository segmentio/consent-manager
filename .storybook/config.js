import { configure } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'

setOptions({
  showDownPanel: false
})

function loadStories() {
  require('../tools/story')
}

configure(loadStories, module)
