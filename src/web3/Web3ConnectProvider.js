import {useEffect} from 'react'
import {useWeb3React, UnsupportedChainIdError} from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {UserRejectedRequestError as UserRejectedRequestErrorWalletConnect} from '@web3-react/walletconnect-connector'
import {message} from "antd";
import dynamic from "next/dynamic";
const Updater = dynamic(() => import("/web3/updater"), {ssr: false})

function getErrorMessage(error) {
  console.log(error)

  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network. Please connect to Binance Smart Chain network"
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
        error instanceof UserRejectedRequestErrorWalletConnect
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

const Web3ConnectProvider = ({children}) => {
  const {library, chainId, account, error} = useWeb3React()

  useEffect(() => {
    if (!!error) {
      message.warn(getErrorMessage(error))
    }
  }, [error])

  return (
    <>
      <Updater />
      {children}
    </>
  )
}

export default Web3ConnectProvider
