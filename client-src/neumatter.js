import { WebComponent, define } from '@neumatter/webc'

class ThemeButton extends WebComponent {
  constructor () {
    super()

    const theme = localStorage.getItem('data-theme')
    const { matches: prefersDark } = matchMedia('(prefers-color-scheme: dark)')

    this.state.theme = theme ? theme : prefersDark ? 'dark' : 'light'
    this.context.dark = 'bi-sun-fill'
    this.context.light = 'bi-moon-fill'
    this.state.themeClass = this.context[this.state.theme]
  }

  render () {
    const root = document.documentElement
    const { theme } = this.state
    root.setAttribute('data-theme', theme)
    localStorage.setItem('data-theme', theme)

    return `
        <i id="btni" class="bi ${this.state.themeClass}"></i>
      `
  }

  onClick = () => {
    const theme = this.state.theme === 'dark' ? 'light' : 'dark'
    this.setState({
      theme,
      themeClass: this.getContext(theme)
    })
  }
}

define('theme-button', ThemeButton)

const navTabs = document.querySelectorAll('[data-nav=tab]')
if (navTabs && navTabs.length) initializeNavTabs()

function initializeNavTabs () {
  const { length } = navTabs
  let index = -1

  function preCheckTabOnLoad () {
    const checked = localStorage.getItem('checkedBox')
    if (checked) {
      const tab = document.querySelector(`#${checked}`)
      if (tab) tab.checked = true
    }
  }

  function tabOnClick (e) {
    const checked = localStorage.getItem('checkedBox')
    if (checked === e.target.id) {
      const tab = document.querySelector(`#${checked}`)
      if (tab) tab.checked = false
      localStorage.setItem('checkedBox', 'nulled')
    } else {
      e.target.checked = true
      localStorage.setItem('checkedBox', e.target.id)
    }
  }

  preCheckTabOnLoad()

  while (++index < length) {
    const tab = navTabs[index]
    tab.addEventListener('click', tabOnClick)
  }
}
