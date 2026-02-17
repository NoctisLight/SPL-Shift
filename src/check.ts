/**
 * Solana Forge — Level checker
 *
 * Usage:
 *   npm run check 0       # check level 0
 *   npm run check all     # check all levels
 */

import { header } from "./common.js";

const arg = process.argv[2];

if (!arg) {
  console.log("Usage: npm run check <level|all>");
  console.log("  npm run check 0     — check level 0");
  console.log("  npm run check all   — check all levels");
  process.exit(1);
}

async function runCheck(level: number) {
  const dirs = [
    "00-the-forge",
    "01-distribution",
    "02-the-treasury",
    "03-the-blacklist",
    "04-decentralization",
    "05-cleanup",
    "06-full-pipeline",
  ];

  const dir = dirs[level];
  if (!dir) {
    console.error(`Unknown level: ${level}`);
    process.exit(1);
  }

  try {
    const mod = await import(`../levels/${dir}/validate.js`);
    await mod.validate();
  } catch (e: any) {
    if (e.code === "ERR_MODULE_NOT_FOUND") {
      console.log(`  Level ${level} validator not found yet.`);
    } else {
      throw e;
    }
  }
}

if (arg === "all") {
  header("SOLANA FORGE — Full Check");
  for (let i = 0; i <= 6; i++) {
    await runCheck(i);
  }
} else {
  const level = parseInt(arg);
  await runCheck(level);
}
