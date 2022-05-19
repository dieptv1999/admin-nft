import {useWeb3React} from "@web3-react/core";
import useConnect from "../hooks/useConnect";
import {useEffect, useState} from "react";
import constant from "../utils/constant";
import {ConnectorNames, connectorsByName, injected} from "./connectors";
import utils from "../utils";
import useInactiveListener from "../hooks/useInactiveListener";
import {useSelector} from "react-redux";


function Updater() {
  const {activate, active, account, deactivate, library} = useWeb3React()
  const activatingConnector = useSelector(state => state.wallet?.activatingConnector)
  const {connectWallet} = useConnect();
  const [tried, setTried] = useState(false)

  useInactiveListener(!tried || !!activatingConnector)

  useEffect(() => {
    if (process.browser && localStorage.getItem(constant.CONNECTOR)) {
      if (localStorage.getItem(constant.CONNECTOR) === ConnectorNames.Metamask)
        injected.isAuthorized().then((isAuthorized) => {
          if (isAuthorized) {
            activate(injected, undefined, true)
              .catch(() => {
                setTried(true)
              })
          } else {
            utils.logout();
            setTried(true)
          }
        })
      else if ((localStorage.getItem(constant.CONNECTOR) === ConnectorNames.WalletConnect) && localStorage.getItem('walletconnect')) {
        activate(connectorsByName[ConnectorNames.WalletConnect])
      } else {
        utils.logout();
      }
    }
  }, [process.browser])

  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])

  return (<div />)
}

export default Updater;
