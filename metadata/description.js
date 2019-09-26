module.exports = {
  alias: 'desc',
  args: '<entity>',
  description: "display the entity's description",
  options: require('../lib/common_options').entityAttributeCommands,
  examples: [
    { args: 'Q123', comment: 'fetch the description for the entity Q123' },
    { args: 'Q123 --lang ja', comment: 'fetch the description for the entity Q123 in Japanese' }
  ]
}
