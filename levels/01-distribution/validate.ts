import { PublicKey } from "@solana/web3.js";
import { getAccount, getAssociatedTokenAddressSync } from "@solana/spl-token";
import { getConnection, loadLevelState, header, pass, fail, summary } from "../../src/common.js";

export async function validate() {
  header("Level 01 — Distribution");

  const state = loadLevelState(1);
  let passed = 0;
  const total = 4;

  if (!state.mint || !state.recipients) {
    fail("No state.json found. Run your level first: npm run level 1");
    summary(0, total, 1);
    return;
  }

  const connection = getConnection();
  const mintPubkey = new PublicKey(state.mint);
  const recipients = state.recipients as Array<{ wallet: string; amount: number }>;

  // Check each recipient
  let allRecipientsOk = true;
  for (let i = 0; i < recipients.length; i++) {
    const r = recipients[i];
    const recipientPubkey = new PublicKey(r.wallet);
    const expectedAmount = BigInt(r.amount) * BigInt(1_000_000);

    try {
      const ata = getAssociatedTokenAddressSync(mintPubkey, recipientPubkey);
      const ataInfo = await getAccount(connection, ata);

      if (ataInfo.amount === expectedAmount) {
        pass(`Recipient ${i + 1}: ${r.amount.toLocaleString()} tokens`);
        passed++;
      } else {
        fail(`Recipient ${i + 1}: expected ${expectedAmount}, got ${ataInfo.amount}`);
        allRecipientsOk = false;
      }
    } catch {
      fail(`Recipient ${i + 1}: ATA does not exist`);
      allRecipientsOk = false;
    }
  }

  // Check your remaining balance
  try {
    const walletPubkey = new PublicKey(state.wallet);
    const walletAta = getAssociatedTokenAddressSync(mintPubkey, walletPubkey);
    const walletInfo = await getAccount(connection, walletAta);
    // 21M - 1.75M = 19.25M tokens
    const expectedRemaining = BigInt(19_250_000) * BigInt(1_000_000);

    if (walletInfo.amount === expectedRemaining) {
      pass("Your balance: 19,250,000 tokens remaining");
      passed++;
    } else {
      fail(`Your balance: expected ${expectedRemaining}, got ${walletInfo.amount}`);
    }
  } catch {
    fail("Could not read your wallet ATA");
  }

  summary(passed, total, 1);
}
