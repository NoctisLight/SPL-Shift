# Level 01 — Distribution

## Story

Your token exists. Now it's time to **distribute** it.

You've got a list of early supporters — 3 wallets that backed your project from
the start. You need to airdrop tokens to each of them. But here's the thing: none
of them have token accounts yet. You need to create their ATAs and send tokens in
one clean operation.

## Objectives

1. Use the **mint from Level 00** (read from state.json)
2. Generate **3 recipient wallets**
3. For each recipient: create their ATA and transfer tokens from your wallet
4. Distribution:
   - Recipient 1: **1,000,000 tokens**
   - Recipient 2: **500,000 tokens**
   - Recipient 3: **250,000 tokens**

All in a **single transaction**.

## Constraints

- **Raw instructions only** — build each createATA + transfer instruction by hand
- All 6 instructions (3 ATA creations + 3 transfers) in **one transaction**
- You must use `createTransferInstruction`, not `transfer()`

## Concepts Covered

- `createAssociatedTokenAccountInstruction` — creating ATAs for other wallets
- `createTransferInstruction` — moving tokens between accounts
- Batch operations in a single transaction
- ATA derivation for different owners

## How to run

```bash
npm run level 1
npm run check 1
```

## Validation criteria

- 3 recipient ATAs exist on-chain
- Recipient 1 holds exactly 1,000,000 tokens
- Recipient 2 holds exactly 500,000 tokens
- Recipient 3 holds exactly 250,000 tokens
- Your wallet balance decreased by 1,750,000 tokens
