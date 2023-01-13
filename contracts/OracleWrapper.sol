// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "./interfaces/IBaseWrapper.sol";

contract PrimaryWrapper is IBaseWrapper {
    function getPrice(
        bytes calldata encodedData
    ) external override returns (uint256, uint8, uint8) {}
}
