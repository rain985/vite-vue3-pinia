/**
 * pinia持久化配置
 * @param {*} key 存储持久化name
 * @param {*} paths  需要持久化的state name
 * @returns
 */
const piniaPersistConfig = (key, paths = []) => {
  const persist = {
    enabled: true,
    strategies: [{ key, storage: sessionStorage, paths }]
  }
  return persist
}

export default piniaPersistConfig
