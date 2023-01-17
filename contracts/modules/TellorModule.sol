// SPDX-License-Identifier: UNLICENSED
import "../interfaces/IBaseWrapper.sol";
import "../interfaces/ITellorWrapper.sol";
import "hardhat/console.sol";
pragma solidity ^0.8.13;

contract TellorWrapper is IBaseWrapper {
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
        ITellorWrapper tellor = ITellorWrapper(_priceFeedAddress);
        bytes memory _queryData = abi.encode(
            "SpotPrice",
            abi.encode(_base, _quote)
        );
        bytes32 _queryId = keccak256(_queryData);

        (, bytes memory _value, uint256 _timestampRetrieved) = tellor
            .getDataBefore(_queryId, block.timestamp - 20 minutes);

        if (_timestampRetrieved == 0) return (0, 0, 18);
        require(block.timestamp - _timestampRetrieved < 24 hours);
        return (abi.decode(_value, (uint256)), _timestampRetrieved, 18);
    }

    /**
     * @dev Returns the smallest of two numbers.
     */
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }
}
