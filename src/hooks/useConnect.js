import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {UnsupportedChainIdError, useWeb3React} from "@web3-react/core";
import {useDispatch} from "react-redux";
import * as moment from 'moment'
import _, {throttle} from "lodash";
import {extractPublicKey} from "eth-sig-util";
import {publicKey} from "eth-crypto";
import * as EthCrypto from "eth-crypto";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import {NoBscProviderError} from "@binance-chain/bsc-connector";
import useNetwork from "./useNetwork";
import constant from "../utils/constant"
import rf from "../requests/RequestFactory"
import utils from '../utils'
import actions from '../redux/actions/wallet'
import {ConnectorNames, connectorsByName} from "../web3/connectors";

export default function useConnect() {
  const {activate, library, account, active, connector, deactivate} = useWeb3React()
  const dispatch = useDispatch()
  const [connectSuccess, setConnectSuccess] = useState(false)
  const [connecting, setConnecting] = useState(false);
  const [currentWallet, setCurrentWallet] = useState();
  const {networking} = useNetwork();
  const activationId = useRef(0)

  const nftMessage = `method: login Fanverse NFT
        signOnlyInPage: ${'https://theonly.biz/'}
        timestamp: ${moment().unix()}`;
  // const nftMessage = '68656c6c6f2074727573746b6579732065786368616e6765';


  const loginNFTIfNeed = async () => {
    const sessionKey = utils.getToken();
    if (!_.isEmpty(sessionKey)) {
      const timeExpired = sessionKey.substr(sessionKey.length - 10, 10);
      if (moment().unix() > (parseInt(timeExpired, 10) + 86400)) {
        await login();
      }
    } else {
      await login();
    }
  }

  // todo need to check with timestamp
  const login = async () => {
    const sig = await signPersonal(nftMessage);
    try {
      const pubkey = extractPublicKey({
        'data': `${nftMessage}`,
        sig,
      });
      const compressPubkey = publicKey.compress(pubkey.substr(2))

      const data = await rf.getRequest('UserRequest').login({
        pubkey: compressPubkey,
        message: `${nftMessage}`,
        sig: sig.substring(2),
      });

      if (data.error.code === 200) {
        localStorage.setItem(constant.SESSION, data.sessionkey);
        // _.debounce(() => dispatch(actionsUser.fetchUserInfo({
        //   address: account,
        // }, (data) => {
        //   localStorage.setItem(constant.NFT_PUBKEY, compressPubkey);
        //   if (data.avatar) localStorage.setItem(constant.USER_AVATAR, data.avatar);
        //   if (data.username) localStorage.setItem(constant.NFT_USERNAME, data.username)
        // })), 1000)();
        // dispatch(actionsSocket.setActionRegister(window.btoa(data.sessionkey)))
        setConnectSuccess(true)
      } else {
        // utils.showNotification(t('common.notification'), t('common.login.fail'), 'error')
      }
    } catch (e) {
      console.log(e, ': e src/wallet/connectors.js:59')
      utils.logout()
      setConnecting(false);
      localStorage.removeItem(constant.CONNECTOR)
      return false;
    }
  }

  const signPersonal = async (nftMessage) => {
    try {
      const sig = await library
        .getSigner(account)
        .signMessage(nftMessage)
      return sig;
    } catch (error) {
      // utils.showNotification(t('common.notification')
      //   ,`${t('common.failure')  }!${  error && error.message ? `\n\n${error.message}` : ''}`,
      //   'error')
      
    }
  }

  async function checkSign() {
    const address = utils.getAddress()
    if (address === account || _.isEmpty(address)) {
      localStorage.setItem(constant.ADDRESS, account);
      await loginNFTIfNeed()
      return
    }
    console.log('don \'t send')

    localStorage.setItem(constant.ADDRESS, account);
    signPersonal(nftMessage).then((sig) => {
      const pubkey = extractPublicKey({
        'data': `${nftMessage}`,
        sig,
      });
      const compressPubkey = EthCrypto.publicKey.compress(pubkey.substr(2))
      setConnectSuccess(true)
    })
    setConnecting(false)
  }

  useEffect(() => {
    _.throttle(async () => {
      if (library && (connector === connectorsByName[currentWallet]) && connecting && active) {
        await checkSign()
      } else {
        setConnectSuccess(false)
      }
    }, 1000)();
  }, [library, connecting, connector, active])

  const reset = useCallback(() => {
    if (
      connector &&
      connector instanceof WalletConnectConnector &&
      connector.walletConnectProvider?.wc?.uri
    ) {
      connector.walletConnectProvider = undefined
    }
    if (active) {
      deactivate()
    }
    dispatch(actions.setActivatingConnector(null))
  }, [active, deactivate])

  const connectWallet = useCallback(throttle(async (currentWallet) => {
    setConnecting(true)
    const id = activationId.current + 1;
    if (id !== activationId.current) {
      // setConnecting(false)
      return
    }
    if (
      active
      && !utils.getToken()
      && library
      && connector
      && (localStorage.getItem(constant.CONNECTOR) == currentWallet)
    )
    {
      dispatch(actions.setActivatingConnector(connectorsByName[currentWallet], currentWallet))
      await checkSign()
    } else if (!window.ethereum && (currentWallet === ConnectorNames.Metamask)) {
      window.location.href  = process.env.REACT_APP_DEEPLINK_METAMASK
    } else {
      localStorage.removeItem(constant.CONNECTOR)
      utils.logout()
      setCurrentWallet(currentWallet);
      dispatch(actions.setActivatingConnector(connectorsByName[currentWallet], currentWallet))
      await activate(connectorsByName[currentWallet], (error) => {
        if (error instanceof UnsupportedChainIdError) {
          if (networking) {
            activate(connector)
          }
        } else {
          localStorage.removeItem(constant.CONNECTOR)
          utils.logout()
          localStorage.removeItem("walletconnect")
          if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
            // utils.showNotification(t('Provider Error'), t('No provider was found'), 'error')
          } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect
          ) {
            if (connectorsByName[ConnectorNames.WalletConnect].walletConnectProvider) {
              connectorsByName[ConnectorNames.WalletConnect].walletConnectProvider = undefined
            }
            // utils.showNotification(t('Authorization Error'), t('Please authorize to access your account'), "error")
          } else {
            // utils.showNotification(t('common.notification'), error.message, "error")
          }
        }
      })
    }
  }, 1000), [active, library])

  return useMemo(()=> ({
      connectWallet,
      signPersonal,
      connectSuccess,
      connecting,
      deactivate,
    }), [connectWallet, signPersonal, connectSuccess, connecting, deactivate])
}
