import * as chainId from './chainId'
import {
  MAIN_NET_POLYGON_TOKENS,
  MAIN_NET_POLYGON_MAIN_TOKEN,
  MAIN_NET_POLYGON_GAS_TOKEN,
} from './tokens/mainNetPolygon'
import {
  TEST_NET_KOVAN_TOKENS,
  TEST_NET_KOVAN_MAIN_TOKEN,
  TEST_NET_KOVAN_GAS_TOKEN,
} from './tokens/testNetKovan'
import ENVIRONMENTS from '@/constants/environments'

const infuraKey = process.env.VUE_APP_INFURA_KEY

// --------- CONFIGS ----------
export const TEST_NET_KOVAN_CONFIG = {
  networkId: chainId.TEST_NET_KOVAN,
  name: 'Kovan',
  localStorageName: 'ethereum-kovan',
  bridge: '0x4b552F62A4Db1f31C59c93E8Cb5A112a410598Ef',
  allowTokens: '0x3C4BcD08649897975123Cd8E47b2B34fB6e06D57',
  federation: '0x3C4BcD08649897975123Cd8E47b2B34fB6e06D57',
  explorer: 'https://kovan.etherscan.io',
  explorerTokenTab: '#tokentxns',
  secondsPerBlock: 5,
  rpc: `http://70.34.216.42:9933`,
  v2UpdateBlock: 1247922,
  feePercentageDivider: 10_000,
  tokenPrefix: 'e',
  env: ENVIRONMENTS.TESTNET,
  mainToken: TEST_NET_KOVAN_MAIN_TOKEN,
  gasToken: TEST_NET_KOVAN_GAS_TOKEN,
  isSide: true,
  tokens: getTokensWithReceiveToken(TEST_NET_KOVAN_TOKENS),
}

export const MAIN_NET_ETH_CONFIG = {
  networkId: chainId.MAIN_NET_POLYGON,
  name: 'Ethereum',
  localStorageName: 'polygon-mainnet',
  bridge: '0x006f485B4216759cfb8979DE2E4974f74c95585D',
  allowTokens: '0xaFfCFf9AA352E8f3960e2B9538164053F8C9E264',
  federation: '0xaFfCFf9AA352E8f3960e2B9538164053F8C9E264',
  explorer: 'https://etherscan.io',
  explorerTokenTab: '#tokentxns',
  secondsPerBlock: 15,
  rpc: `https://polygon-mainnet.g.alchemy.com/v2/Sziok2o64OsCpH9HP339wQdHe-akTGFi`,
  v2UpdateBlock: 12871770,
  feePercentageDivider: 10_000,
  tokenPrefix: 'e',
  env: ENVIRONMENTS.MAINNET,
  mainToken: MAIN_NET_POLYGON_MAIN_TOKEN,
  gasToken: MAIN_NET_POLYGON_GAS_TOKEN,
  isSide: true,
  tokens: getTokensWithReceiveToken(MAIN_NET_POLYGON_TOKENS),
}

export const defaultNetworks = {
  [ENVIRONMENTS.MAINNET]: {
    sideConfig: MAIN_NET_ETH_CONFIG,
  },
  [ENVIRONMENTS.TESTNET]: {
    sideConfig: TEST_NET_KOVAN_CONFIG,
  },
}

export const defaultProjectsAddress = [SWAP_RBTC_PROXY_ADDRESS]

function getReceiveToken(mainToken, sideTokens) {
  const receiveTokens = sideTokens.filter((token) => token.token == mainToken.token)
  if (receiveTokens.length == 0) {
    return {}
  }
  return receiveTokens[0]
}

function getTokensWithReceiveToken(mainTokens, sideTokens) {
  const mainTokensSort = mainTokens.sort((first, second) => first.typeId - second.typeId)
  return mainTokensSort.map((token) => ({
    ...token,
    receiveToken: getReceiveToken(token, sideTokens),
  }))
}

export function findNetworkByChainId(chainId, crossToNetworkId) {
  const networks = getNetworksAvailable()
  return networks.find(
    (net) => net.networkId === chainId && net.crossToNetwork.networkId === crossToNetworkId,
  )
}

export function getNetworksConf(selectedChainId, prevChainId = null) {
  const networksAvailable = getNetworksAvailable()
  const networks = networksAvailable.filter((net) => net.networkId === selectedChainId)
  if (!networks || networks.length === 0) {
    throw new Error(`Network ${selectedChainId} not found`)
  }

  if (networks.length !== 1) {
    if (prevChainId) {
      const networkConfig = getNetworksConf(prevChainId, null)
      return {
        ...networkConfig,
        networks,
      }
    }
    return {
      ...defaultNetworks[process.env.VUE_APP_ENV],
      networks,
    }
  }

  const [network] = networks
  return {
    sideConfig: network.isSide ? network : network.crossToNetwork,
    networks,
  }
}

export function getNetworksAvailable() {
  const networksOnEnvironment = getEnvironmentNetworks()
  const sideNetworks = networksOnEnvironment.map((network) => network.crossToNetwork)
  return [...networksOnEnvironment, ...sideNetworks]
}

export function getNonDuplicateNetworks() {
  const networks = getNetworksAvailable()
  const reducedNetworks = networks.reduce((acc, network) => {
    if (!acc.has(network.networkId)) {
      acc.set(network.networkId, network)
    }
    return acc
  }, new Map())
  return [...reducedNetworks.values()]
}
