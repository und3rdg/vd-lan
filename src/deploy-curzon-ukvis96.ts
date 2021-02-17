#!/usr/bin/env node
import chokidar from 'chokidar'
import yargs from 'yargs'
import { rsync } from './helpers'
import { homedir } from 'os'

const remoteHost = 'vista'

console.log(homedir())
const abs = {
    src: homedir() + '/Code/Vista/Vista.Digital.Curzon/',
    dest: remoteHost + 'Code/Vista.Digital.Curzon/',
}

const rel = {
    feBuild: '_localwebroot/frontend/build/',
    v8: 'src/Project/Website/code/uSync/v8/Content/',
    src: 'src/ ',
}

const flags =
    "--verbose \
    --archive \
    --update \
    --prune-empty-dirs \
    --delete-after \
    --exclude=node_modules/ \
    --exclude=_localwebroot \
    --exclude='.git/'"

export const cmd = {
    rsync: (relPath: string) => `rsync ${flags} ${abs.src}${relPath} ${abs.dest}${relPath}`,
}

const argv = yargs
    .command('[options]', 'Deploy local curzon to retarded host UKVIS96')
    .option('watch', {
        alias: 'w',
        description: 'watch mode, only forntend/build.',
        type: 'boolean',
    })
    .help()
    .alias('help', 'h').argv

if (argv.watch) watch(rel.feBuild)

function watch(relPath: string): void {
    rsync(relPath)
    const watcher = chokidar.watch(`${abs.src}${relPath}`, { persistent: true })
    watcher.on('change', () => rsync(relPath))
    watcher.on('add', () => rsync(relPath))
}
