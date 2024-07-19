import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterOutlet } from '@angular/router';

/**
 * Launch item component
 *
 * This component displays a single launch item with expandable details.
 *
 */
@Component({
  selector: 'app-launch-item',
  standalone: true,
  imports: [RouterOutlet, MatExpansionModule, NgFor, DatePipe, NgIf],
  templateUrl: './launch-item.component.html',
  styleUrls: ['./launch-item.component.css'],
})

/**Input launch data
 *The launch data to be displayed in the component.
 */
export class LaunchItemComponent {
  @Input() launch: any;
  @Input() selectedLaunch: any;
  @Input() expanded: boolean = false;
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();
  launchDetails: any[] = [];

  onToggle(): void {
    this.toggle.emit();
  }
}
