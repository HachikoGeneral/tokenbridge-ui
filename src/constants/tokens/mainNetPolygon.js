import * as tokensInfo from '../tokensInfo'
import * as methodType from '../methodType'

export const MAIN_NET_POLYGON_MAIN_TOKEN = {
  ...tokensInfo.TOKEN_WETH_INFO,
  symbol: 'MATIC',
}

export const MAIN_NET_POLYGON_GAS_TOKEN = {
  ...MAIN_NET_POLYGON_MAIN_TOKEN,
}

export const MAIN_NET_POLYGON_TOKENS = [
  {
    ...tokensInfo.TOKEN_WCHK_INFO,
    symbol: 'WCHK',
    address: '0x9e1a245707799e747B4482E965B18BDd7cB4df57',
    decimals: 18,
    methodType: methodType.RECEIVER,
  },
]
