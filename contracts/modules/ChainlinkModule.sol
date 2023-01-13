// SPDX-License-Identifier: UNLICENSED
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "../interfaces/IBaseWrapper.sol";

pragma solidity ^0.8.13;

contract ChainlinkWrapper is IBaseWrapper {
    function getPrice(bytes calldata encodedData)
        external
        view
        override
        returns (
            uint256,
            uint256,
            uint8
        )
    {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            abi.decode(encodedData, (address))
        );
        (
            ,
            /*uint80 roundID*/
            int256 price, /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
            ,
            uint256 timestamp,

        ) = priceFeed.latestRoundData();
        uint8 decimals = priceFeed.decimals();
        return (uint256(price), timestamp, decimals);
    }
}
