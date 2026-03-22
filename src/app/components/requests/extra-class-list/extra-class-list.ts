import { Component, computed, inject, input, output, signal } from '@angular/core';
import { ExtraClass } from '../../../services/requests/extraClass';
import { ExtraClassRequest } from '../../../models/extraClass-request';
import { FormsModule } from '@angular/forms';
import { Location } from '../../../models/location.model';

@Component({
  selector: 'app-extra-class-list',
  imports: [FormsModule],
  templateUrl: './extra-class-list.html',
  styleUrl: './extra-class-list.scss'
})
export class ExtraClassList {
  private extraClassService = inject(ExtraClass);

  protected openedRequestId = signal<number | null>(null);

  listReload = output<void>();
  

  protected locations: Location[] = [];

  listData = input<ExtraClassRequest[] | undefined>([]);

  protected openRequest(id: number) {
    if (this.openedRequestId() === id) {
      this.openedRequestId.set(null);
      this.locations = [];
    } else {
      this.openedRequestId.set(id);
      this.findAvailableLocations(id);
    }
  }

  readonly sortedListData = computed(() => {
    const data = this.listData();
    
    if (!data) return [];

    return [...data].sort((a, b) => {
      // Match the exact case of your Type definition
      const aIsPending = a.status === 'PENDING';
      const bIsPending = b.status === 'PENDING';
      
      if (aIsPending && !bIsPending) return -1;
      if (!aIsPending && bIsPending) return 1;
      
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  });

  approveRequest(requestId: number) {
    this.extraClassService.approveExtraClassRequest(requestId).subscribe({
      next: () => {
        this.listReload.emit();        
      },
      error: (error) => {
        console.error('Error approving request:', error);
      }
    });
  }
  
  rejectRequest(requestId: number) {
    this.extraClassService.rejectExtraClassRequest(requestId).subscribe({
      next: () => {
        this.listReload.emit();
      },
      error: (error) => {
        console.error('Error rejecting request:', error);
      }
    });
  }

  findAvailableLocations(id: number) {
    this.extraClassService.getAvailableLocations(id).subscribe({
      next: (locations) => {
        this.locations = locations;
        console.log('Available locations:', this.locations);
      },
      error: (error) => {
        console.error('Error fetching available locations:', error);
      }
    });
  }
}
