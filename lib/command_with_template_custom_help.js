const program = require('commander')
const path = require('path')
const logCommandExamples = require('./log_command_examples')
const { validateTemplateCommand } = require('./utils')

// Called when the -h,--help flag was set, and we now need to figure out what to display
module.exports = () => {
  const { args } = program
  if (args.length === 0) return program.helpAndExit()

  let filePath, jsPath, jsModule
  try {
    filePath = args[0]
    jsPath = path.resolve(filePath)
    jsModule = require(jsPath)
  } catch (err) {
    console.error("Couldn't parse template file metadata", err, { filePath, jsPath, jsModule })
    process.exit(1)
  }

  if (jsModule.args == null) throw new Error("missing args metadata: can't display help menu")
  logTemplateHelp(jsModule, filePath)
  process.exit(0)
}

const logTemplateHelp = (jsModule, filePath) => {
  let { commands, description = '', args = [], examples = [] } = jsModule

  if (args instanceof Array) args = args.join(' ')

  if (!(examples instanceof Array)) {
    throw new Error('invalid template: expected examples to be an array')
  }

  const commandName = program._name.replace('wb-', '')
  validateTemplateCommand({ commandName, validCommands: commands })

  const command = `${commandName} ${filePath}`
  let helpText = ''
  helpText += `Usage:\n\n  wb ${command} ${args}\n`
  if (description) helpText += `\n${description}`
  console.log(helpText)
  if (examples) logCommandExamples(command, examples, null, true)
  console.log(`For more general options, see:\n\n  wb ${commandName} --help\n`)
}
