import { network } from "hardhat";
const { ethers } = await network.connect();

async function main() {
  const initial = 1_000_000n * 10n ** 18n; // 1,000,000 MTK with 18 decimals
  const Token = await ethers.getContractFactory("MyToken");
  const token = await Token.deploy(initial);
  await token.waitForDeployment();

  console.log("MyToken deployed to:", await token.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});