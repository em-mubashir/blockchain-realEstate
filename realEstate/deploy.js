const { interfaces } = require("mocha");
const Web3 = require("web3");
const { abi, bytecode } = require("./compile");

//provider
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy contract from", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: 6721975, gassPrice: 20000000000 });

  console.log(abi);
  console.log("contract deployed to ", result.options.address);
};
deploy();
