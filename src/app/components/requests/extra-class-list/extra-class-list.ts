import { Component, inject, input, signal } from '@angular/core';
import { ExtraClass } from '../../../services/requests/extraClass';
import { ExtraClassRequest } from '../../../models/extraClass-request';
import { FormsModule } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-extra-class-list',
  imports: [FormsModule],
  templateUrl: './extra-class-list.html',
  styleUrl: './extra-class-list.scss'
})
export class ExtraClassList {
  private extraClassService = inject(ExtraClass);

  protected openedRequestId = signal<number | null>(null);
  

  protected locations = [
    'BLA101',
    'BLA202',];

  listData = input<ExtraClassRequest[] | undefined>([]);

  protected openRequest(id: number) {
    if (this.openedRequestId() === id) {
      this.openedRequestId.set(null);
    } else {
      this.openedRequestId.set(id);
    }
  }

  approveRequest(requestId: number) {
    this.extraClassService.approveExtraClassRequest(requestId).subscribe({
      next: (response) => {
        console.log('Request approved successfully:', response);
        // Optionally, refresh the list of requests after approval
      },
      error: (error) => {
        console.error('Error approving request:', error);
      }
    });
  }
  
  rejectRequest(requestId: number) {
    this.extraClassService.rejectExtraClassRequest(requestId).subscribe({
      next: (response) => {
        console.log('Request rejected successfully:', response);
        // Optionally, refresh the list of requests after rejection
      },
      error: (error) => {
        console.error('Error rejecting request:', error);
      }
    });
  }
}
