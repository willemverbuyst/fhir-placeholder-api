import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bundle } from 'fhir/r5';
import { Observable } from 'rxjs';
import { AppFhirResource } from '../../types';
import { SERVER_URL } from './config';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  constructor(private http: HttpClient) {}

  getResources(resource: AppFhirResource['resourceType']): Observable<Bundle> {
    return this.http.get<Bundle>(`${SERVER_URL}/${resource}`);
  }

  getResourcesCount(): Observable<
    Record<AppFhirResource['resourceType'], number>
  > {
    return this.http.get<Record<AppFhirResource['resourceType'], number>>(
      `${SERVER_URL}/$resource-counts`
    );
  }
}
