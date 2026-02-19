# SPL Shift

<p align="center">
  <img src="assets/banner.png" alt="Blueshift - Learn how to build on Solana" width="100%" />
</p>

**Hands-on SPL Token exercises for [Blueshift](https://blueshift.gg) students.**

I love Blueshift's courses, but like any learning path, it can be hard to connect theory to real-world scenarios. You read the docs, you see the code snippets, but when it comes to building something real, that's where the gap is.

**SPL Shift** bridges that gap. Each level puts you in the shoes of a token project founder and walks you through the full lifecycle, from creation to decentralization. Every SPL Token instruction covered in Blueshift's [SPL Token with Web3.js](https://learn.blueshift.gg/en/courses/spl-token-with-web3js/introduction) course is used in a real context.

No hand-holding. No copy-paste. Real scenarios, real code.

---

## The Levels

| Level | Name | What you'll learn |
|-------|------|-------------------|
| **00** | The Forge | Create a mint, init, ATA, mint 21M tokens |
| **01** | Distribution | Batch airdrop to multiple wallets |
| **02** | The Treasury | Delegate spending, execute delegated transfer, revoke |
| **03** | The Blacklist | Freeze, burn, thaw. The controversial side of authority |
| **04** | Decentralization | Transfer mint authority, renounce freeze authority |
| **05** | Cleanup | Close empty accounts, recover rent |
| **06** | The Full Pipeline | Do it all again in minimum transactions (bonus) |

Each level builds on the previous one. They tell a story. Complete them in order.

---

## Setup

### Prerequisites

- Node.js 18+
- A Solana wallet with devnet SOL

### Install

```bash
git clone https://github.com/YOUR_USERNAME/spl-shift.git
cd spl-shift
npm install
```

### Configure

```bash
cp .env.example .env
```

Edit `.env` with your wallet secret key and RPC endpoint.

Need devnet SOL?
```bash
solana airdrop 2 --url devnet
```

---

## How it works

### 1. Read the briefing

Each level has a `BRIEFING.md` with the story, objectives, and constraints.

```bash
cat levels/00-the-forge/BRIEFING.md
```

### 2. Write your code

Edit the `index.ts` file in the level directory. The imports and boilerplate are already there, you fill in the `// TODO` sections.

### 3. Run and check

```bash
npm run level 0
```

This executes your code on devnet then automatically validates the result:

```
Level 00 — The Forge
──────────────────────
  ✓ Mint account exists
  ✓ Decimals: 6
  ✓ Mint authority: your wallet
  ✓ Freeze authority: your wallet
  ✓ Total supply: 21,000,000 tokens
  ✓ Your ATA holds 21,000,000 tokens

  6/6 passed — Level 00 complete!
```

---

## Constraints

Each level specifies constraints. Most levels require **raw instructions only**, no `createMint()`, no `mintTo()` abstractions. You build every instruction by hand. This is intentional. The abstractions are nice but you won't understand what's happening underneath until you've done it the hard way.

---

## SPL Token Concepts Covered

| Concept | Level |
|---------|-------|
| `SystemProgram.createAccount` | 00 |
| `createInitializeMint2Instruction` | 00 |
| `createAssociatedTokenAccountInstruction` | 00, 01 |
| `createMintToCheckedInstruction` | 00 |
| `createTransferInstruction` | 01, 02 |
| `createApproveInstruction` | 02 |
| `createRevokeInstruction` | 02 |
| `createFreezeAccountInstruction` | 03 |
| `createThawAccountInstruction` | 03 |
| `createBurnInstruction` | 03 |
| `createSetAuthorityInstruction` | 04 |
| `createCloseAccountInstruction` | 05 |
| Transaction optimization | 06 |

100% coverage of the Blueshift [SPL Token with Web3.js](https://learn.blueshift.gg/en/courses/spl-token-with-web3js/introduction) course.

---

## Contributing

Found a bug? Want to add a level? PRs welcome.

---

Built with frustration and love by a Blueshift student who wanted better exercises.
