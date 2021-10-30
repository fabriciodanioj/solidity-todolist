// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.5.0;

contract Helpers {
    function emptyString (string memory _content) internal pure returns(bool) {
      bytes memory tempEmptyStringTest = bytes(_content); 

      return tempEmptyStringTest.length != 0;
    }

}
