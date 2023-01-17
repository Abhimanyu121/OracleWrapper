import { expect } from "chai";
import { ethers } from "hardhat";
import { AbiCoder } from "@ethersproject/abi";
import { BigNumber, Contract } from "ethers";

describe("Band Tests", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  let BandWrapper;
  let bandWrapper: Contract;
  let abiCoder: AbiCoder;
  const oracleAddress = "0xDA7a001b254CD22e46d3eAB04d937489c93174C3";
  const quote = "USD";
  const base = "ETH";
  describe("Deployment", function () {
    this.beforeAll(async () => {
      BandWrapper = await ethers.getContractFactory("BandWrapper")
      bandWrapper = await BandWrapper.deploy();
      abiCoder = new AbiCoder();
    })
    it("It should expect price", async function () {
      const encodedData = abiCoder.encode(["address", "string", "string"], [oracleAddress, base, quote]);
      const result = await bandWrapper.getPrice(encodedData);

      //price
      expect(result[0]).to.be.deep.equal(BigNumber.from("1584352500000000000000"));
      //time stamp
      expect(result[1]).to.be.deep.equal(BigNumber.from("1673968129"));
      //decimals
      expect(result[2]).to.be.deep.equal(18);

    });

  });

});
