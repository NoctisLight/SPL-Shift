# Level 04 — Decentralization

## Story

Your token has proven itself. The community trusts it. Now it's time to do
what every credible project eventually does: **give up control**.

You're going to transfer the mint authority to a "governance" wallet (simulating
a DAO or multisig), and **renounce** the freeze authority entirely by setting it
to `null`. Once freeze authority is null, nobody — not even you — can ever freeze
accounts again.

This is irreversible. There's no "undo" for renouncing authority. Choose wisely.

## Objectives

1. Generate a **governance wallet** (simulating a DAO)
2. **Transfer mint authority** from your wallet to the governance wallet
3. **Renounce freeze authority** (set to `null`)

## Constraints

- Raw instructions only
- Both authority changes in a **single transaction**
- After this level, you should NOT be able to mint new tokens or freeze accounts

## Concepts Covered

- `createSetAuthorityInstruction` — changing authorities
- `AuthorityType.MintTokens` — mint authority
- `AuthorityType.FreezeAccount` — freeze authority
- Setting authority to `null` (renouncing)
- Irreversibility of authority renouncement

## How to run

```bash
npm run level 4
npm run check 4
```

## Validation criteria

- Mint authority = governance wallet (not your wallet)
- Freeze authority = null (renounced)
- You can no longer mint tokens (authority transferred)
