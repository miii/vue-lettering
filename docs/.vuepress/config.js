const { description } = require('../../package.json')

module.exports = {
  base: '/vue-lettering/',
  plugins: [
    require('./plugin.js')
  ],
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Vue Lettering',
      description,
    }
  },
  themeConfig: {
    repo: 'miii/vue-lettering',
    docsDir: 'docs',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        sidebar: [
          '/introduction.md',
          '/getting-started.md',
          '/options.md',
        ]
      }
    }
  }
}
