import {useEffect, useState} from 'react'
import BigNumber from 'bignumber.js'
import {useWeb3React} from '@web3-react/core'
import useContract from "./useContract";
import {read, write} from "/utils/contractHelpers"

export const FetchStatus = {
  NOT_FETCHED: 'not-fetched',
  SUCCESS: 'success',
  FAILED: 'failed',
}

export default function  useTokenBalance(tokenAddress) {
  const {NOT_FETCHED, SUCCESS, FAILED} = FetchStatus
  const [balanceState, setBalanceState] = useState({
    balance: new BigNumber(0),
    fetchStatus: NOT_FETCHED,
  })
  const {account} = useWeb3React()
  const contract = useContract(tokenAddress);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (account) {
      setLoading(true);
      (async () => {
        try {
          const res = await contract?.balanceOf(account)
          if (res)
            setBalanceState({balance: res, fetchStatus: SUCCESS})
        } catch (e) {
          console.error(e)
          setBalanceState((prev) => ({
            ...prev,
            fetchStatus: FAILED,
          }))
        } finally {
          setLoading(false);
        }
      })()
    }
  }, [account, tokenAddress, SUCCESS, FAILED])

  return {
    ...balanceState,
    loadingTokenBalance: loading,
  }
}

// export const useTotalSupply = () => {
//   const { slowRefresh } = useRefresh()
//   const [totalSupply, setTotalSupply] = useState<BigNumber>()
//
//   useEffect(() => {
//     async function fetchTotalSupply() {
//       const cakeContract = getCakeContract()
//       const supply = await cakeContract.totalSupply()
//       setTotalSupply(new BigNumber(supply.toString()))
//     }
//
//     fetchTotalSupply()
//   }, [slowRefresh])
//
//   return totalSupply
// }
//
// export const useBurnedBalance = (tokenAddress: string) => {
//   const [balance, setBalance] = useState(BIG_ZERO)
//   const { slowRefresh } = useRefresh()
//
//   useEffect(() => {
//     const fetchBalance = async () => {
//       const contract = getBep20Contract(tokenAddress)
//       const res = await contract.balanceOf('0x000000000000000000000000000000000000dEaD')
//       setBalance(new BigNumber(res.toString()))
//     }
//
//     fetchBalance()
//   }, [tokenAddress, slowRefresh])
//
//   return balance
// }
//
// export const useGetBnbBalance = () => {
//   const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED)
//   const [balance, setBalance] = useState(ethers.BigNumber.from(0))
//   const { account } = useWeb3React()
//   const { lastUpdated, setLastUpdated } = useLastUpdated()
//
//   useEffect(() => {
//     const fetchBalance = async () => {
//       try {
//         const walletBalance = await simpleRpcProvider.getBalance(account)
//         setBalance(walletBalance)
//         setFetchStatus(FetchStatus.SUCCESS)
//       } catch {
//         setFetchStatus(FetchStatus.FAILED)
//       }
//     }
//
//     if (account) {
//       fetchBalance()
//     }
//   }, [account, lastUpdated, setBalance, setFetchStatus])
//
//   return { balance, fetchStatus, refresh: setLastUpdated }
// }
//
// export const useGetCakeBalance = () => {
//   const { balance, fetchStatus } = useTokenBalance(tokens.cake.address)
//
//   // TODO: Remove ethers conversion once useTokenBalance is converted to ethers.BigNumber
//   return { balance: ethers.BigNumber.from(balance.toString()), fetchStatus }
// }
