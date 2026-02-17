/**
 * Level 05 — Cleanup
 *
 * Close empty token accounts and recover rent.
 *
 * Objectives:
 *   1. Close Recipient 3's empty ATA
 *   2. Recover rent SOL to your wallet
 *
 * Think about who has authority to close this account...
 */

import {
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

import {
  getAssociatedTokenAddressSync,
  createCloseAccountInstruction,
  createSetAuthorityInstruction,
  AuthorityType,
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

  const recipient3Ata = getAssociatedTokenAddressSync(mint, recipient3);

  // ──────────────────────────────────────────────
  // TODO: Close Recipient 3's ATA
  //
  // Problem: Recipient 3 is the owner of their ATA,
  // and you don't have their private key.
  //
  // You need to figure out how to get authority to
  // close their account. Think about:
  // - Can you change the close authority?
  // - Do you still have any authority over this account?
  // - What did Level 03 leave behind?
  //
  // Hint: createCloseAccountInstruction(account, destination, authority)
  // ──────────────────────────────────────────────


  // Save state for the validator (don't modify this)
  const state = {
    mint: mint.toBase58(),
    wallet: wallet.publicKey.toBase58(),
    recipient3: recipient3.toBase58(),
    recipient3Ata: recipient3Ata.toBase58(),
  };
  writeFileSync(
    resolve(import.meta.dirname, "state.json"),
    JSON.stringify(state, null, 2)
  );
}

main().catch(console.error);
