import { configure } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'

setOptions({
  showDownPanel: false
})

function loadStories() {
  require('../tools/stories')
}

configure(loadStories, module)
