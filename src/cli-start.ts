import path from 'node:path';
import jiti from 'jiti';
import * as commander from 'commander';
import http from 'http';

function tryRequire(id: string, rootDir: string = process.cwd()) {
  const _require = jiti(rootDir, { interopDefault: true, esmResolve: true });
  try {
    return _require(id);
  } catch (error: any) {
    if (error.code !== 'MODULE_NOT_FOUND') {
      console.error(`Error trying import ${id} from ${rootDir}`, error);
    }
    return {};
  }
}

const COLORS = {
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  console_color: '\x1b[0m',
} as const;

const colorConsoleText = (text: string, color: keyof typeof COLORS) => {
  const coloredText = `${COLORS[color]}${text}${COLORS.console_color}`;
  return console.log(coloredText);
};

const DEFAULT_FILE_NAME = 'test-config';

export async function startCli(cwd = process.cwd(), argv = process.argv) {
  try {
    commander.program
      .option('-p, --port <number>', 'port to listen on', parseInt)
      .option('-w, --watch', 'watch for changes and reload')
      .option('-c, --config <file_name>', 'File name config')
      .parse(argv);
    const options = commander.program.opts();

    const PORT = options.port || 4321;
    const server = http.createServer();
    const FILE_NAME_CONFIG = options.config ?? DEFAULT_FILE_NAME;

    const configDir = path.resolve(cwd, FILE_NAME_CONFIG);

    let started = false;

    const defineConfig =
      tryRequire(`./${FILE_NAME_CONFIG}.config`, configDir) || {};

    if (JSON.stringify(defineConfig) === '{}') {
      throw new Error('Not Found Config');
    }

    const {
      input: configInput,
      output: configOutput,
      customValue,
      plugins = [],
      ...config
    } = defineConfig();

  } catch (error: any) {
    colorConsoleText('❌ Agile CSS Error: ' + error.message, 'red');
  }
}
