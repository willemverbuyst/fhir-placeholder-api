import { cleanupPatients } from "./patients";

export function cleanupDatabase(): void {
  cleanupPatients();
}
