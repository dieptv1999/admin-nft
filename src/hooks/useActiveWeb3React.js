import {useEffect, useRef, useState} from "react";
import {useWeb3React} from "@web3-react/core";
import {simpleRpcProvider} from "../utils/providers";

export default function useActiveWeb3React() {
  const {library, chainId, ...web3React} = useWeb3React()
  const refEth = useRef(library)
  const [provider, setProvider] = useState(library || simpleRpcProvider)

  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library || simpleRpcProvider)
      refEth.current = library
    }
  }, [library])

  return {library: provider, chainId: chainId ?? parseInt(process.env.REACT_APP_CHAIN_ID, 10), ...web3React}
}
