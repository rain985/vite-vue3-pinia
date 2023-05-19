import path from 'path'

export function isDevFn(mode) {
  return mode === 'development'
}

export function isProdFn(mode) {
  return mode === 'production'
}

/**
 * 将所有环境变量读取到process.env
 * @param {*} envConf
 * @returns
 */
export function wrapperEnv(envConf) {
  const ret = {}

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName =
      realName === 'true' ? true : realName === 'false' ? false : realName

    if (envName === 'VITE_PORT') {
      realName = Number(realName)
    }
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName)
      } catch (error) {}
    }
    ret[envName] = realName
    process.env[envName] = realName
  }
  return ret
}

/**
 * 获取根目录
 * @param dir file path
 */
export function getRootPath(...dir) {
  return path.resolve(process.cwd(), ...dir)
}
