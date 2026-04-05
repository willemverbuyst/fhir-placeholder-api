#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { pathToFileURL } from "node:url";
import type { UserDummyDataConfig } from "../interfaces";
import { CONFIG_FILE_PATH } from "./configPresets";
import { resolveSetupConfigFlow } from "./setupConfig.core";

type RunSetupConfigCliInput = {
  configFilePath?: string;
  prompt?: (question: string) => Promise<string>;
  log?: (message: string) => void;
  error?: (message: string, err: unknown) => void;
  now?: () => Date;
};

export async function runSetupConfigCli(
  input: RunSetupConfigCliInput = {},
): Promise<void> {
  const configFilePath = input.configFilePath ?? CONFIG_FILE_PATH;
  const log = input.log ?? console.log;
  const error = input.error ?? console.error;
  const now = input.now ?? (() => new Date());

  const rl =
    input.prompt === undefined
      ? createInterface({
          input: process.stdin,
          output: process.stdout,
        })
      : null;

  const prompt =
    input.prompt ??
    ((question: string) =>
      new Promise<string>((resolve) => {
        if (!rl) {
          resolve("");
          return;
        }
        rl.question(question, resolve);
      }));

  log("🚀 FHIR Dummy Data Configuration Setup");

  try {
    const existingConfig = existsSync(configFilePath)
      ? (JSON.parse(
          readFileSync(configFilePath, "utf-8"),
        ) as UserDummyDataConfig)
      : null;

    const decision = await resolveSetupConfigFlow({
      prompt,
      log,
      now,
      existingConfig,
    });

    if (decision.kind === "cancelled") {
      return;
    }

    writeFileSync(configFilePath, JSON.stringify(decision.config, null, 2));

    log(`\n✅ Configuration saved to ${configFilePath}`);
    log("📝 Note: This config will expire in 2 days and show warnings.");
    log('🧹 Run "pnpm cleanup" to remove the config file.');
  } catch (runtimeError) {
    error("\n❌ Error during setup:", runtimeError);
    process.exitCode = 1;
  } finally {
    rl?.close();
  }
}

function isDirectExecution(): boolean {
  const entryPath = process.argv[1];
  if (!entryPath) {
    return false;
  }

  return import.meta.url === pathToFileURL(entryPath).href;
}

if (isDirectExecution()) {
  await runSetupConfigCli();
}
