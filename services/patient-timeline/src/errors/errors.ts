export class FetchError extends Error {
  constructor(
    message: string,
    readonly cause?: unknown,
  ) {
    super(message);
    this.name = "FetchError";
  }
}

export class InvalidFhirStructureError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidFhirStructureError";
  }
}

export class PatientNotFoundError extends Error {
  constructor(
    message: string,
    readonly cause?: unknown,
  ) {
    super(message);
    this.name = "PatientNotFoundError";
  }
}
