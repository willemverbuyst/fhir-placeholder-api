import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { CapabilityStatement } from 'fhir/r5';
import { Observable } from 'rxjs';
import { SERVER_URL } from './config';

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  public capabilityStatement?: CapabilityStatement;

  constructor(private http: HttpClient) {}

  getMetadata(): Observable<CapabilityStatement> {
    return this.http.get<CapabilityStatement>(`${SERVER_URL}/metadata`);
  }
}
