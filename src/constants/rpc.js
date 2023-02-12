import * as chainId from './chainId'
import {
  TEST_NET_KOVAN_CONFIG,
  MAIN_NET_ETH_CONFIG,
} from './networks'

const sideChainIdStr = process.env.VUE_APP_SIDE_CHAIN_ID
const mainChainIdStr = process.env.VUE_APP_MAIN_CHAIN_ID

const sideChainId = sideChainIdStr ? parseInt(sideChainIdStr, 10) : chainId.MAIN_NET_KOVAN
const mainChainId = mainChainIdStr ? parseInt(mainChainIdStr, 10) : chainId.MAIN_NET_POLYGON

// --------- CONFIGS ----------
export const TEST_NET_RPC = {
  [chainId.TEST_NET_KOVAN]: TEST_NET_KOVAN_CONFIG.rpc,
}

export const MAIN_NET_RPC = {
  [chainId.MAIN_NET_POLYGON]: MAIN_NET_ETH_CONFIG.rpc,
}

export const ALL_RPC = {
  ...TEST_NET_RPC,
  ...MAIN_NET_RPC,
}

export function getMainRPC() {
  if (!mainChainId) {
  return ALL_RPC[mainChainId]
}

export function getSideRPC() {
  if (!sideChainId) {
    return MAIN_NET_ETH_CONFIG.rpc
  }
  return ALL_RPC[sideChainId]
}
