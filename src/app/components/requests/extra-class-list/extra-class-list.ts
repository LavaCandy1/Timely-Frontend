import { Component, inject, input, output, signal } from '@angular/core';
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
