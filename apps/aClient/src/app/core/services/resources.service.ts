import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bundle, Resource } from 'fhir/r5';
import { Observable } from 'rxjs';
import { AppFhirResource } from '../../types';
import { SERVER_URL } from './config';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  constructor(private http: HttpClient) {}

  getResourcesCount(): Observable<
    Record<AppFhirResource['resourceType'], number>
  > {
    return this.http.get<Record<AppFhirResource['resourceType'], number>>(
      `${SERVER_URL}/$resource-counts`
    );
  }

  getResources<T extends Resource>(url: string): Observable<Bundle<T> | T> {
    return this.http.get<Bundle<T> | T>(`${SERVER_URL}/${url}`);
  }
}
