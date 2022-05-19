import BigNumber from "bignumber.js";

export const PREFIX_FRONT_URL = '';
export const API_VERSION = 'v1';


export const BASE_URL = 'https://dev.api.crypto.mobilelab.vn';
export const BASE_URL_STAGGING = 'https://stagging.trustkeys.exchange';
export const BASE_URL_PROD = 'https://trustkeys.exchange';

export const POLLING_INTERVAL = 12000;
export const ZERO = new BigNumber(0);

export const REACT_APP_RPC_URL_1 = 'https://mainnet.infura.io/v3/ac0726fb45764f239b7b6bfb0d2307bf'
export const REACT_APP_RPC_URL_3 = 'https://ropsten.infura.io/v3/ac0726fb45764f239b7b6bfb0d2307bf'
export const REACT_APP_RPC_URL_4 = 'https://testnet.infura.io/v3/ac0726fb45764f239b7b6bfb0d2307bf'
export const REACT_APP_INFURA_ID = process.env.REACT_APP_INFURA_ID || 'ac0726fb45764f239b7b6bfb0d2307bf'
export const REACT_APP_RPC_BSC_URL_97 = process.env.REACT_APP_RPC_BSC_URL_97
export const REACT_APP_RPC_BSC_URL_56 = process.env.REACT_APP_RPC_BSC_URL_56

const toHex = (data) => {
    return `0x${new BigNumber(data).toString(16)}`
}

export const ChainId = {
    BSC_MAINNET: 56,
    BSC_TESTNET: 97,
    ETH_MAINNET: 1,
    ETH_TESTNET: 3,
}

export const CHAINS = {
    [ChainId.BSC_MAINNET]: {
        chainId: toHex(ChainId.BSC_MAINNET),
        chainName: 'Binance Smart Chain Mainnet',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'bnb',
            decimals: 18,
        },
        // rpcUrls: [REACT_APP_RPC_BSC_URL_56],
        blockExplorerUrls: [`https://bscscan.com/`],
    },
    [ChainId.BSC_TESTNET]: {
        chainId: toHex(ChainId.BSC_TESTNET),
        chainName: 'Smart Chain - Testnet',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
        },
        // rpcUrls: [REACT_APP_RPC_BSC_URL_97],
        blockExplorerUrls: [`https://testnet.bscscan.com/`],
    },
    [ChainId.ETH_MAINNET]: {
        chainId: toHex(ChainId.ETH_MAINNET),
        chainName: 'Ethereum Mainnet',
        nativeCurrency: {
            name: 'ETH',
            symbol: 'eth',
            decimals: 18,
        },
        // rpcUrls: [REACT_APP_RPC_URL_1],
        blockExplorerUrls: [`https://etherscan.io/`],
    },
    [ChainId.ETH_TESTNET]: {
        chainId: toHex(ChainId.ETH_TESTNET),
        chainName: 'Ropsten Test Network',
        nativeCurrency: {
            name: 'ETH',
            symbol: 'eth',
            decimals: 18,
        },
        rpcUrls: ['https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
        blockExplorerUrls: [`https://ropsten.etherscan.io/`],
    }
}

export default {
    SESSION: 'SESSION',
    CONNECTOR: 'CONNECTOR',
    ADDRESS: 'ADDRESS'
}