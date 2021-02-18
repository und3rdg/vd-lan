#!/usr/bin/env node
import chokidar from 'chokidar'
import yargs from 'yargs'
import { rsync, run } from './system'
import { cmd, path } from './const'

const argv = yargs
    .command('[options]', 'Deploy local curzon to remote host')
    .option('watch', {
        alias: 'w',
        description: 'watch mode, only forntend/build.',
        type: 'boolean',
    })
    .option('all', {
        alias: 'a',
        description: 'rsync all file to compile.',
        type: 'boolean',
    })
    .option('usync', {
        alias: 'u',
        description: 'Run kantu to do umbraco uSync import.',
        type: 'boolean',
    })
    .option('nuget', {
        alias: 'n',
        description: 'Restore nuget packages.',
        type: 'boolean',
    })
    .option('msbuild', {
        alias: 'c',
        description: 'Compile with msBuild.',
        type: 'boolean',
    })
    .help()
    .alias('help', 'h').argv

if (argv.watch) {
    rsync(path.rel.feBuild)
    chokidar
        .watch(`${path.abs.src}${path.rel.feBuild}`, { persistent: true })
        .on('change', () => rsync(path.rel.feBuild))
}

if (argv.all) rsync(path.rel.src)
if (argv.usync) run(cmd.usync)
if (argv.nuget) run(cmd.nuget)
if (argv.msbuild) run(cmd.msbuild)

