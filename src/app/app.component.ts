import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  viewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LaunchItemComponent } from './launch-item/launch-item.component';
import { SpacexService } from './spacex.service';
import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';
import { NgFor, KeyValuePipe, NgIf } from '@angular/common';

/**
 * The main application component that displays a list of upcoming SpaceX launches.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatExpansionModule,
    NgFor,
    LaunchItemComponent,
    KeyValuePipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  /*
   * An event emitter that notifies when the launch details toggle is clicked.
   */
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();
  // @Output() selectedLaunchDetails: any;

  title = 'SpaceX Launches';
  launches: any[] = []; //An array to store the list of upcoming launches.
  selectedLaunch: any = null; //An object to store the data for the currently selected launch.
  launchID!: string; // The ID of the currently selected launch.
  openedLaunchId: string | null = null; //The ID of the launch that is currently open.
  launchClickCounts: { [key: string]: number } = {}; //An object to keep track of the number of times each launch is clicked or opened.

  /**
   * Injects the SpaceX service to fetch launch data.
   * @param spacexService The SpaceX service instance.
   */
  constructor(private spacexService: SpacexService) {}
  /**
   * Initializes the component by fetching the next launches data.
   */
  ngOnInit(): void {
    this.spacexService.getNextLaunches().subscribe((data) => {
      this.launches = data;
    });
  }
  /**
   * Toggles the launch details open or closed.
   * @param launchId The ID of the launch to toggle.
   */
  onToggleLaunch(launchId: string): void {
    if (this.openedLaunchId === launchId) {
      this.openedLaunchId = null;
      this.selectedLaunch = null;
    } else {
      this.openedLaunchId = launchId;
      this.trackLaunchClick(launchId);
      this.spacexService
        .getLaunchDetails(this.openedLaunchId)
        .subscribe((data) => {
          this.selectedLaunch = data;
        });
    }
  }

  /**
   * Tracks the number of times a launch is clicked or opened.
   * @param launchId The ID of the launch to track.
   */
  trackLaunchClick(launchId: string): void {
    if (!this.launchClickCounts[launchId]) {
      this.launchClickCounts[launchId] = 0;
    }
    this.launchClickCounts[launchId]++;
    console.log(
      `Mission ID - ${launchId} is opened ${this.launchClickCounts[launchId]} times`
    );
  }
}
