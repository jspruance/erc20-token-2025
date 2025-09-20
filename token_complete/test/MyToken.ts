import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("MyToken", function () {
  it("mints initial supply to deployer", async function () {
    const [deployer] = await ethers.getSigners();
    const initial = 1_000_000n * 10n ** 18n;

    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy(initial);
    await token.waitForDeployment();

    const bal = await token.balanceOf(deployer.address);
    expect(bal).to.equal(initial);
  });
});
