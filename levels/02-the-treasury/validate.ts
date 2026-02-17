import { PublicKey } from "@solana/web3.js";
import { getAccount, getAssociatedTokenAddressSync } from "@solana/spl-token";
import { getConnection, loadLevelState, header, pass, fail, summary } from "../../src/common.js";

export async function validate() {
  header("Level 02 — The Treasury");

  const state = loadLevelState(2);
  let passed = 0;
  const total = 3;

  if (!state.mint || !state.wallet) {
    fail("No state.json found. Run your level first: npm run level 2");
    summary(0, total, 2);
    return;
  }

  const connection = getConnection();
  const mintPubkey = new PublicKey(state.mint);
  const walletPubkey = new PublicKey(state.wallet);
  const recipient1Pubkey = new PublicKey(state.recipient1);

  // 1. Delegate is revoked (delegated amount = 0 or no delegate)
  try {
    const walletAta = getAssociatedTokenAddressSync(mintPubkey, walletPubkey);
    const walletInfo = await getAccount(connection, walletAta);

    if (walletInfo.delegatedAmount === BigInt(0)) {
      pass("Delegate revoked (no remaining allowance)");
      passed++;
    } else {
      fail(`Delegate still has allowance: ${walletInfo.delegatedAmount}`);
    }

    // 2. Your balance should be 19,250,000 - 200,000 = 19,050,000
    const expectedBalance = BigInt(19_050_000) * BigInt(1_000_000);
    if (walletInfo.amount === expectedBalance) {
      pass("Your balance: 19,050,000 tokens");
      passed++;
    } else {
      fail(`Your balance: expected ${expectedBalance}, got ${walletInfo.amount}`);
    }
  } catch {
    fail("Could not read your wallet ATA");
  }

  // 3. Recipient 1 now has 1,000,000 + 200,000 = 1,200,000
  try {
    const r1Ata = getAssociatedTokenAddressSync(mintPubkey, recipient1Pubkey);
    const r1Info = await getAccount(connection, r1Ata);
    const expectedR1 = BigInt(1_200_000) * BigInt(1_000_000);

    if (r1Info.amount === expectedR1) {
      pass("Recipient 1: 1,200,000 tokens");
      passed++;
    } else {
      fail(`Recipient 1: expected ${expectedR1}, got ${r1Info.amount}`);
    }
  } catch {
    fail("Could not read Recipient 1's ATA");
  }

  summary(passed, total, 2);
}
