import { version } from "../package.json"

import { program } from "commander"
program.name("tunno").description("Tunno").version(version)

import config from "./commands/config"
config(program)

import youtube from "./commands/youtube"
youtube(program)

import fastUpload from "./commands/fastUpload"
fastUpload(program)

program.parse(process.argv)
