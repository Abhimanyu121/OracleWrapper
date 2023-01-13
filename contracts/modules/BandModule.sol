// SPDX-License-Identifier: UNLICENSED
import "../interfaces/IBaseWrapper.sol";
import "../interfaces/IBandOracle.sol";

pragma solidity ^0.8.13;

contract BandWrapper is IBaseWrapper {
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
        (
            address _priceFeedAddress,
            string memory _base,
            string memory _quote
        ) = abi.decode(encodedData, (address, string, string));

        IStdReference priceFeed = IStdReference(_priceFeedAddress);
        IStdReference.ReferenceData memory data = priceFeed.getReferenceData(
            _base,
            _quote
        );
        return (
            data.rate,
            min(data.lastUpdatedBase, data.lastUpdatedQuote),
            18
        );
    }

    /**
     * @dev Returns the smallest of two numbers.
     */
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }
}
