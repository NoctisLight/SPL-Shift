# Level 00 — The Forge

## Story

You just decided to launch your own token project on Solana. Before any distribution,
any listing, any hype — you need to **forge** the token itself.

Your job: create the mint, set yourself up as the authority, mint the initial supply
to your own wallet. This is day zero.

## Objectives

1. Create a new **Mint Account** with **6 decimals**
2. Set **your wallet** as both the **mint authority** and **freeze authority**
3. Create an **Associated Token Account** (ATA) for your wallet
4. Mint **21,000,000 tokens** to your ATA

All of this must happen in a **single transaction**.

## Constraints

- **Raw instructions only** — no `createMint()`, no `mintTo()` abstractions.
  Build every instruction by hand.
- One transaction. Four instructions. One send.

## Concepts Covered

- `SystemProgram.createAccount` — allocating accounts on-chain
- `createInitializeMint2Instruction` — configuring a mint
- `createAssociatedTokenAccountInstruction` — creating an ATA
- `createMintToInstruction` / `createMintToCheckedInstruction` — minting tokens
- Transaction building and signing

## How to run

```bash
# 1. Write your code in index.ts
# 2. Execute it
npm run level 0

# 3. Check your work
npm run check 0
```

## Validation criteria

- Mint account exists on-chain
- Decimals = 6
- Mint authority = your wallet
- Freeze authority = your wallet
- Your ATA exists and holds exactly 21,000,000 tokens (21,000,000,000,000 raw)
- Total supply = 21,000,000 tokens
