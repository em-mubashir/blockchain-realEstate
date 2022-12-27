import web3 from "./web3";

const address = "0x41889F10EF12c5787DCdFa45901F31d32eb8ff3B";

const abi = [
  {
    inputs: [
      {
        internalType: "int256",
        name: "area",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "cninc",
        type: "int256",
      },
    ],
    name: "addProperty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "propertyIndex",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "changeOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getProperties",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "token",
            type: "bytes32",
          },
          {
            internalType: "int256",
            name: "area",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "cninc",
            type: "int256",
          },
        ],
        internalType: "struct RealEstate.Property[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "propertyList",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "token",
        type: "bytes32",
      },
      {
        internalType: "int256",
        name: "area",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "cninc",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export default new web3.eth.Contract(abi, address);
