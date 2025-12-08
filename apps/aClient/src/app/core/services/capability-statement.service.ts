import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import type { CapabilityStatement } from "fhir/r5";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MetadataService {
  public capabilityStatement?: CapabilityStatement;
  private base = "http://localhost:8080/api/v2/r5";

  constructor(private http: HttpClient) {}

  getMetadata(): Observable<CapabilityStatement> {
    return this.http.get<CapabilityStatement>(`${this.base}/metadata`);
  }
}
