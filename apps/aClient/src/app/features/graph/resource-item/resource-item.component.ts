import { Component, input, output } from '@angular/core';

@Component({
  selector: 'graph-resource-item',
  imports: [],
  templateUrl: './resource-item.component.html',
  styleUrl: './resource-item.component.scss',
})
export class ResourceItemComponent {
  id = input('');
  selected = false;
  selectedChange = output<boolean>();

  onClick(): void {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }
}
