import { PublicKey } from "@solana/web3.js";
import { getAccount, getAssociatedTokenAddressSync } from "@solana/spl-token";
import { getConnection, loadLevelState, header, pass, fail, summary } from "../../src/common.js";

export async function validate() {
  header("Level 05 — Cleanup");

  const state = loadLevelState(5);
  let passed = 0;
  const total = 1;

  if (!state.mint || !state.recipient3Ata) {
    fail("No state.json found. Run your level first: npm run level 5");
    summary(0, total, 5);
    return;
  }

  const connection = getConnection();
  const recipient3Ata = new PublicKey(state.recipient3Ata);

  // 1. Recipient 3's ATA no longer exists
  try {
    await getAccount(connection, recipient3Ata);
    fail("Recipient 3's ATA still exists on-chain");
  } catch (e: any) {
    if (e.name === "TokenAccountNotFoundError") {
      pass("Recipient 3's ATA closed (rent recovered)");
      passed++;
    } else {
      fail(`Unexpected error checking ATA: ${e.message}`);
    }
  }

  summary(passed, total, 5);
}
