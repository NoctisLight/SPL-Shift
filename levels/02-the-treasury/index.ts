/**
 * Level 02 — The Treasury
 *
 * Delegate spending authority, execute a delegated transfer, then revoke.
 *
 * Objectives:
 *   1. Approve a delegate to spend 500,000 tokens from your ATA
 *   2. Delegate transfers 200,000 tokens to Recipient 1
 *   3. Revoke the delegate's remaining allowance
 *
 * Constraint: the delegate must sign the transfer, not you.
 */

import {
  Keypair,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

import {
  getAssociatedTokenAddressSync,
  createApproveInstruction,
  createTransferInstruction,
  createRevokeInstruction,
} from "@solana/spl-token";

import { getConnection, getKeypair, loadLevelState } from "../../src/common.js";
import { writeFileSync } from "fs";
import { resolve } from "path";

export async function main() {
  const connection = getConnection();
  const wallet = getKeypair();

  // Load state from previous levels
  const level0State = loadLevelState(0);
  const level1State = loadLevelState(1);

  if (!level0State.mint || !level1State.recipients) {
    console.error("Complete Levels 00 and 01 first!");
    process.exit(1);
  }

  const mint = new PublicKey(level0State.mint);
  const recipient1 = new PublicKey(
    (level1State.recipients as Array<{ wallet: string }>)[0].wallet
  );

  console.log("Wallet:", wallet.publicKey.toBase58());
  console.log("Mint:", mint.toBase58());
  console.log("Recipient 1:", recipient1.toBase58());

  // Your source ATA
  const sourceAta = getAssociatedTokenAddressSync(mint, wallet.publicKey);

  // Recipient 1's ATA (already exists from Level 01)
  const recipient1Ata = getAssociatedTokenAddressSync(mint, recipient1);

  // The delegate (treasury manager)
  const delegate = Keypair.generate();

  // ──────────────────────────────────────────────
  // TODO Step 1: Approve the delegate
  //
  // Build a transaction that approves `delegate` to spend
  // 500,000 tokens (with decimals!) from your ATA.
  //
  // Hint: createApproveInstruction(account, delegate, owner, amount)
  // Send this transaction signed by [wallet]
  // ──────────────────────────────────────────────


  // ──────────────────────────────────────────────
  // TODO Step 2: Delegate executes a transfer
  //
  // The delegate transfers 200,000 tokens from YOUR ATA
  // to Recipient 1's ATA.
  //
  // Key difference: the authority here is the DELEGATE, not you.
  // The signer must be [delegate], and the fee payer is also delegate
  // (or you can pay fees — but delegate must sign for the transfer).
  //
  // Hint: You'll need to airdrop some SOL to the delegate for fees,
  // OR you can set wallet as feePayer and include both signers.
  // ──────────────────────────────────────────────


  // ──────────────────────────────────────────────
  // TODO Step 3: Revoke the delegate
  //
  // Remove the delegate's authority. Only you (the owner) can do this.
  //
  // Hint: createRevokeInstruction(account, owner)
  // ──────────────────────────────────────────────


  // Save state for the validator (don't modify this)
  const state = {
    mint: mint.toBase58(),
    wallet: wallet.publicKey.toBase58(),
    delegate: delegate.publicKey.toBase58(),
    recipient1: recipient1.toBase58(),
  };
  writeFileSync(
    resolve(import.meta.dirname, "state.json"),
    JSON.stringify(state, null, 2)
  );
}

main().catch(console.error);
