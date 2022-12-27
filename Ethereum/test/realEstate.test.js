const assert = require("assert");
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
const { abi, bytecode } = require("../compile");

let accounts;
let realEstate;
let propertyArray;
beforeEach(async () => {
  //get list of all accounts
  accounts = await web3.eth.getAccounts();

  //   deploy contract
  realEstate = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: 6721975, gassPrice: 20000000000 });
});

describe("realEstate", () => {
  it("deploys the contract", () => {
    assert.ok(realEstate.options.address);
  });

  it("can add property", async () => {
    await realEstate.methods
      .addProperty("131", "1311")
      .send({ from: accounts[0], gas: 6721975, gassPrice: 20000000000 });
    propertyArray = await realEstate.methods.getProperties().call();
    assert.ok(propertyArray.length === 1);
  });

  it("can change the owner", async () => {
    await realEstate.methods
      .changeOwner(0, accounts[1])
      .send({ from: accounts[0] });
  });
});
