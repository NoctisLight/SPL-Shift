# Level 05 — Cleanup

## Story

Recipient 3's account is empty (you burned their tokens in Level 03). That account
is sitting on-chain, taking up space, with **rent** locked inside it.

On Solana, every account holds a minimum SOL balance for rent exemption. When you
close an empty token account, that SOL gets returned to whoever you specify.

It's good practice — and free money. Clean up after yourself.

## Objectives

1. **Close** Recipient 3's empty ATA
2. Send the recovered rent SOL to **your wallet**

## Constraints

- Raw instructions only
- You need to think about **who** has authority to close this account.
  Recipient 3 is the owner... but you don't have their private key.
  How did you handle this? (Hint: check what Level 03 left behind,
  or think about `AuthorityType.CloseAccount`)

## Concepts Covered

- `createCloseAccountInstruction` — closing token accounts
- Rent recovery
- Account authority and who can close what
- Understanding the `CloseAccount` authority type

## How to run

```bash
npm run level 5
```

## Validation criteria

- Recipient 3's ATA no longer exists on-chain
- Your SOL balance increased (rent recovered)
