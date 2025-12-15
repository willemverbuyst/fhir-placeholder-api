import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import {
  getResourcesWithIdFromBundle,
  isBundle,
  isResourceWithId,
} from '@repo/utils';
import { Resource } from 'fhir/r5';
import {
  APP_RESOURCE_TYPES,
  AppResourceType,
  FHIR_RESOURCES,
} from '../../../core/services/config';
import {
  getMappedResource,
  getMappedResources,
} from '../../../core/services/mappedResources';
import { ResourcesService } from '../../../core/services/resources.service';
import { MappedResource } from '../../../interfaces/MappedResource';
import { ResourceItemComponent } from '../resource-item/resource-item.component';

@Component({
  selector: 'graph-resource-renderer',
  imports: [ResourceItemComponent, NgTemplateOutlet],
  templateUrl: './resource-renderer.component.html',
  styleUrl: './resource-renderer.component.scss',
})
export class ResourceRendererComponent<T extends Resource> {
  @Input() url: string | undefined = undefined;
  @ContentChild(TemplateRef) content!: TemplateRef<{
    parent: MappedResource<T> & { selected: boolean; id: string };
  }>;
  resources: (MappedResource<T> & { selected: boolean; id: string })[] = [];

  constructor(private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    if (!this.url) {
      return;
    }

    this.resourcesService.getResources<T>(this.url).subscribe((data) => {
      const resourceType = this.url?.split(/[?/]/)[0] as AppResourceType;

      if (!APP_RESOURCE_TYPES.includes(resourceType)) {
        console.error(`Unsupported resource type: ${resourceType}`);
        return;
      }

      if (data && isBundle(data)) {
        const resources = getResourcesWithIdFromBundle<T>(data);
        const cardRows = FHIR_RESOURCES[resourceType].cardRows;
        const mappedResources = getMappedResources<T>(resources, cardRows);

        this.resources = mappedResources.map((resource) => ({
          ...resource,
          selected: false,
          id: (resource as Resource).id || '',
        }));
      }

      if (data && isResourceWithId(data)) {
        const cardRows = FHIR_RESOURCES[resourceType].cardRows;
        const mappedResource = getMappedResource<T>(data, cardRows);

        this.resources = [
          {
            ...mappedResource,
            selected: false,
            id: data.id || '',
          },
        ];
      }
    });
  }
}
