Gotcha — GitHub is swallowing parts of the README because one of the code fences isn’t closing cleanly. Easiest fix: replace the whole file with this **minimal, fence-safe** Markdown (no horizontal rules, clean spacing, only triple backticks).

Copy everything between the lines and paste into `README.md`:

````markdown
# Create Your Own ERC-20 (2025)

Simple ERC-20 (fixed supply + Permit) using Hardhat + TypeScript.

## 1) Prerequisites

- **Node 22 LTS** (recommend [nvm-windows](https://github.com/coreybutler/nvm-windows))

```powershell
nvm install 22
nvm use 22
node -v
npm -v
````

* **Git** and **VS Code** (recommended)

## 2) Clone the starter repo

```bash
git clone <YOUR_REPO_URL> erc20-token
cd erc20-token
```

> If you’re following the video, this repo contains a `token_complete/` folder you’ll copy files from later.

## 3) Initialize Hardhat

```bash
cd token_build
npx hardhat --init
```

## 4) Go through the Hardhat prompts

* Choose **TypeScript** template
* Choose **Ethers / TypeScript** tooling (if asked)
* **Yes** to install recommended dependencies

## 5) Install app dependencies

```bash
npm install @openzeppelin/contracts
npm install dotenv
```

## 6) Create `.env` (project root)

```dotenv
SEPOLIA_RPC_URL=
PRIVATE_KEY=
ETHERSCAN_API_KEY=
```

**Notes**

* Use a **throwaway dev wallet** (testnet only).
* Keep the `0x` prefix on `PRIVATE_KEY`.
* Never commit `.env` (Hardhat template usually git-ignores it—double-check).

## 7) Copy in the example files (from `token_complete/`)

Copy these into your Hardhat project:

* `contracts/MyToken.sol`
* `test/MyToken.ts`
* `scripts/deploy.ts`
* `hardhat.config.ts` (replace your generated one)

## 8) Run tests

```bash
npx hardhat test
```

> You don’t need to compile first—`hardhat test` compiles automatically.
> (Optional: `npx hardhat compile` to check build only.)

## 9) Deploy (Sepolia)

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

Copy the deployed address from the console output.

## 10) Verify on Etherscan (optional)

```bash
# Pass the exact constructor arg (1,000,000 * 10^18 in this example)
npx hardhat verify --network sepolia <DEPLOYED_ADDRESS> 1000000000000000000000000
```

## What you get

* **`MyToken.sol`**: ERC-20 with **fixed supply** + **ERC20Permit** (EIP-2612).
* **Test**: Verifies the deployer receives the entire initial supply.
* **Deploy script**: Ethers v6 style (`waitForDeployment`, `getAddress`).

## Troubleshooting

* **`INSUFFICIENT_FUNDS` on deploy** → get Sepolia ETH from a faucet.
* **No account provided / bad key** → ensure `PRIVATE_KEY` in `.env` includes the `0x` prefix.
* **RPC errors** → verify `SEPOLIA_RPC_URL` is a valid HTTPS endpoint (Alchemy/Infura/etc.) and that Sepolia is enabled in your provider project.
* **Verify fails** → constructor arg must match *exactly*; ensure Solidity version & optimizer settings in `hardhat.config.ts` match your contract. Try again after \~30–60s.

## Optional npm scripts

Add to **package.json**:

```json
{
  "scripts": {
    "build": "hardhat compile",
    "test": "hardhat test",
    "deploy:sepolia": "hardhat run scripts/deploy.ts --network sepolia",
    "verify:sepolia": "hardhat verify --network sepolia"
  }
}
```

Usage:

```bash
npm run deploy:sepolia
npm run verify:sepolia -- <DEPLOYED_ADDRESS> 1000000000000000000000000
```

## 🚀 Production Deployment

Once you’re comfortable on Sepolia, you can deploy to **Ethereum mainnet** (or another L1/L2).

### 1) Fund your deployer wallet

* Use a **fresh wallet** (not your personal one).
* Ensure enough ETH for gas.

### 2) Update `.env`

```dotenv
MAINNET_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY   # or Alchemy/QuickNode
PRIVATE_KEY=0xYOUR_MAINNET_PRIVATE_KEY
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_KEY
```

### 3) Add network to `hardhat.config.ts`

```ts
networks: {
  sepolia: { /* ... */ },
  mainnet: {
    url: process.env.MAINNET_RPC_URL || "",
    chainId: 1,
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
  },
},
```

### 4) Deploy to mainnet

```bash
npx hardhat run scripts/deploy.ts --network mainnet
```

### 5) Verify on Etherscan

```bash
npx hardhat verify --network mainnet <DEPLOYED_ADDRESS> 1000000000000000000000000
```

**Production tips**

* Triple-check constructor args; supply/config are immutable once live.
* Gas can spike—deploy during low-fee windows.
* Consider a **security review** if this token will hold value.
* Everything on mainnet is permanent and public.

```

If GitHub still renders oddly, make sure:
- Every code block closes with **exactly three backticks** (no extra ticks/spaces).
- You pasted in **Raw** mode (GitHub’s editor → “Raw” button can help avoid hidden characters).
::contentReference[oaicite:0]{index=0}
```
