const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile"); //interface:abi

const provider = new HDWalletProvider(
  "grab sudden pull endless convince gift minute place fiction couch game luxury",
  "https://rinkeby.infura.io/v3/68b7a08109304042a644671fd72bab85"
);
const web3 = new Web3(provider); //unlock the account

const deploy = async () => {
  const accounts = await web3.eth.getAccounts(); //getting a list of accounts
  console.log("deploying from account", accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["new message"],
    })
    .send({ gas: "1000000", from: accounts[0] });
  console.log("contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
