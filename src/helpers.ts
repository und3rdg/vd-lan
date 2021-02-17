import { execSync } from 'child_process'
import { cmd } from './deploy-curzon-ukvis96'

export function run(cmd: string) {
    try {
        const stdout = execSync(cmd)
        console.log(stdout.toString())
        return stdout.toString()
    } catch (err) {
        console.error(err.error)
    }
}

export function rsync(relPath: string): void {
    run(cmd.rsync(relPath))
}
