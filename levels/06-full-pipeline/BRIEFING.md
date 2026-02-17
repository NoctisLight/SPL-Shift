# Level 06 — The Full Pipeline (Bonus)

## Story

You've done everything — forged a token, distributed it, managed a treasury,
blacklisted a bad actor, decentralized control, and cleaned up.

Now do it all again. From scratch. In **as few transactions as possible**.

This is how real protocols operate. Every transaction costs fees, every round-trip
adds latency. Efficiency matters. Can you bundle the entire token lifecycle into
the minimum number of sends?

## Objectives

Reproduce the entire lifecycle from Levels 00-05 with a **fresh mint**:

1. Create mint, init, create ATA, mint 21M tokens
2. Distribute to 3 recipients (1M, 500k, 250k)
3. Approve delegate, delegate transfer 200k, revoke
4. Freeze Recipient 3, burn their tokens, thaw
5. Transfer mint authority, renounce freeze authority
6. Close Recipient 3's empty ATA

## Constraints

- **Minimum transactions challenge**: what's the theoretical minimum?
- Think about which instructions can be bundled together (same signers)
  vs which require separate transactions (different signers)
- Raw instructions only
- Track your transaction count — print it at the end

## Concepts Covered

- Transaction optimization
- Instruction bundling
- Signer set management
- Everything from Levels 00-05 combined

## How to run

```bash
npm run level 6
npm run check 6
```

## Validation criteria

Same as all previous levels combined, applied to your fresh mint.

## Think about it

- Level 00 + Level 01 — can these be one transaction? (same signer)
- Level 02 — the delegate needs to sign... can you pre-approve in a prior tx?
- Level 03 — freeze/thaw/burn order matters for bundling
- Level 04 + 05 — can authority changes + close be bundled?

What's your final transaction count?
