import {useEffect, useMemo, useState} from "react";
import {useWeb3React} from "@web3-react/core";
import {POLLING_INTERVAL, ZERO} from "../utils/constant";
import utils from "../utils";

export default function useBalance() {
  const {account, library} = useWeb3React();
  const [balance, setBalance] = useState(ZERO);
  const [loadingBalance, setLoadingBalance] = useState(true);

  useEffect(() => {
    if (library && account) {
      let cancel = false

      // Poll wallet balance
      const pollBalance = utils.pollEvery(
        (
          account,
          onUpdate,
        ) => {
          let lastBalance = ZERO
          return {
            async request() {
              return library
                .getBalance(account)
                .then((balance) => {
                  return balance
                })
                .catch(() => ZERO)
            },
            onResult(balance) {
              if (!cancel && balance !== lastBalance) {
                lastBalance = balance
                onUpdate(balance)
              }
              if (loadingBalance) setLoadingBalance(false);
            },
          }
        },
        POLLING_INTERVAL,
      )

      // start polling balance every x time
      const stopPollingBalance = pollBalance(account, setBalance)
      return () => {
        cancel = true
        stopPollingBalance()
        setBalance(ZERO)
      }
    } else setBalance(ZERO)
  }, [account, library])

  return useMemo(() => {
    return {
      balance,
      loadingBalance,
    }
  }, [balance, loadingBalance])
}
