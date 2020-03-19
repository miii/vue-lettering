const { description, version } = require('../../package.json')

module.exports = {
  base: '/vue-lettering/',
  head: [
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png"}],
    ['link', { rel: "shortcut icon", href: "/favicon.ico"}],
  ],
  plugins: [
    require('./plugin.js'),
    [
      '@vuepress/google-analytics',
      {
        ga: process.env.GA_ID,
      }
    ],
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
    nav: [
      { text: `Version ${version}`, link: 'https://www.npmjs.com/package/@miii/vue-lettering', target:'_blank' },
    ],
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
