import { expect } from "chai";
import { ethers } from "hardhat";
import { AbiCoder } from "@ethersproject/abi";
import { BigNumber, Contract } from "ethers";

describe("Primary Wrapper Tests", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    let PrimaryWrapper;
    let primaryWrapper: Contract;
    let bandWrapper: Contract;
    let BandWrapper;
    let abiCoder: AbiCoder;
    const oracleAddress = "0xDA7a001b254CD22e46d3eAB04d937489c93174C3";
    const quote = "USD";
    const base = "ETH";
    describe("Deployment", function () {
        this.beforeEach(async () => {
            PrimaryWrapper = await ethers.getContractFactory("PrimaryWrapper")
            primaryWrapper = await PrimaryWrapper.deploy();
            BandWrapper = await ethers.getContractFactory("BandWrapper")
            bandWrapper = await BandWrapper.deploy();
            abiCoder = new AbiCoder();
        })
        it("It should add module", async function () {
            const moduleAddress = bandWrapper.address;
            await primaryWrapper.addModule(moduleAddress);
            const result = await primaryWrapper.supportedModules(moduleAddress);
            expect(result).to.be.deep.equal(true);

        });
        it("It should add query", async function () {
            const _queryIdentifier = abiCoder.encode(["uint256"], [1]);
            const _queryData = abiCoder.encode(["address", "string", "string"], [oracleAddress, base, quote]);
            const moduleAddress = bandWrapper.address;
            await primaryWrapper.addModule(moduleAddress);
            await primaryWrapper.addQuery(_queryIdentifier, _queryData, moduleAddress);
            const result = await primaryWrapper.queries(_queryIdentifier);
            expect(result[0]).to.be.deep.equal(moduleAddress);
            expect(result[1]).to.be.deep.equal(_queryData);



        });

        it("It should get price", async function () {
            const _queryIdentifier = abiCoder.encode(["uint256"], [1]);
            const _queryData = abiCoder.encode(["address", "string", "string"], [oracleAddress, base, quote]);
            const moduleAddress = bandWrapper.address;
            await primaryWrapper.addModule(moduleAddress);
            await primaryWrapper.addQuery(_queryIdentifier, _queryData, moduleAddress);
            const result = await primaryWrapper.getPrice(_queryIdentifier);
            //price
            expect(result[0]).to.be.deep.equal(BigNumber.from("1584352500000000000000"));
            //time stamp
            expect(result[1]).to.be.deep.equal(BigNumber.from("1673968129"));
            //decimals
            expect(result[2]).to.be.deep.equal(18);
        });

        // it("It should expect price", async function () {
        //     const encodedData = abiCoder.encode(["address"], [oracleAddress]);
        //     const result = await primaryWrapper.getPrice(encodedData);
        //     //price
        //     expect(result[0]).to.be.deep.equal(BigNumber.from("157944000000"));
        //     //time stamp
        //     expect(result[1]).to.be.deep.equal(BigNumber.from("1673967335"));
        //     //decimals
        //     expect(result[2]).to.be.deep.equal(8);

        // });

        // it("It should expect price", async function () {
        //     const encodedData = abiCoder.encode(["address"], [oracleAddress]);
        //     const result = await primaryWrapper.getPrice(encodedData);
        //     //price
        //     expect(result[0]).to.be.deep.equal(BigNumber.from("157944000000"));
        //     //time stamp
        //     expect(result[1]).to.be.deep.equal(BigNumber.from("1673967335"));
        //     //decimals
        //     expect(result[2]).to.be.deep.equal(8);

        // });

    });

});
