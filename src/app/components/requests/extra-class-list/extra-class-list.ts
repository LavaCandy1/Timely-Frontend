import { Component, inject, input, signal } from '@angular/core';
import { ExtraClass } from '../../../services/requests/extraClass';
import { ExtraClassRequest } from '../../../models/extraClass-request';
import { rxResource } from '@angular/core/rxjs-interop';
import { EMPTY } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-extra-class-list',
  imports: [FormsModule],
  templateUrl: './extra-class-list.html',
  styleUrl: './extra-class-list.scss'
})
export class ExtraClassList {

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
}
