import { PublicKey } from "@solana/web3.js";
import { getMint } from "@solana/spl-token";
import { getConnection, loadLevelState, header, pass, fail, summary } from "../../src/common.js";

export async function validate() {
  header("Level 04 — Decentralization");

  const state = loadLevelState(4);
  let passed = 0;
  const total = 2;

  if (!state.mint || !state.governance) {
    fail("No state.json found. Run your level first: npm run level 4");
    summary(0, total, 4);
    return;
  }

  const connection = getConnection();
  const mintPubkey = new PublicKey(state.mint);
  const governancePubkey = new PublicKey(state.governance);

  try {
    const mintInfo = await getMint(connection, mintPubkey);

    // 1. Mint authority = governance
    if (mintInfo.mintAuthority?.equals(governancePubkey)) {
      pass("Mint authority: governance wallet");
      passed++;
    } else {
      fail(`Mint authority: expected ${state.governance}, got ${mintInfo.mintAuthority?.toBase58() || "null"}`);
    }

    // 2. Freeze authority = null
    if (mintInfo.freezeAuthority === null) {
      pass("Freeze authority: renounced (null)");
      passed++;
    } else {
      fail(`Freeze authority: expected null, got ${mintInfo.freezeAuthority.toBase58()}`);
    }
  } catch {
    fail("Could not read mint info");
  }

  summary(passed, total, 4);
}
