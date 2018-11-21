import * as path from 'path';
import * as execa from 'execa';

const BIN_PATH = path.resolve(__dirname, '../bin/cli.js');
const LAUNCHER_PATH = path.resolve(__dirname, '../lib/cli/launcher.ts');

interface CompatibleResult extends execa.ExecaReturns {
  status?: number
}

function normalizeDir(dir: string) {
  const isRelative = dir[0] !== '/';

  if (isRelative) {
    dir = path.resolve(__dirname, dir);
  }

  return dir
}

// return the result of the spawned process:
//  [ 'status', 'signal', 'output', 'pid', 'stdout', 'stderr',
//    'envPairs', 'options', 'args', 'file' ]
export async function execCopyrightizen(
  dir: string,
  args?: Array<string>
) {
  dir = normalizeDir(dir)

  const env = Object.assign({}, process.env, {FORCE_COLOR: 0});

  const result: CompatibleResult = await execa(BIN_PATH, args || [], {
    cwd: dir,
    env,
    reject: false,
  });

  // For compat with cross-spawn
  result.status = result.code;

  return result;
}

export async function runCopyrightizen(cwd: string, args: string[] = []) {
  const lastCwd = process.cwd()

  cwd = normalizeDir(cwd)
  process.chdir(cwd);

  const mod = require(LAUNCHER_PATH)

  const result = await mod.launch(args, cwd)

  process.chdir(lastCwd)

  return result
}
