// TEST NET
export const TEST_NET_KOVAN = 42
export const TEST_NET_RSK = 31

export const SUPPORTED_CHAINS_TEST_NET = [TEST_NET_KOVAN, TEST_NET_RSK]

// MAIN NET
export const MAIN_NET_ETHEREUM = 1
export const MAIN_NET_RSK = 30

export const SUPPORTED_CHAINS_MAIN_NET = [MAIN_NET_ETHEREUM, MAIN_NET_RSK]

export const ALL_CHAINS = [...SUPPORTED_CHAINS_TEST_NET, ...SUPPORTED_CHAINS_MAIN_NET]
