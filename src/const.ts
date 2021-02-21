import { homedir } from 'os'

export const remoteHost = 'vista'
export const path = {
    abs: {
        src: homedir() + '/Code/Vista/Vista.Digital.Curzon/',
        dest: 'Code/Vista.Digital.Curzon/',
        vsDevenv:
            '/mnt/c/Program\\ Files\\ \\(x86\\)/Microsoft\\ Visual\\ Studio/2019/Community/Common7/IDE/devenv.com',
    },
    rel: {
        feBuild: '_localwebroot/frontend/build/',
        v8: 'src/Project/Website/code/uSync/v8/Content/',
        src: 'src/',
    },
    file: {
        sln: 'Vista.Digital.Curzon.sln',
    },
}

export const rsyncFlags = [
    '--verbose',
    '--archive',
    '--update',
    '--prune-empty-dirs',
    '--delete-after',
    '--exclude=node_modules/',
    '--exclude=_localwebroot',
    '--exclude=".git/"',
    // '--dry-run'
].join(' ')

export const cmd = {
    rsync: (relPath: string) =>
        `rsync ${rsyncFlags} ${path.abs.src}${relPath} ${remoteHost}:${path.abs.dest}${relPath}`,
    usync: 'chromium "file:///home/undg/www/ui-test/index.html?direct=1&macro=umbraco/import"',
    msbuild: `ssh vista "cd ${path.abs.dest}${path.rel.src};${path.abs.vsDevenv} ${path.file.sln} /Build Debug"`,
    nuget: `ssh vista "cd ${path.abs.dest}${path.rel.src};nuget restore ${path.file.sln}"`,
}
