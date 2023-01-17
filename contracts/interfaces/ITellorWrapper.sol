// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface ITellorWrapper {
    /// Similar to getReferenceData, but with multiple base/quote pairs at once.
    function getDataBefore(bytes32 _queryId, uint256 _timestamp)
        external
        view
        returns (
            bool _ifRetrieveValue,
            bytes memory _value,
            uint256 _timestampRetrieved
        );
}
