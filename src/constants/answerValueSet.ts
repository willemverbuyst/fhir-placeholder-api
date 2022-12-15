// hardcoded for dev

export const hardcodedValueSet = {
  "http://hl7.org/fhir/ValueSet/yesnodontknow": [
    { code: "Y", display: "Yes" },
    { code: "N", display: "No" },
    { code: "asked-unknown", display: "Don't know" },
  ],
  "http://loinc.org/vs/LL358-3": [
    { code: 0, display: "Not at all" },
    { code: 1, display: "Several days" },
    { code: 2, display: "More than half the days" },
    { code: 3, display: "Nearly every day" },
  ],
  "http://hl7.org/fhir/ValueSet/duration-units": [
    { code: "ms", display: "milliseconds" },
    { code: "s", display: "seconds" },
    { code: "min", display: "minutes" },
    { code: "h", display: "hours" },
    { code: "d", display: "days" },
    { code: "wk", display: "weeks" },
    { code: "mo", display: "months" },
    { code: "a", display: "years" },
  ],
};
