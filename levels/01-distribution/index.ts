/**
 * Level 01 — Distribution
 *
 * Airdrop tokens to 3 recipients in a single transaction.
 *
 * Objectives:
 *   1. Load your mint from Level 00
 *   2. Generate 3 recipient wallets
 *   3. Create ATAs for each recipient
 *   4. Transfer: 1M, 500k, 250k tokens respectively
 *
 * Constraint: raw instructions only, single transaction.
 */

import {
  Keypair,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

import {
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
} from "@solana/spl-token";

import { getConnection, getKeypair, loadLevelState } from "../../src/common.js";
import { writeFileSync, readFileSync } from "fs";
import { resolve } from "path";

export async function main() {
  const connection = getConnection();
  const wallet = getKeypair();

  // Load mint from Level 00
  const level0State = loadLevelState(0);
  if (!level0State.mint) {
    console.error("Complete Level 00 first!");
    process.exit(1);
  }
  const mint = new PublicKey(level0State.mint);

  console.log("Wallet:", wallet.publicKey.toBase58());
  console.log("Mint:", mint.toBase58());

  // Generate 3 recipients
  const recipients = [
    { wallet: Keypair.generate(), amount: 1_000_000 },
    { wallet: Keypair.generate(), amount: 500_000 },
    { wallet: Keypair.generate(), amount: 250_000 },
  ];

  // Your source ATA
  const sourceAta = getAssociatedTokenAddressSync(mint, wallet.publicKey);

  // ──────────────────────────────────────────────
  // TODO: For each recipient, build TWO instructions:
  //
  // 1. createAssociatedTokenAccountInstruction(...)
  //    — creates the recipient's ATA
  //
  // 2. createTransferInstruction(...)
  //    — transfers tokens from your ATA to theirs
  //    — remember to multiply by 10^6 for decimals!
  //
  // Add all 6 instructions to a single transaction.
  // ──────────────────────────────────────────────


  // TODO: Build and send the transaction
  // const tx = new Transaction().add(...);
  // const sig = await sendAndConfirmTransaction(connection, tx, [wallet]);


  // Save state for the validator (don't modify this)
  const state = {
    mint: mint.toBase58(),
    wallet: wallet.publicKey.toBase58(),
    recipients: recipients.map((r) => ({
      wallet: r.wallet.publicKey.toBase58(),
      amount: r.amount,
    })),
  };
  writeFileSync(
    resolve(import.meta.dirname, "state.json"),
    JSON.stringify(state, null, 2)
  );
}

main().catch(console.error);
