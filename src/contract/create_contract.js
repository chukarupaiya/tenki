const ethers = require("ethers")



async function create_contract(latitude,longitude) {
  const contractabi = require("./tenki_user.json");
  const contractaddr = "0x5a2430e254681914726273896FfBF77f87d91614";

  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  // Prompt user for account connections
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();

  const contract_signer = new ethers.Contract(
    contractaddr,
    contractabi,
    signer
  );

  
  const input0 = "0.01";
  const decimals0 = "18";
  const amount = ethers.utils.parseUnits(input0, decimals0);
  
  const create = await contract_signer.create(latitude,longitude,{gasLimit: 210000,value:amount});
}

export default create_contract;
