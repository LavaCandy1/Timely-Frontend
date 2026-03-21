import { Component, computed, inject, input, output, signal } from '@angular/core';
import { ExtraClass } from '../../../services/requests/extraClass';
import { ExtraClassRequest } from '../../../models/extraClass-request';
import { FormsModule } from '@angular/forms';

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

  readonly sortedListData = computed(() => {
    const data = this.listData();
    
    if (!data) return [];

    return [...data].sort((a, b) => {
      // Match the exact case of your Type definition
      const aIsPending = a.status === 'PENDING';
      const bIsPending = b.status === 'PENDING';
      
      if (aIsPending && !bIsPending) return -1;
      if (!aIsPending && bIsPending) return 1;
      
      // Optional: Sort by date if both have the same status
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
}
