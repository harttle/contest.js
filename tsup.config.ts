import { Options } from 'tsup'

const options: Options = {
  format: [
    'cjs',
    'esm'
  ],
  clean: true,
  splitting: true,
  bundle: false,
  dts: true,
  entryPoints: [
    '*.ts'
  ],
  outDir: 'lib',
  esbuildOptions (options, context) {
    options.splitting = false
  }
}

export default options
