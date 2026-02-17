import { Connection, Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import dotenv from "dotenv";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

dotenv.config();

export function getConnection(): Connection {
  const url = process.env.RPC_URL || "https://api.devnet.solana.com";
  return new Connection(url, "confirmed");
}

export function getKeypair(): Keypair {
  const secret = process.env.SECRET_KEY;
  if (!secret) {
    console.error("\x1b[31mERROR: SECRET_KEY not found in .env\x1b[0m");
    console.error("Copy .env.example to .env and add your secret key.");
    process.exit(1);
  }
  return Keypair.fromSecretKey(bs58.decode(secret));
}

export function loadLevelState(level: number): Record<string, string> {
  const path = resolve(`levels/${levelDir(level)}/state.json`);
  if (!existsSync(path)) return {};
  return JSON.parse(readFileSync(path, "utf-8"));
}

export function levelDir(level: number): string {
  const dirs = [
    "00-the-forge",
    "01-distribution",
    "02-the-treasury",
    "03-the-blacklist",
    "04-decentralization",
    "05-cleanup",
    "06-full-pipeline",
  ];
  return dirs[level] || "";
}

// ── Pretty printing ──

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const RESET = "\x1b[0m";

export function pass(msg: string) {
  console.log(`  ${GREEN}✓${RESET} ${msg}`);
}

export function fail(msg: string) {
  console.log(`  ${RED}✗${RESET} ${msg}`);
}

export function info(msg: string) {
  console.log(`  ${DIM}${msg}${RESET}`);
}

export function header(title: string) {
  console.log();
  console.log(`${BOLD}${CYAN}${title}${RESET}`);
  console.log(`${DIM}${"─".repeat(title.length)}${RESET}`);
}

export function summary(passed: number, total: number, level: number) {
  console.log();
  if (passed === total) {
    console.log(`  ${GREEN}${BOLD}${passed}/${total} passed — Level ${String(level).padStart(2, "0")} complete!${RESET}`);
  } else {
    console.log(`  ${YELLOW}${passed}/${total} passed — Keep going!${RESET}`);
  }
  console.log();
}
