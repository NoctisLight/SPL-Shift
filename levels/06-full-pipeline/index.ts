/**
 * Level 06 — The Full Pipeline (Bonus)
 *
 * Reproduce the entire token lifecycle in minimum transactions.
 *
 * Can you do Levels 00-05 from scratch with a fresh mint?
 * How few transactions can you get it down to?
 *
 * This is open-ended. Build it your way.
 */

import {
  Keypair,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
  SystemProgram,
} from "@solana/web3.js";

import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  AuthorityType,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddressSync,
  createInitializeMint2Instruction,
  createAssociatedTokenAccountInstruction,
  createMintToCheckedInstruction,
  createTransferInstruction,
  createApproveInstruction,
  createRevokeInstruction,
  createFreezeAccountInstruction,
  createThawAccountInstruction,
  createBurnInstruction,
  createSetAuthorityInstruction,
  createCloseAccountInstruction,
} from "@solana/spl-token";

import { getConnection, getKeypair } from "../../src/common.js";
import { writeFileSync } from "fs";
import { resolve } from "path";

export async function main() {
  const connection = getConnection();
  const wallet = getKeypair();

  let txCount = 0;

  console.log("Wallet:", wallet.publicKey.toBase58());

  // Fresh mint for this challenge
  const mint = Keypair.generate();
  const governance = Keypair.generate();
  const delegate = Keypair.generate();

  const recipients = [
    { wallet: Keypair.generate(), amount: 1_000_000 },
    { wallet: Keypair.generate(), amount: 500_000 },
    { wallet: Keypair.generate(), amount: 250_000 },
  ];

  // ──────────────────────────────────────────────
  // TODO: Build the entire lifecycle
  //
  // Your goal: minimize txCount while completing all objectives.
  //
  // After each sendAndConfirmTransaction, increment txCount:
  //   txCount++;
  //
  // Think about what can be bundled:
  // - Same signers? → same transaction
  // - Different signers? → separate transaction
  // - Order dependencies? → sequential
  //
  // Good luck!
  // ──────────────────────────────────────────────


  console.log(`\nCompleted in ${txCount} transactions.`);

  // Save state for the validator (don't modify this)
  const state = {
    mint: mint.publicKey.toBase58(),
    wallet: wallet.publicKey.toBase58(),
    governance: governance.publicKey.toBase58(),
    recipients: recipients.map((r) => ({
      wallet: r.wallet.publicKey.toBase58(),
      amount: r.amount,
    })),
    txCount,
  };
  writeFileSync(
    resolve(import.meta.dirname, "state.json"),
    JSON.stringify(state, null, 2)
  );
}

main().catch(console.error);
