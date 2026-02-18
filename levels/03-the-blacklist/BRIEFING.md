# Level 03 — The Blacklist

## Story

Bad news. Recipient 3 has been flagged for suspicious activity — they've been
using your tokens in a wash trading scheme. As the freeze authority, you have the
power to **freeze** their account, cutting them off from all token operations.

After investigation, you decide to **burn** their tokens (removing them from
circulation) and then **thaw** the account so they can close it themselves.

This is the controversial side of having a freeze authority. It's power — and
with it comes responsibility.

## Objectives

1. **Freeze** Recipient 3's ATA (from Level 01)
2. **Burn** all of Recipient 3's tokens (250,000 tokens)
3. **Thaw** Recipient 3's ATA

## Constraints

- Raw instructions only
- The freeze and thaw must use your wallet as the freeze authority
- To burn from someone else's account, you need to be the **delegate** first
  (approve yourself as delegate on their account... but wait, the account is
  frozen! Think about the order of operations carefully.)

## Concepts Covered

- `createFreezeAccountInstruction` — freezing a token account
- `createThawAccountInstruction` — unfreezing a token account
- `createBurnInstruction` — destroying tokens
- Understanding the interaction between freeze state and other operations
- Order of operations matters!

## How to run

```bash
npm run level 3
```

## Validation criteria

- Recipient 3's ATA is thawed (not frozen)
- Recipient 3's balance is 0
- Total supply decreased by 250,000 tokens

## Hint

> You can't burn from a frozen account. You also can't approve a delegate on a
> frozen account. Think about what order makes this possible. There are multiple
> valid approaches — the simplest might surprise you.
