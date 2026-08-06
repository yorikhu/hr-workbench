/**
 * pnpm hook to approve build scripts for specific packages
 */

function readPackage(pkg, context) {
  // Approve build scripts for these specific packages
  const allowedPackages = ['@parcel/watcher', 'esbuild', 'vue-demi']

  if (allowedPackages.some(name => pkg.name === name)) {
    // This allows the package's build scripts to run
    return {
      ...pkg,
      scripts: pkg.scripts || {}
    }
  }

  return pkg
}

module.exports = {
  hooks: {
    readPackage
  }
}
