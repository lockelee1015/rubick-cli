rubick-cli
==========

rubick cli

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/rubick-cli.svg)](https://npmjs.org/package/rubick-cli)
[![Downloads/week](https://img.shields.io/npm/dw/rubick-cli.svg)](https://npmjs.org/package/rubick-cli)
[![License](https://img.shields.io/npm/l/rubick-cli.svg)](https://github.com/rubickCenter/rubick-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g rubick-cli
$ rubick COMMAND
running command...
$ rubick (-v|--version|version)
rubick-cli/0.0.0 linux-x64 node-v16.9.1
$ rubick --help [COMMAND]
USAGE
  $ rubick COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`rubick hello [FILE]`](#rubick-hello-file)
* [`rubick help [COMMAND]`](#rubick-help-command)

## `rubick hello [FILE]`

describe the command here

```
USAGE
  $ rubick hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ rubick hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/rubickCenter/rubick-cli/blob/v0.0.0/src/commands/hello.ts)_

## `rubick help [COMMAND]`

display help for rubick

```
USAGE
  $ rubick help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_
<!-- commandsstop -->
