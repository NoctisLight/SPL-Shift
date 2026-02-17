/**
 * Level 04 — Decentralization
 *
 * Transfer mint authority to a governance wallet and renounce freeze authority.
 *
 * Objectives:
 *   1. Transfer mint authority to a governance wallet
 *   2. Renounce freeze authority (set to null)
 *
 * Constraint: raw instructions, single transaction.
 */

import {
  Keypair,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

import {
  createSetAuthorityInstruction,
  AuthorityType,
} from "@solana/spl-token";

import { getConnection, getKeypair, loadLevelState } from "../../src/common.js";
import { writeFileSync } from "fs";
import { resolve } from "path";

export async function main() {
  const connection = getConnection();
  const wallet = getKeypair();

  // Load state from Level 00
  const level0State = loadLevelState(0);
  if (!level0State.mint) {
    console.error("Complete Level 00 first!");
    process.exit(1);
  }

  const mint = new PublicKey(level0State.mint);

  // The governance wallet (simulating a DAO)
  const governance = Keypair.generate();

  console.log("Wallet:", wallet.publicKey.toBase58());
  console.log("Mint:", mint.toBase58());
  console.log("Governance:", governance.publicKey.toBase58());

  // ──────────────────────────────────────────────
  // TODO: Build two instructions in one transaction
  //
  // 1. Transfer mint authority to governance
  //    Hint: createSetAuthorityInstruction(
  //      account, currentAuthority, authorityType, newAuthority
  //    )
  //    authorityType = AuthorityType.MintTokens
  //
  // 2. Renounce freeze authority (set to null)
  //    Same function, but pass `null` as the new authority
  //    authorityType = AuthorityType.FreezeAccount
  //
  // Both in one transaction, signed by [wallet]
  // ──────────────────────────────────────────────


  // Save state for the validator (don't modify this)
  const state = {
    mint: mint.toBase58(),
    wallet: wallet.publicKey.toBase58(),
    governance: governance.publicKey.toBase58(),
  };
  writeFileSync(
    resolve(import.meta.dirname, "state.json"),
    JSON.stringify(state, null, 2)
  );
}

main().catch(console.error);
