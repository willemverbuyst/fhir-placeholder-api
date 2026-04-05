import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { runSetupConfigCli } from "../setupConfig";

const fixedNow = new Date("2026-03-19T10:00:00.000Z");

function createPromptSequence(answers: string[]) {
  let index = 0;
  return async (_question: string): Promise<string> => {
    const answer = answers[index];
    index += 1;
    return answer ?? "";
  };
}

function createTempConfigPath(): { directory: string; configFilePath: string } {
  const directory = mkdtempSync(join(tmpdir(), "config-scripts-integration-"));
  return {
    directory,
    configFilePath: join(directory, "dummy-data-config.json"),
  };
}

describe("runSetupConfigCli integration", () => {
  const tempDirectories: string[] = [];

  afterEach(() => {
    for (const directory of tempDirectories) {
      rmSync(directory, { recursive: true, force: true });
    }
    tempDirectories.length = 0;
    process.exitCode = 0;
  });

  it("writes configuration when preset is selected and save is confirmed", async () => {
    const { directory, configFilePath } = createTempConfigPath();
    tempDirectories.push(directory);
    const logs: string[] = [];

    await runSetupConfigCli({
      configFilePath,
      prompt: createPromptSequence(["1", "", ""]),
      log: (message) => logs.push(message),
      error: () => {},
      now: () => fixedNow,
    });

    expect(existsSync(configFilePath)).toBe(true);

    const parsedConfig = JSON.parse(readFileSync(configFilePath, "utf-8")) as {
      preset: string;
      createdAt: string;
      idStrategy: string;
    };

    expect(parsedConfig.preset).toBe("small");
    expect(parsedConfig.createdAt).toBe(fixedNow.toISOString());
    expect(parsedConfig.idStrategy).toBe("uuid");
    expect(logs.some((line) => line.includes("Configuration saved"))).toBe(
      true,
    );
  });

  it("does not overwrite file when overwrite confirmation is denied", async () => {
    const { directory, configFilePath } = createTempConfigPath();
    tempDirectories.push(directory);
    writeFileSync(
      configFilePath,
      JSON.stringify({ preset: "small", createdAt: fixedNow.toISOString() }),
    );
    const before = readFileSync(configFilePath, "utf-8");

    await runSetupConfigCli({
      configFilePath,
      prompt: createPromptSequence(["n"]),
      log: () => {},
      error: () => {},
      now: () => fixedNow,
    });

    expect(readFileSync(configFilePath, "utf-8")).toBe(before);
  });

  it("does not write file when save confirmation is denied", async () => {
    const { directory, configFilePath } = createTempConfigPath();
    tempDirectories.push(directory);

    await runSetupConfigCli({
      configFilePath,
      prompt: createPromptSequence(["1", "", "n"]),
      log: () => {},
      error: () => {},
      now: () => fixedNow,
    });

    expect(existsSync(configFilePath)).toBe(false);
  });

  it("sets exit code and reports parse errors for invalid existing config", async () => {
    const { directory, configFilePath } = createTempConfigPath();
    tempDirectories.push(directory);
    writeFileSync(configFilePath, "{ invalid-json");
    const errors: string[] = [];

    await runSetupConfigCli({
      configFilePath,
      prompt: createPromptSequence([]),
      log: () => {},
      error: (message) => errors.push(message),
      now: () => fixedNow,
    });

    expect(process.exitCode).toBe(1);
    expect(errors).toContain("\n❌ Error during setup:");
  });
});
