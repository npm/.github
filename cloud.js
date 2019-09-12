module.exports = {
  branch: 'master',
  tagFormat: 'v${version}',
  plugins: [
    '@semantic-release/github',
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator'
  ]
}
