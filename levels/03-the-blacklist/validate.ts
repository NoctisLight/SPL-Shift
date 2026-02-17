import { PublicKey } from "@solana/web3.js";
import { getMint, getAccount, getAssociatedTokenAddressSync } from "@solana/spl-token";
import { getConnection, loadLevelState, header, pass, fail, summary } from "../../src/common.js";

export async function validate() {
  header("Level 03 — The Blacklist");

  const state = loadLevelState(3);
  let passed = 0;
  const total = 3;

  if (!state.mint || !state.recipient3) {
    fail("No state.json found. Run your level first: npm run level 3");
    summary(0, total, 3);
    return;
  }

  const connection = getConnection();
  const mintPubkey = new PublicKey(state.mint);
  const recipient3Pubkey = new PublicKey(state.recipient3);

  // 1. Recipient 3's account is NOT frozen (thawed)
  try {
    const r3Ata = getAssociatedTokenAddressSync(mintPubkey, recipient3Pubkey);
    const r3Info = await getAccount(connection, r3Ata);

    if (!r3Info.isFrozen) {
      pass("Recipient 3's account is thawed");
      passed++;
    } else {
      fail("Recipient 3's account is still frozen");
    }

    // 2. Balance is 0
    if (r3Info.amount === BigInt(0)) {
      pass("Recipient 3's balance: 0 tokens");
      passed++;
    } else {
      fail(`Recipient 3's balance: expected 0, got ${r3Info.amount}`);
    }
  } catch {
    fail("Could not read Recipient 3's ATA");
  }

  // 3. Total supply decreased (21M - 250k = 20,750,000)
  // But we also need to account for Level 00 supply
  // Total minted: 21M. Burned: 250k. Expected: 20,750,000
  try {
    const mintInfo = await getMint(connection, mintPubkey);
    const expectedSupply = BigInt(20_750_000) * BigInt(1_000_000);

    if (mintInfo.supply === expectedSupply) {
      pass("Total supply: 20,750,000 tokens (250k burned)");
      passed++;
    } else {
      fail(`Total supply: expected ${expectedSupply}, got ${mintInfo.supply}`);
    }
  } catch {
    fail("Could not read mint info");
  }

  summary(passed, total, 3);
}
