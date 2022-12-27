const path = require("path");
const fs = require("fs");
const solc = require("solc");

const realEstatePath = path.resolve(__dirname, "contracts", "realEstate.sol");

const source = fs.readFileSync(realEstatePath, "utf8");
var input = {
  language: "Solidity",
  sources: {
    "realEstate.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const complieData = JSON.parse(solc.compile(JSON.stringify(input)));
const abi = complieData.contracts["realEstate.sol"].RealEstate.abi;
const bytecode =
  complieData.contracts["realEstate.sol"].RealEstate.evm.bytecode.object;
module.exports = { abi, bytecode };
