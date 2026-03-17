#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline";
import {
  CONFIG_FILE_PATH,
  CONFIG_PRESETS,
  type UserDummyDataConfig,
} from "./configPresets";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function validateNumber(value: string, min = 1): number | null {
  const num = Number.parseInt(value, 10);
  return !Number.isNaN(num) && num >= min ? num : null;
}

function validateDate(value: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(value)) return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}

async function selectPreset(): Promise<UserDummyDataConfig | null> {
  console.log("\n🎛️  Available presets:");
  console.log("1. Small - 3 organizations, 24 patients (development)");
  console.log("2. Medium - 10 organizations, 200 patients (testing)");
  console.log("3. Large - 25 organizations, 1000 patients (performance)");
  console.log("4. Custom - Configure manually");

  while (true) {
    const choice = await prompt("\nSelect preset (1-4): ");

    switch (choice) {
      case "1":
        return {
          ...CONFIG_PRESETS.small.config,
          preset: "small",
          createdAt: new Date().toISOString(),
        };
      case "2":
        return {
          ...CONFIG_PRESETS.medium.config,
          preset: "medium",
          createdAt: new Date().toISOString(),
        };
      case "3":
        return {
          ...CONFIG_PRESETS.large.config,
          preset: "large",
          createdAt: new Date().toISOString(),
        };
      case "4":
        return null; // Will trigger custom configuration
      default:
        console.log("❌ Please enter 1, 2, 3, or 4");
    }
  }
}

async function customConfiguration(): Promise<UserDummyDataConfig> {
  console.log("\n⚙️  Custom Configuration");
  console.log("Enter your desired values (press Enter for defaults):");

  // Organizations
  let organizations: number;
  while (true) {
    const value = await prompt("\nOrganizations [3]: ");
    if (!value) {
      organizations = 3;
      break;
    }
    const num = validateNumber(value, 1);
    if (num) {
      organizations = num;
      break;
    }
    console.log("❌ Please enter a valid number (minimum 1)");
  }

  // Practitioner roles per organization
  let practitionerRolesPerOrganization: number;
  while (true) {
    const value = await prompt("Practitioner roles per organization [2]: ");
    if (!value) {
      practitionerRolesPerOrganization = 2;
      break;
    }
    const num = validateNumber(value, 1);
    if (num) {
      practitionerRolesPerOrganization = num;
      break;
    }
    console.log("❌ Please enter a valid number (minimum 1)");
  }

  // Practitioners per organization (always equals practitioner roles)
  const practitionersPerOrganization = practitionerRolesPerOrganization;
  console.log(
    `Practitioners per organization: ${practitionersPerOrganization} (auto-matched to roles)`,
  );

  // Patients per practitioner
  let patientsPerPractitioner: number;
  while (true) {
    const value = await prompt("Patients per practitioner [4]: ");
    if (!value) {
      patientsPerPractitioner = 4;
      break;
    }
    const num = validateNumber(value, 1);
    if (num) {
      patientsPerPractitioner = num;
      break;
    }
    console.log("❌ Please enter a valid number (minimum 1)");
  }

  // Appointments per patient
  let appointmentsPerPatient: number;
  while (true) {
    const value = await prompt("Appointments per patient [2]: ");
    if (!value) {
      appointmentsPerPatient = 2;
      break;
    }
    const num = validateNumber(value, 1);
    if (num) {
      appointmentsPerPatient = num;
      break;
    }
    console.log("❌ Please enter a valid number (minimum 1)");
  }

  // Allergies per patient
  let allergiesPerPatient: number;
  while (true) {
    const value = await prompt("Allergies per patient [1]: ");
    if (!value) {
      allergiesPerPatient = 1;
      break;
    }
    const num = validateNumber(value, 1);
    if (num) {
      allergiesPerPatient = num;
      break;
    }
    console.log("❌ Please enter a valid number (minimum 1)");
  }

  // Episodes per patient
  let episodesPerPatient: number;
  while (true) {
    const value = await prompt("Episodes per patient [4]: ");
    if (!value) {
      episodesPerPatient = 4;
      break;
    }
    const num = validateNumber(value, 1);
    if (num) {
      episodesPerPatient = num;
      break;
    }
    console.log("❌ Please enter a valid number (minimum 1)");
  }

  // Conditions per patient
  let conditionsPerPatient: number;
  while (true) {
    const value = await prompt("Conditions per patient [4]: ");
    if (!value) {
      conditionsPerPatient = 4;
      break;
    }
    const num = validateNumber(value, 1);
    if (num) {
      conditionsPerPatient = num;
      break;
    }
    console.log("❌ Please enter a valid number (minimum 1)");
  }

  // Encounters per patient
  let encountersPerPatient: number;
  while (true) {
    const value = await prompt("Encounters per patient [20]: ");
    if (!value) {
      encountersPerPatient = 20;
      break;
    }
    const num = validateNumber(value, 1);
    if (num) {
      encountersPerPatient = num;
      break;
    }
    console.log("❌ Please enter a valid number (minimum 1)");
  }

  // Observations per encounter
  let observationsPerEncounter: number;
  while (true) {
    const value = await prompt("Observations per encounter [2]: ");
    if (!value) {
      observationsPerEncounter = 2;
      break;
    }
    const num = validateNumber(value, 1);
    if (num) {
      observationsPerEncounter = num;
      break;
    }
    console.log("❌ Please enter a valid number (minimum 1)");
  }

  // ID Strategy
  let idStrategy: "sequential" | "uuid";
  while (true) {
    const value = await prompt("ID strategy (sequential/uuid) [uuid]: ");
    if (!value || value.toLowerCase() === "uuid") {
      idStrategy = "uuid";
      break;
    }
    if (value.toLowerCase() === "sequential") {
      idStrategy = "sequential";
      break;
    }
    console.log('❌ Please enter "sequential" or "uuid"');
  }

  // Start date
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
    console.log("❌ Please enter a valid date in YYYY-MM-DD format");
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
    idStrategy,
    startDate,
    createdAt: new Date().toISOString(),
  };
}

function displaySummary(config: UserDummyDataConfig) {
  const totalPractitioners =
    config.organizations * config.practitionersPerOrganization;
  const totalPatients = totalPractitioners * config.patientsPerPractitioner;
  const totalEncounters = totalPatients * config.encountersPerPatient;
  const totalObservations = totalEncounters * config.observationsPerEncounter;

  console.log("\n📊 Configuration Summary:");
  console.log("─".repeat(40));
  console.log(`Organizations: ${config.organizations}`);
  console.log(
    `Practitioners: ${totalPractitioners} (${config.practitionersPerOrganization} per org)`,
  );
  console.log(
    `Patients: ${totalPatients} (${config.patientsPerPractitioner} per practitioner)`,
  );
  console.log(`Appointments: ${totalPatients * config.appointmentsPerPatient}`);
  console.log(`Allergies: ${totalPatients * config.allergiesPerPatient}`);
  console.log(`Episodes: ${totalPatients * config.episodesPerPatient}`);
  console.log(`Conditions: ${totalPatients * config.conditionsPerPatient}`);
  console.log(`Encounters: ${totalEncounters}`);
  console.log(`Observations: ${totalObservations}`);
  console.log(`ID Strategy: ${config.idStrategy}`);
  console.log(`Start Date: ${config.startDate}`);
  console.log("─".repeat(40));
}

async function main() {
  console.log("🚀 FHIR Dummy Data Configuration Setup");

  // Check if config already exists
  if (existsSync(CONFIG_FILE_PATH)) {
    const configData = readFileSync(CONFIG_FILE_PATH, "utf-8");
    const userConfig: UserDummyDataConfig = JSON.parse(configData);

    displaySummary(userConfig);

    const overwrite = await prompt(
      "\n⚠️  Configuration file already exists. Overwrite? (y/N): ",
    );
    if (overwrite.toLowerCase() !== "y" && overwrite.toLowerCase() !== "yes") {
      console.log("Configuration setup cancelled.");
      rl.close();
      return;
    }
  }

  try {
    // Select preset or custom
    const presetConfig = await selectPreset();

    let finalConfig: UserDummyDataConfig;
    if (presetConfig?.preset) {
      finalConfig = presetConfig;
      console.log(
        `\n✅ Selected preset: ${CONFIG_PRESETS[presetConfig.preset].name}`,
      );
      console.log(`   ${CONFIG_PRESETS[presetConfig.preset].description}`);
    } else {
      finalConfig = await customConfiguration();
    }

    // Display summary
    displaySummary(finalConfig);

    // Confirm
    const confirm = await prompt("\nSave this configuration? (Y/n): ");
    if (confirm.toLowerCase() === "n" || confirm.toLowerCase() === "no") {
      console.log("Configuration setup cancelled.");
      rl.close();
      return;
    }

    // Save configuration
    writeFileSync(CONFIG_FILE_PATH, JSON.stringify(finalConfig, null, 2));

    console.log(`\n✅ Configuration saved to ${CONFIG_FILE_PATH}`);
    console.log(
      "📝 Note: This config will expire in 2 days and show warnings.",
    );
    console.log('🧹 Run "pnpm cleanup" to remove the config file.');
  } catch (error) {
    console.error("\n❌ Error during setup:", error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
