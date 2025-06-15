const AddressType = [
    "postal",
    "physical",
    "both"
];

const AddressUse = [
    "home",
    "work",
    "temp",
    "old",
    "billing"
];

const AppointmentParticipantStatus = [
    "accepted",
    "declined",
    "tentative",
    "needs-action"
];

const AppointmentStatus = [
    "proposed",
    "pending",
    "booked",
    "arrived",
    "fulfilled",
    "cancelled",
    "noshow",
    "entered-in-error",
    "checked-in",
    "waitlist"
];

const ConditionClinicalStatus = {
    ACTIVE: "active",
    RECURRENCE: "recurrence",
    RELAPSE: "relapse",
    INACTIVE: "inactive",
    REMISSION: "remission",
    RESOLVED: "resolved",
    UNKNOWN: "unknown"
};

const ContactSystem = [
    "phone",
    "fax",
    "email",
    "pager",
    "url",
    "sms",
    "other"
];

const ContactUse = [
    "home",
    "work",
    "temp",
    "old",
    "mobile"
];

const EncounterStatus = [
    "planned",
    "in-progress",
    "on-hold",
    "discharged",
    "completed",
    "cancelled",
    "discontinued",
    "entered-in-error",
    "unknown"
];

const EpisodeOfCareStatus = [
    "planned",
    "waitlist",
    "active",
    "onhold",
    "finished",
    "cancelled",
    "entered-in-error"
];

const Gender = [
    "male",
    "female",
    "other",
    "unknown"
];

const ObservationStatus = [
    "registered",
    "preliminary",
    "final",
    "amended",
    "corrected",
    "cancelled",
    "entered-in-error",
    "unknown"
];

export { AddressType, AddressUse, AppointmentParticipantStatus, AppointmentStatus, ConditionClinicalStatus, ContactSystem, ContactUse, EncounterStatus, EpisodeOfCareStatus, Gender, ObservationStatus };
