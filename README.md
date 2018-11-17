# Lerna-Babel-Webpack Executor

This package helps you to run monorepo specific build commands typically when monorepos import across other repos across the packages. 

Include this as a devDepency is recommended.

## Usage

Modify your monorepo `build` script to compile using `lerna-babel7-exec` binary instead of your existing `webpack` compilation script.

The script takes three arguments.

### Options

-- `--segments` Number of levels need to be traversed upwards from existing directory to get to the root of the monorepo.

-- `--filename` Webpack config filename

-- `--commandArguments` Any webpack specifc args

-- `--buildOpts` Any downstream config variables set from the root of the monorepo while running `lerna run build`.

Example: `lerna run build --stream '--buildOpts=--env development'`

`--env development` is passed all the way downstream to each and every monorepo `build` script.

## Example Usage

#### Root - Package.json - scripts
`example-build: lerna run build --stream -- -- '--buildOpts=--env development'`

#### Root - Packages - MonorRepo - Package.json - scripts
`repo-example-build: lerna-babel7-exec --segments=<jump n levels to root> --filename=<webpack-config-name> --commandArguments=<webpack specific args for example: --verbose, --bail, --progress>`