import { getEth } from "./instance";

async function requestAccess() {
  const eth = getEth()
  const res: string[] = await eth.request({ method: "eth_requestAccounts" });

  console.log('requestAccess:',res);
  
  return res && res.length > 0;
}

async function requestSigner() {
  const eth = getEth()
  const signers: string[] = await eth.request({ method: "eth_accounts" });

  return signers.length > 0;
}

export { requestAccess, requestSigner }