import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bundle } from 'fhir/r5';
import { Observable } from 'rxjs';
import { AppFhirResource } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  private base = 'http://localhost:8080/api/v2/r5';

  constructor(private http: HttpClient) {}

  getResources(resource: AppFhirResource['resourceType']): Observable<Bundle> {
    return this.http.get<Bundle>(`${this.base}/${resource}`);
  }
}
