import type { UserDummyDataConfig } from "../interfaces";
import { CONFIG_PRESETS } from "./configPresets";

type PromptFn = (question: string) => Promise<string>;
type LogFn = (message: string) => void;
type NowFn = () => Date;

type SetupFlowDecision =
  | { kind: "cancelled"; reason: "overwrite-denied" | "save-denied" }
  | { kind: "save"; config: UserDummyDataConfig };

type SetupFlowInput = {
  prompt: PromptFn;
  log: LogFn;
  now: NowFn;
  existingConfig: UserDummyDataConfig | null;
};

type ConfigSummary = {
  totalPractitioners: number;
  totalPatients: number;
  totalAppointments: number;
  totalAllergies: number;
  totalEpisodes: number;
  totalConditions: number;
  totalEncounters: number;
  totalObservations: number;
  totalFlags: number;
  totalCommunications: number;
};

export function validateNumber(value: string, min = 1): number | null {
  const num = Number.parseInt(value, 10);
  return !Number.isNaN(num) && num >= min ? num : null;
}

export function validateDate(value: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(value)) return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}

export function buildSummary(config: UserDummyDataConfig): ConfigSummary {
  const totalPractitioners =
    config.organizations * config.practitionersPerOrganization;
  const totalPatients = totalPractitioners * config.patientsPerPractitioner;
  const totalEncounters = totalPatients * config.encountersPerPatient;
  const totalObservations = totalEncounters * config.observationsPerEncounter;
  const totalFlags = totalEncounters * config.flagsPerEncounter;
  const totalCommunications =
    totalEncounters * config.communicationsPerEncounter;

  return {
    totalPractitioners,
    totalPatients,
    totalAppointments: totalPatients * config.appointmentsPerPatient,
    totalAllergies: totalPatients * config.allergiesPerPatient,
    totalEpisodes: totalPatients * config.episodesPerPatient,
    totalConditions: totalPatients * config.conditionsPerPatient,
    totalEncounters,
    totalObservations,
    totalFlags,
    totalCommunications,
  };
}

function displaySummary(config: UserDummyDataConfig, log: LogFn) {
  const summary = buildSummary(config);
  log("\n📊 Configuration Summary:");
  log("─".repeat(40));
  log(`Organizations: ${config.organizations}`);
  log(
    `Practitioners: ${summary.totalPractitioners} (${config.practitionersPerOrganization} per org)`,
  );
  log(
    `Patients: ${summary.totalPatients} (${config.patientsPerPractitioner} per practitioner)`,
  );
  log(`Appointments: ${summary.totalAppointments}`);
  log(`Allergies: ${summary.totalAllergies}`);
  log(`Episodes: ${summary.totalEpisodes}`);
  log(`Conditions: ${summary.totalConditions}`);
  log(`Encounters: ${summary.totalEncounters}`);
  log(`Observations: ${summary.totalObservations}`);
  log(`Flags: ${summary.totalFlags}`);
  log(`Communications: ${summary.totalCommunications}`);
  log(`ID Strategy: ${config.idStrategy}`);
  log(`Start Date: ${config.startDate}`);
  log("─".repeat(40));
}

async function selectIdStrategy(
  prompt: PromptFn,
  log: LogFn,
  defaultValue: UserDummyDataConfig["idStrategy"],
): Promise<UserDummyDataConfig["idStrategy"]> {
  const promptLabel =
    defaultValue === "uuid"
      ? "ID strategy (sequential/uuid) [uuid]: "
      : "ID strategy (sequential/uuid) [sequential]: ";

  while (true) {
    const value = await prompt(promptLabel);
    const normalizedValue = value.toLowerCase();

    if (!value) {
      return defaultValue;
    }
    if (normalizedValue === "uuid") {
      return "uuid";
    }
    if (normalizedValue === "sequential") {
      return "sequential";
    }
    log('❌ Please enter "sequential" or "uuid"');
  }
}

async function selectPreset(
  prompt: PromptFn,
  log: LogFn,
  now: NowFn,
): Promise<UserDummyDataConfig | null> {
  log("\n🎛️  Available presets:");
  log("1. Small - 3 organizations, 24 patients (development)");
  log("2. Medium - 10 organizations, 200 patients (testing)");
  log("3. Large - 25 organizations, 1000 patients (performance)");
  log("4. Custom - Configure manually");

  while (true) {
    const choice = await prompt("\nSelect preset (1-4): ");

    switch (choice) {
      case "1":
        return {
          ...CONFIG_PRESETS.small.config,
          preset: "small",
          createdAt: now().toISOString(),
        };
      case "2":
        return {
          ...CONFIG_PRESETS.medium.config,
          preset: "medium",
          createdAt: now().toISOString(),
        };
      case "3":
        return {
          ...CONFIG_PRESETS.large.config,
          preset: "large",
          createdAt: now().toISOString(),
        };
      case "4":
        return null;
      default:
        log("❌ Please enter 1, 2, 3, or 4");
    }
  }
}

async function askNumberWithDefault(input: {
  prompt: PromptFn;
  log: LogFn;
  question: string;
  defaultValue: number;
}): Promise<number> {
  const { prompt, log, question, defaultValue } = input;

  while (true) {
    const value = await prompt(question);
    if (!value) {
      return defaultValue;
    }
    const num = validateNumber(value, 1);
    if (num) {
      return num;
    }
    log("❌ Please enter a valid number (minimum 1)");
  }
}

async function customConfiguration(
  prompt: PromptFn,
  log: LogFn,
  now: NowFn,
): Promise<UserDummyDataConfig> {
  log("\n⚙️  Custom Configuration");
  log("Enter your desired values (press Enter for defaults):");

  const organizations = await askNumberWithDefault({
    prompt,
    log,
    question: "\nOrganizations [3]: ",
    defaultValue: 3,
  });
  const practitionerRolesPerOrganization = await askNumberWithDefault({
    prompt,
    log,
    question: "Practitioner roles per organization [2]: ",
    defaultValue: 2,
  });
  const practitionersPerOrganization = practitionerRolesPerOrganization;
  log(
    `Practitioners per organization: ${practitionersPerOrganization} (auto-matched to roles)`,
  );

  const patientsPerPractitioner = await askNumberWithDefault({
    prompt,
    log,
    question: "Patients per practitioner [4]: ",
    defaultValue: 4,
  });
  const appointmentsPerPatient = await askNumberWithDefault({
    prompt,
    log,
    question: "Appointments per patient [2]: ",
    defaultValue: 2,
  });
  const allergiesPerPatient = await askNumberWithDefault({
    prompt,
    log,
    question: "Allergies per patient [1]: ",
    defaultValue: 1,
  });
  const episodesPerPatient = await askNumberWithDefault({
    prompt,
    log,
    question: "Episodes per patient [4]: ",
    defaultValue: 4,
  });
  const conditionsPerPatient = await askNumberWithDefault({
    prompt,
    log,
    question: "Conditions per patient [4]: ",
    defaultValue: 4,
  });
  const encountersPerPatient = await askNumberWithDefault({
    prompt,
    log,
    question: "Encounters per patient [20]: ",
    defaultValue: 20,
  });
  const observationsPerEncounter = await askNumberWithDefault({
    prompt,
    log,
    question: "Observations per encounter [2]: ",
    defaultValue: 2,
  });
  const flagsPerEncounter = await askNumberWithDefault({
    prompt,
    log,
    question: "Flags per encounter [1]: ",
    defaultValue: 1,
  });
  const communicationsPerEncounter = await askNumberWithDefault({
    prompt,
    log,
    question: "Communications per encounter [1]: ",
    defaultValue: 1,
  });

  const idStrategy = await selectIdStrategy(prompt, log, "uuid");

  let startDate: `${number}-${number}-${number}`;
  while (true) {
    const value = await prompt("Start date (YYYY-MM-DD) [1950-01-01]: ");
    if (!value) {
      startDate = "1950-01-01";
      break;
    }
    if (validateDate(value)) {
      startDate = value as `${number}-${number}-${number}`;
      break;
    }
    log("❌ Please enter a valid date in YYYY-MM-DD format");
  }

  return {
    preset: "custom",
    organizations,
    practitionerRolesPerOrganization,
    practitionersPerOrganization,
    patientsPerPractitioner,
    allergiesPerPatient,
    appointmentsPerPatient,
    episodesPerPatient,
    conditionsPerPatient,
    encountersPerPatient,
    observationsPerEncounter,
    flagsPerEncounter,
    communicationsPerEncounter,
    idStrategy,
    startDate,
    createdAt: now().toISOString(),
  };
}

export async function resolveSetupConfigFlow(
  input: SetupFlowInput,
): Promise<SetupFlowDecision> {
  const { prompt, log, now, existingConfig } = input;

  if (existingConfig) {
    displaySummary(existingConfig, log);
    const overwrite = await prompt(
      "\n⚠️  Configuration file already exists. Overwrite? (y/N): ",
    );
    if (overwrite.toLowerCase() !== "y" && overwrite.toLowerCase() !== "yes") {
      log("Configuration setup cancelled.");
      return { kind: "cancelled", reason: "overwrite-denied" };
    }
  }

  const presetConfig = await selectPreset(prompt, log, now);

  let finalConfig: UserDummyDataConfig;
  if (presetConfig?.preset) {
    const idStrategy = await selectIdStrategy(
      prompt,
      log,
      presetConfig.idStrategy,
    );
    finalConfig = {
      ...presetConfig,
      idStrategy,
    };
    log(`\n✅ Selected preset: ${CONFIG_PRESETS[presetConfig.preset].name}`);
    log(`   ${CONFIG_PRESETS[presetConfig.preset].description}`);
  } else {
    finalConfig = await customConfiguration(prompt, log, now);
  }

  displaySummary(finalConfig, log);

  const confirm = await prompt("\nSave this configuration? (Y/n): ");
  if (confirm.toLowerCase() === "n" || confirm.toLowerCase() === "no") {
    log("Configuration setup cancelled.");
    return { kind: "cancelled", reason: "save-denied" };
  }

  return { kind: "save", config: finalConfig };
}
