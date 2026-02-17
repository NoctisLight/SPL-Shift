import { PublicKey } from "@solana/web3.js";
import { getMint, getAccount, getAssociatedTokenAddressSync } from "@solana/spl-token";
import { getConnection, loadLevelState, header, pass, fail, summary } from "../../src/common.js";

export async function validate() {
  header("Level 00 — The Forge");

  const state = loadLevelState(0);
  let passed = 0;
  const total = 6;

  if (!state.mint || !state.wallet) {
    fail("No state.json found. Run your level first: npm run level 0");
    summary(0, total, 0);
    return;
  }

  const connection = getConnection();
  const mintPubkey = new PublicKey(state.mint);
  const walletPubkey = new PublicKey(state.wallet);

  // 1. Mint account exists
  try {
    const mintInfo = await getMint(connection, mintPubkey);

    pass("Mint account exists");
    passed++;

    // 2. Decimals = 6
    if (mintInfo.decimals === 6) {
      pass("Decimals: 6");
      passed++;
    } else {
      fail(`Decimals: expected 6, got ${mintInfo.decimals}`);
    }

    // 3. Mint authority = wallet
    if (mintInfo.mintAuthority?.equals(walletPubkey)) {
      pass("Mint authority: your wallet");
      passed++;
    } else {
      fail(`Mint authority: expected ${state.wallet}, got ${mintInfo.mintAuthority?.toBase58() || "null"}`);
    }

    // 4. Freeze authority = wallet
    if (mintInfo.freezeAuthority?.equals(walletPubkey)) {
      pass("Freeze authority: your wallet");
      passed++;
    } else {
      fail(`Freeze authority: expected ${state.wallet}, got ${mintInfo.freezeAuthority?.toBase58() || "null"}`);
    }

    // 5. Total supply = 21M tokens
    const expectedSupply = BigInt(21_000_000_000_000);
    if (mintInfo.supply === expectedSupply) {
      pass("Total supply: 21,000,000 tokens");
      passed++;
    } else {
      fail(`Total supply: expected ${expectedSupply}, got ${mintInfo.supply}`);
    }

    // 6. ATA exists with correct balance
    try {
      const ata = getAssociatedTokenAddressSync(mintPubkey, walletPubkey);
      const ataInfo = await getAccount(connection, ata);

      if (ataInfo.amount === expectedSupply) {
        pass("Your ATA holds 21,000,000 tokens");
        passed++;
      } else {
        fail(`ATA balance: expected ${expectedSupply}, got ${ataInfo.amount}`);
      }
    } catch {
      fail("ATA does not exist for your wallet");
    }
  } catch {
    fail("Mint account does not exist on-chain");
  }

  summary(passed, total, 0);
}
