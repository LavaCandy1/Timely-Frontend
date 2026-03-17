import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for [ngStyle]
import { List } from './list/list';

@Component({
  selector: 'app-requests',
  imports: [CommonModule, List], // MUST import CommonModule to use [ngStyle]
  templateUrl: './requests.html',
  styleUrl: './requests.scss'
})
export class Requests {
  spanStyle = {
    top: '0px',
    left: '0px'
  };

  protected requestTypes = ['Extra Class', 'Room Change', 'Leave', 'Other'];

  updateCoords(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    // Calculate relative X and Y
    const relX = event.clientX - rect.left;
    const relY = event.clientY - rect.top;

    this.spanStyle = {
      top: `${relY}px`,
      left: `${relX}px`
    };
  }
}