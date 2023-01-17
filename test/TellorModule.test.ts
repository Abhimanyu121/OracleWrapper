import { expect } from "chai";
import { ethers } from "hardhat";
import { AbiCoder } from "@ethersproject/abi";
import { BigNumber, Contract } from "ethers";

describe("Tellor Tests", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    let TellorWrapper;
    let tellorWrapper: Contract;
    let abiCoder: AbiCoder;
    const oracleAddress = "0xB3B662644F8d3138df63D2F43068ea621e2981f9";
    const quote = "usd";
    const base = "eth";
    describe("Deployment", function () {
        this.beforeAll(async () => {
            TellorWrapper = await ethers.getContractFactory("TellorWrapper")
            tellorWrapper = await TellorWrapper.deploy();
            abiCoder = new AbiCoder();
        })
        it("It should expect price", async function () {
            const encodedData = abiCoder.encode(["address", "string", "string"], [oracleAddress, base, quote]);
            const result = await tellorWrapper.getPrice(encodedData);
            //price
            expect(result[0]).to.be.deep.equal(BigNumber.from("1573270000000000000000"));
            //time stamp
            expect(result[1]).to.be.deep.equal(BigNumber.from("1673967095"));
            //decimals
            expect(result[2]).to.be.deep.equal(18);

        });

    });

});
