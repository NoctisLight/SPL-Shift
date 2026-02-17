/**
 * Level 03 — The Blacklist
 *
 * Freeze a suspicious account, burn their tokens, thaw the account.
 *
 * Objectives:
 *   1. Freeze Recipient 3's ATA
 *   2. Burn all 250,000 tokens from their account
 *   3. Thaw Recipient 3's ATA
 *
 * Think carefully about the order of operations!
 */

import {
  Keypair,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

import {
  getAssociatedTokenAddressSync,
  createFreezeAccountInstruction,
  createThawAccountInstruction,
  createBurnInstruction,
  createApproveInstruction,
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
  const recipient3 = new PublicKey(
    (level1State.recipients as Array<{ wallet: string }>)[2].wallet
  );

  console.log("Wallet:", wallet.publicKey.toBase58());
  console.log("Mint:", mint.toBase58());
  console.log("Recipient 3:", recipient3.toBase58());

  // Recipient 3's ATA
  const recipient3Ata = getAssociatedTokenAddressSync(mint, recipient3);

  // ──────────────────────────────────────────────
  // TODO: Figure out the right order of operations
  //
  // You need to: freeze, burn, thaw
  // But: you can't burn from a frozen account
  // And: you can't approve a delegate on a frozen account
  //
  // What sequence actually works?
  //
  // Hint: there's more than one way to do this.
  // The owner of the token account could burn directly...
  // but you don't have their private key.
  // As freeze authority, what CAN you do to a frozen account?
  // ──────────────────────────────────────────────


  // Save state for the validator (don't modify this)
  const state = {
    mint: mint.toBase58(),
    wallet: wallet.publicKey.toBase58(),
    recipient3: recipient3.toBase58(),
  };
  writeFileSync(
    resolve(import.meta.dirname, "state.json"),
    JSON.stringify(state, null, 2)
  );
}

main().catch(console.error);
