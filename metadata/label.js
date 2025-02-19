module.exports = {
  alias: 'l',
  args: '<entity>',
  description: "display the entity's label",
  options: require('../lib/common_options').entityAttributeCommands,
  examples: [
    { args: 'Q123', comment: 'fetch the label for the entity Q123' },
    { args: 'Q123 --lang ja', comment: 'fetch the label for the entity Q123 in Japanese' },
    { args: 'Q1 Q2 Q3 P6', comment: 'fetch labels for several entities' },
  ]
}
