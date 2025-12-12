import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { FhirResource } from 'fhir/r5';
import { ResourcesService } from '../../../core/services/resources.service';
import { ResourceItemComponent } from '../resource-item/resource-item.component';

@Component({
  selector: 'graph-resource-renderer',
  imports: [ResourceItemComponent, NgTemplateOutlet],
  templateUrl: './resource-renderer.component.html',
  styleUrl: './resource-renderer.component.scss',
})
export class ResourceRendererComponent {
  @Input() url: string | undefined = undefined;
  @ContentChild(TemplateRef) content!: TemplateRef<{
    parent: FhirResource & { id: string; selected: boolean };
  }>;
  resources: (FhirResource & { id: string; selected: boolean })[] = [];

  constructor(private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    if (!this.url) {
      return;
    }
    this.resourcesService.getResources(this.url).subscribe((data) => {
      if (!data.entry) {
        this.resources.push({
          ...data,
          id: data.id,
          selected: false,
        } as FhirResource & { id: string; selected: boolean });
      } else {
        for (const entry of data.entry || []) {
          if (entry.resource?.id) {
            this.resources.push({
              ...entry.resource,
              id: entry.resource.id,
              selected: false,
            });
          }
        }
      }
    });
  }
}
