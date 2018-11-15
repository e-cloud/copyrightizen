import * as path from 'path';
import * as execa from 'execa';

const BIN_PATH = path.resolve(__dirname, '../bin/cli.js');

interface CompatibleResult extends execa.ExecaReturns {
  status?: number
}

// return the result of the spawned process:
//  [ 'status', 'signal', 'output', 'pid', 'stdout', 'stderr',
//    'envPairs', 'options', 'args', 'file' ]
export async function runCopyrightizen(
  dir: string,
  args?: Array<string>
) {
  const isRelative = dir[0] !== '/';

  if (isRelative) {
    dir = path.resolve(__dirname, dir);
  }

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
