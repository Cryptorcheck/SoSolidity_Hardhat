import { Eip1193Provider } from "ethers/lib.commonjs/providers";

function getEth(): Eip1193Provider {
  const eth = window.ethereum;

  if (!eth) { 
    throw new Error("No ethereum provider")
  }

  return eth
}

export { getEth }