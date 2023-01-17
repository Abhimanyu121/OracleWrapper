import { expect } from "chai";
import { ethers } from "hardhat";
import { AbiCoder } from "@ethersproject/abi";
import { BigNumber, Contract } from "ethers";

describe("ChainLink Tests", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    let ChainlinkWrapper;
    let chainlinkWrapper: Contract;
    let abiCoder: AbiCoder;
    const oracleAddress = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
    describe("Deployment", function () {
        this.beforeAll(async () => {
            ChainlinkWrapper = await ethers.getContractFactory("ChainlinkWrapper")
            chainlinkWrapper = await ChainlinkWrapper.deploy();
            abiCoder = new AbiCoder();
        })
        it("It should expect price", async function () {
            const encodedData = abiCoder.encode(["address"], [oracleAddress]);
            const result = await chainlinkWrapper.getPrice(encodedData);
            //price
            expect(result[0]).to.be.deep.equal(BigNumber.from("157944000000"));
            //time stamp
            expect(result[1]).to.be.deep.equal(BigNumber.from("1673967335"));
            //decimals
            expect(result[2]).to.be.deep.equal(8);

        });

    });

});
