// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IBaseWrapper {
    function getPrice(bytes calldata encodedData)
        external
        returns (
            uint256 price,
            uint256 timestamp,
            uint8 decimals
        );
}
