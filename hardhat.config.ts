import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      forking: {
        url: "https://mainnet.infura.io/v3/53e706eaa088405491d1e311f6a6938b",
        blockNumber: 16427365
      }
    }
  }
};

export default config;
