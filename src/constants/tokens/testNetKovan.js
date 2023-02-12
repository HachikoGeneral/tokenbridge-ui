import * as tokensInfo from '../tokensInfo'
import * as methodType from '../methodType'

export const TEST_NET_KOVAN_GAS_TOKEN = {
  ...tokensInfo.TOKEN_WETH_INFO,
  symbol: 'WCHK',
}

export const TEST_NET_KOVAN_MAIN_TOKEN = {
  ...tokensInfo.TOKEN_WETH_INFO,
  symbol: 'WCHK',
  address: '0x2e5E530dC2C6b2A8f214ee929dC4a302575881A9',
  decimals: 18,
  methodType: methodType.DEPOSITOR,
  },
]
