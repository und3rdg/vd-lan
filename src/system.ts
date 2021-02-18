import { execSync } from 'child_process'
import { cmd } from './const'
import c from 'chalk'

export function rsync(relPath: string): void {
    run(cmd.rsync(relPath))
}

export function run(cmd: string) {
    console.log(c.green(cmd))
    try {
        const stdout = execSync(cmd)
        console.log(stdout.toString())
        return stdout.toString()
    } catch (err) {
        console.error(c.red(err.error))
    }
}
