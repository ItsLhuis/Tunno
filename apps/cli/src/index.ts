import { program } from "commander"
program.name("wave").description("Wave").version("1.0.0")

import config from "./commands/config"
config(program)

import youtube from "./commands/youtube"
youtube(program)

program.parse(process.argv)
