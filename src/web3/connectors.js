import {InjectedConnector} from '@web3-react/injected-connector'
import {WalletConnectConnector} from '@web3-react/walletconnect-connector'
import {BscConnector} from "@binance-chain/bsc-connector";

import {
  REACT_APP_INFURA_ID,
  REACT_APP_RPC_BSC_URL_56,
  REACT_APP_RPC_BSC_URL_97,
  REACT_APP_RPC_URL_1,
  REACT_APP_RPC_URL_3,
  REACT_APP_RPC_URL_4,
} from '../utils/constant'
// import {Coin98Connector} from "@yay-games/coin98-web3-connector";

export const ConnectorNames = {
  Metamask: 'Metamask',
  WalletConnect: 'WalletConnect',
  Binance: 'Binance',
  // TrustKeys: 'TrustKeys'
  // Coin98: 'Coin98',
}

const RPC_URLS = {
  1: REACT_APP_RPC_URL_1,
  3: REACT_APP_RPC_URL_3,
  4: REACT_APP_RPC_URL_4,
  97: REACT_APP_RPC_BSC_URL_97,
  56: REACT_APP_RPC_BSC_URL_56,
}

export const injected = new InjectedConnector({supportedChainIds: [4, 3, 1, 56, 97]})

// export const network = new NetworkConnector({
//   urls: {
//     1337: RPC_URLS[1],
//     4: RPC_URLS[4],
//   },
//   defaultChainId: 1337,
// })

export const walletconnect = new WalletConnectConnector({
  qrcode: true,
  infuraId: REACT_APP_INFURA_ID,
  rpc: RPC_URLS,
  // bridge: 'https://bridge.walletconnect.org/',
  // chainId use for trustK wallet
  chainId:  parseInt(String(process.env.REACT_APP_CHAIN_ID), 10),
  // chainId: 1,
  supportedChainIds: [4, 3, 1, 56, 97],
  // clientMeta: {}
})

export const binance = new BscConnector({
  supportedChainIds: [4, 3, 1, 97, 56],
})

// export const trustkeys = new TrustKeysConnector({
//   supportedChainIds: [4, 3, 1, 97, 56],
// })

// export const coin98 = new Coin98Connector({
//   supportedChainIds: [4, 3, 1, 97, 56],
// })

// export const walletlink = new WalletLinkConnector({
//   url: RPC_URLS[1],
//   appName: 'NFT-marketplace',
// })

// export const ledger = new LedgerConnector({
//   chainId: 1,
//   url: RPC_URLS[1],
//   pollingInterval: POLLING_INTERVAL,
// })

// export const trezor = new TrezorConnector({
//   chainId: 1,
//   url: RPC_URLS[1],
//   pollingInterval: POLLING_INTERVAL,
//   manifestEmail: 'dummy@abc.xyz',
//   manifestAppUrl: 'http://localhost:3000',
// })

// export const lattice = new LatticeConnector({
//   chainId: 4,
//   appName: 'NFT-marketplace',
//   url: RPC_URLS[4],
// })

// export const frame = new FrameConnector({ supportedChainIds: [1] })

// export const authereum = new AuthereumConnector({ chainId: 42 })

// export const fortmatic = new FortmaticConnector({
//   apiKey: process.env.REACT_APP_FORTMATIC_API_KEY as string,
//   chainId: 4,
// })

// export const magic = new MagicConnector({
//   apiKey: process.env.REACT_APP_MAGIC_API_KEY as string,
//   chainId: 4,
//   email: 'hello@example.org',
// })

// export const portis = new PortisConnector({
//   dAppId: process.env.REACT_APP_PORTIS_DAPP_ID as string,
//   networks: [1, 100],
// })

// export const torus = new TorusConnector({ chainId: 1 })

export const connectorsByName = {
  [ConnectorNames.Metamask]: injected,
  // [ConnectorNames.Network]: network,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.Binance]: binance,
  // [ConnectorNames.TrustKeys]: trustkeys,
  // [ConnectorNames.Coin98]: coin98,
  // [ConnectorNames.WalletLink]: walletlink,
  // [ConnectorNames.Ledger]: ledger,
  // [ConnectorNames.Trezor]: trezor,
  // [ConnectorNames.Lattice]: lattice,
  // [ConnectorNames.Frame]: frame,
  // [ConnectorNames.Authereum]: authereum,
  // [ConnectorNames.Fortmatic]: fortmatic,
  // [ConnectorNames.Magic]: magic,
  // [ConnectorNames.Portis]: portis,
  // [ConnectorNames.Torus]: torus,
}
