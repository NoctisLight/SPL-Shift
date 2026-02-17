# Level 02 — The Treasury

## Story

Your token is live and distributed. Now you need a **treasury manager** — someone
(or something) that can spend from your wallet on your behalf, but only up to a
certain limit.

Think of it like giving a CFO a company credit card with a spending cap. They can
make payments without you signing every single one, but they can't drain the whole
account.

After the manager completes their work, you **revoke** their access. Trust, but verify.

## Objectives

1. Generate a **delegate wallet** (the treasury manager)
2. **Approve** the delegate to spend up to **500,000 tokens** from your ATA
3. The delegate transfers **200,000 tokens** from your ATA to Recipient 1 (from Level 01)
4. **Revoke** the delegate's remaining allowance

## Constraints

- The delegate must sign the transfer, **not** your main wallet
- Use `createApproveInstruction` and `createRevokeInstruction`
- The approve + delegate transfer can be in separate transactions (the delegate
  needs to sign the transfer, so it's a different signer set)
- The revoke must be its own instruction signed by you

## Concepts Covered

- `createApproveInstruction` — delegating token spending authority
- `createTransferInstruction` with a delegate as authority (not the owner)
- `createRevokeInstruction` — removing delegation
- Understanding signer requirements for delegated transfers

## How to run

```bash
npm run level 2
npm run check 2
```

## Validation criteria

- Delegate's allowance is revoked (delegated amount = 0)
- Recipient 1 received an additional 200,000 tokens (total: 1,200,000)
- Your wallet decreased by 200,000 tokens
