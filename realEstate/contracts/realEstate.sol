// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Real Estate Contact
 */

contract RealEstate {

    address private owner;
    uint private index;

    struct Property {
        address owner;
        bytes32 token;
        int area;
        int cnic;
    }
    Property[] public propertyList;

    function addProperty(int area, int cnic) public  {
        bytes32 token = keccak256(abi.encodePacked(msg.sender,area,cnic,index));
          Property memory newProperty = Property({
          owner:msg.sender,
       token:token,
       area: area, 
       cnic:cnic
        });
        propertyList.push(newProperty);
        index++;
    }
      function changeOwner(uint propertyIndex,address newOwner) public {
        Property storage currentProperty = propertyList[propertyIndex];
        require(
            currentProperty.owner == msg.sender,
            "You are not authorized to perform this transaction."
        );
        currentProperty.owner = newOwner;
    }
    function getProperties() public view returns (Property[] memory){
        return propertyList;
    }
} 