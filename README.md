# Oracle Wrapper

The oracle wrapper is a set of smart contracts that gives one a common interface to connect their smart contracts to multiple oracles without changing anything in the code. 

## Oracles Currently Supported - 

- Band Protocol
- Chainlink
- Tellor

List of other supported Oracle Modules - https://github.com/Abhimanyu121/OracleWrapper/tree/main/contracts/modules


## Tutorial

### Step 1

Deploy the (Oracle Wrapper)[https://github.com/Abhimanyu121/OracleWrapper/blob/main/contracts/OracleWrapper.sol] contract

### Step 2

Deploy the modules for the oracles you want to use from the list of modules and add them to the wrapper using the `addModule` function

## Step 3

Add The queries you want to call in your primary smart contracts using `addQuery`

## Step 4

Call the `getPrice` function from other contracts with the query Id to get the oracle data.

Commands - 


```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
