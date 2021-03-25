#!/usr/bin/env node
import chokidar from 'chokidar'
import yargs from 'yargs'
import { rsync, run } from './system'
import { cmd, path } from './const'

const argv = yargs
    .command('[options]', 'Deploy local curzon to remote host')
    .option('watch', {
        alias: 'w',
        description: 'Watch mode, only forntend/build.',
        type: 'boolean',
    })
    .option('all', {
        alias: 'a',
        description: 'Rsync all file to compile.',
        type: 'boolean',
    })
    .option('git', {
        alias: 'g',
        description: 'Rsync only files from git stash.',
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
    .option('full', {
        alias: 'f',
        description: 'Full build with all steps.',
        type: 'boolean',
    })
    .help()
    .alias('help', 'h').argv

// run all flags
if (argv.full) {
    rsync(path.rel.src)
    run(cmd.usync)
    run(cmd.nuget)
    run(cmd.msbuild)
} else {
    // If there is more than one flag, run commands in this order.
    if(argv.git) run(cmd.rsyncGitStash)
    if (argv.all) rsync(path.rel.src)
    if (argv.usync) run(cmd.usync)
    if (argv.nuget) run(cmd.nuget)
    if (argv.msbuild) run(cmd.msbuild)
}


if (argv.watch) {
    rsync(path.rel.feBuild)
    chokidar
        .watch(`${path.abs.src}${path.rel.feBuild}`, { persistent: true })
        .on('change', () => rsync(path.rel.feBuild))
}
