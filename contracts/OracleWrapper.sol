// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "./interfaces/IBaseWrapper.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrimaryWrapper is Ownable {
    struct Query {
        IBaseWrapper module;
        bytes queryData;
    }
    mapping(bytes => Query) public queries;
    mapping(address => bool) public supportedModules;

    event ModuleAdded(address indexed moduleAddress);

    event QueryAdded(
        address indexed moduleAddress,
        bytes indexed queryIdentifier,
        bytes indexed queryData
    );

    function getPrice(bytes calldata _queryId)
        external
        view
        returns (
            uint256,
            uint256,
            uint8
        )
    {
        Query memory query = queries[_queryId];
        return query.module.getPrice(query.queryData);
    }

    function addQuery(
        bytes calldata _queryIdentifier,
        bytes calldata _queryData,
        address moduleAddress
    ) external onlyOwner {
        require(supportedModules[moduleAddress], "Module address invalid");
        Query memory query = Query(IBaseWrapper(moduleAddress), _queryData);
        queries[_queryIdentifier] = query;
        emit QueryAdded(moduleAddress, _queryIdentifier, _queryData);
    }

    function addModule(address moduleAddress) external onlyOwner {
        require(moduleAddress != address(0), "Module address invalid");

        supportedModules[moduleAddress] = true;
        emit ModuleAdded(moduleAddress);
    }
}
