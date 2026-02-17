/**
 * Solana Forge — Level runner
 *
 * Usage:
 *   npm run level 0       # run level 0 starter
 */

const arg = process.argv[2];

if (!arg) {
  console.log("Usage: npm run level <number>");
  console.log("  npm run level 0     — run level 0");
  process.exit(1);
}

const level = parseInt(arg);
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
  const mod = await import(`../levels/${dir}/index.js`);
  await mod.main();
} catch (e: any) {
  if (e.code === "ERR_MODULE_NOT_FOUND") {
    console.log(`Level ${level} not started yet. Edit levels/${dir}/index.ts`);
  } else {
    throw e;
  }
}
