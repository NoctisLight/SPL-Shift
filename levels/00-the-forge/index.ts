/**
 * Level 00 — The Forge
 *
 * Create your token from scratch in a single transaction.
 *
 * Objectives:
 *   1. Create a Mint Account (6 decimals)
 *   2. Set your wallet as mint authority AND freeze authority
 *   3. Create an ATA for your wallet
 *   4. Mint 21,000,000 tokens to your ATA
 *
 * Constraint: raw instructions only, single transaction.
 */

import {
  Keypair,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  getMinimumBalanceForRentExemptMint,
  createInitializeMint2Instruction,
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction,
  createMintToCheckedInstruction,
} from "@solana/spl-token";

import { getConnection, getKeypair } from "../../src/common.js";
import { writeFileSync } from "fs";
import { resolve } from "path";

export async function main() {
  const connection = getConnection();
  const wallet = getKeypair();

  console.log("Wallet:", wallet.publicKey.toBase58());

  // Generate a new keypair for the mint
  const mint = Keypair.generate();

  // ──────────────────────────────────────────────
  // TODO: Build your 4 instructions here
  //
  // 1. createAccountIx — allocate the mint account
  //    Hint: SystemProgram.createAccount({ ... })
  //    You need: space (MINT_SIZE), lamports (rent), programId (TOKEN_PROGRAM_ID)
  //
  // 2. initMintIx — initialize the mint
  //    Hint: createInitializeMint2Instruction(...)
  //    Set decimals, mint authority, freeze authority
  //
  // 3. createAtaIx — create your ATA
  //    Hint: first compute the ATA address with getAssociatedTokenAddressSync(...)
  //    Then create the instruction with createAssociatedTokenAccountInstruction(...)
  //
  // 4. mintToIx — mint 21M tokens
  //    Hint: createMintToCheckedInstruction(...)
  //    Remember: 21M tokens with 6 decimals = 21_000_000_000_000 raw units
  //
  // ──────────────────────────────────────────────


  // TODO: Build and send the transaction
  // const tx = new Transaction().add(...);
  // const sig = await sendAndConfirmTransaction(connection, tx, [wallet, mint]);


  // Save state for the validator (don't modify this)
  const state = {
    mint: mint.publicKey.toBase58(),
    wallet: wallet.publicKey.toBase58(),
  };
  writeFileSync(
    resolve(import.meta.dirname, "state.json"),
    JSON.stringify(state, null, 2)
  );

  // console.log("Mint:", mint.publicKey.toBase58());
  // console.log("Signature:", sig);
}

main().catch(console.error);
