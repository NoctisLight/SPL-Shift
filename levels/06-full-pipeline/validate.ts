import { PublicKey } from "@solana/web3.js";
import { getMint, getAccount, getAssociatedTokenAddressSync } from "@solana/spl-token";
import { getConnection, loadLevelState, header, pass, fail, info, summary } from "../../src/common.js";

export async function validate() {
  header("Level 06 — The Full Pipeline");

  const state = loadLevelState(6);
  let passed = 0;
  const total = 8;

  if (!state.mint || !state.wallet) {
    fail("No state.json found. Run your level first: npm run level 6");
    summary(0, total, 6);
    return;
  }

  const connection = getConnection();
  const mintPubkey = new PublicKey(state.mint);
  const walletPubkey = new PublicKey(state.wallet);
  const governancePubkey = new PublicKey(state.governance);
  const recipients = state.recipients as Array<{ wallet: string; amount: number }>;

  try {
    const mintInfo = await getMint(connection, mintPubkey);

    // 1. Mint authority = governance
    if (mintInfo.mintAuthority?.equals(governancePubkey)) {
      pass("Mint authority transferred to governance");
      passed++;
    } else {
      fail(`Mint authority: expected governance, got ${mintInfo.mintAuthority?.toBase58() || "null"}`);
    }

    // 2. Freeze authority = null
    if (mintInfo.freezeAuthority === null) {
      pass("Freeze authority renounced");
      passed++;
    } else {
      fail(`Freeze authority: expected null, got ${mintInfo.freezeAuthority.toBase58()}`);
    }

    // 3. Supply = 21M - 250k = 20,750,000
    const expectedSupply = BigInt(20_750_000) * BigInt(1_000_000);
    if (mintInfo.supply === expectedSupply) {
      pass("Total supply: 20,750,000 (250k burned)");
      passed++;
    } else {
      fail(`Total supply: expected ${expectedSupply}, got ${mintInfo.supply}`);
    }
  } catch {
    fail("Could not read mint info");
  }

  // 4 & 5. Recipient 1 has 1M + 200k = 1.2M, Recipient 2 has 500k
  for (let i = 0; i < 2; i++) {
    const r = recipients[i];
    const rPubkey = new PublicKey(r.wallet);
    const expectedAmount = i === 0
      ? BigInt(1_200_000) * BigInt(1_000_000)  // 1M + 200k from delegate
      : BigInt(r.amount) * BigInt(1_000_000);

    try {
      const ata = getAssociatedTokenAddressSync(mintPubkey, rPubkey);
      const ataInfo = await getAccount(connection, ata);

      if (ataInfo.amount === expectedAmount) {
        pass(`Recipient ${i + 1}: ${Number(expectedAmount / BigInt(1_000_000)).toLocaleString()} tokens`);
        passed++;
      } else {
        fail(`Recipient ${i + 1}: expected ${expectedAmount}, got ${ataInfo.amount}`);
      }
    } catch {
      fail(`Recipient ${i + 1}: ATA does not exist`);
    }
  }

  // 6. Recipient 3's ATA is closed
  const r3Pubkey = new PublicKey(recipients[2].wallet);
  const r3Ata = getAssociatedTokenAddressSync(mintPubkey, r3Pubkey);
  try {
    await getAccount(connection, r3Ata);
    fail("Recipient 3's ATA still exists (should be closed)");
  } catch (e: any) {
    if (e.name === "TokenAccountNotFoundError") {
      pass("Recipient 3's ATA closed");
      passed++;
    } else {
      fail(`Unexpected error: ${e.message}`);
    }
  }

  // 7. Delegate is revoked
  try {
    const walletAta = getAssociatedTokenAddressSync(mintPubkey, walletPubkey);
    const walletInfo = await getAccount(connection, walletAta);

    if (walletInfo.delegatedAmount === BigInt(0)) {
      pass("Delegate revoked");
      passed++;
    } else {
      fail(`Delegate still has allowance: ${walletInfo.delegatedAmount}`);
    }
  } catch {
    fail("Could not read wallet ATA");
  }

  // 8. Transaction count
  if (state.txCount) {
    info(`Transaction count: ${state.txCount}`);
    if (state.txCount <= 3) {
      pass("Speedrun: 3 or fewer transactions!");
      passed++;
    } else if (state.txCount <= 5) {
      pass(`Good efficiency: ${state.txCount} transactions`);
      passed++;
    } else {
      pass(`Completed in ${state.txCount} transactions (can you do fewer?)`);
      passed++;
    }
  } else {
    fail("Transaction count not recorded");
  }

  summary(passed, total, 6);
}
