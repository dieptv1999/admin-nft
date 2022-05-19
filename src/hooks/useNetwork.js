import useActiveWeb3React from "./useActiveWeb3React";
import {useCallback, useEffect, useMemo, useState} from "react";
import {ConnectorNames, connectorsByName} from "../web3/connectors";
import utils from "../utils";
import {CHAINS} from "../utils/constant";

export default function useNetwork() {
  const {connector, library, chainId} = useActiveWeb3React();
  const [networking, setNetworking] = useState(false);

  function checkForUnrecognizedOrNotAddedNetwork(switchError) {
    console.log(switchError);
    // This error code indicates that the chain has not been added to MetaMask
    // if it is not, then install it into the user MetaMask
    if (switchError.code == 4902) {
      return true;
    }

    const message = (switchError.message) ?? "";
    const testString = "Unrecognized chain ID";
    if (message.toLowerCase().includes(testString.toLowerCase())) {
      return true;
    }

    return false;
  }

  const setupNetwork = useCallback(() => {
    if (connector === connectorsByName[ConnectorNames.WalletConnect] || connector === connectorsByName[ConnectorNames.Binance]) {
      String.prototype.format = function () {
        return [...arguments].reduce((p, c) => p.replace(/%s/, c), this);
      };
      // utils.showNotification(t("common.network.error", {network: process.env.REACT_APP_NETWORK_NAME}), null, 'warning')
      return false
    }
    const provider = library.provider
    if (provider) {
      try {
        const chainCurrent = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
        provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{chainId: utils.toHex(chainCurrent)}],
        })
      } catch (error) {
        if (checkForUnrecognizedOrNotAddedNetwork(error)) {
          try {
            const chainCurrent = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
            provider.request({
              method: 'wallet_addEthereumChain',
              params: [{...CHAINS[chainCurrent]}],
            })
          } catch (addError) {
            console.error('Failed to setup the network in Metamask:', addError)
            // message.error("Don't exist network")
          }
        }
      }
    } else {
      console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
      // notification.error(t("home.network.error"))
    }
  }, [library, chainId])

  useEffect(() => {
    setNetworking(chainId && chainId === parseInt(process.env.REACT_APP_CHAIN_ID, 10))
  }, [chainId])

  return useMemo(() => {
    return {setupNetwork, networking}
  }, [setupNetwork, networking])
}
