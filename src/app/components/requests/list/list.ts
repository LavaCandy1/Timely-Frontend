import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExtraClass } from '../../../services/requests/extraClass';
import { ExtraClassRequest } from '../../../models/extraClass-request';
import { rxResource } from '@angular/core/rxjs-interop';
import { EMPTY, of } from 'rxjs';

@Component({
  selector: 'app-list',
  imports: [FormsModule],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List {

  private extraClassService = inject(ExtraClass);
  // constructor(private extraClassService : ExtraClass) { }

  protected openedRequestId = signal<number | null>(null);
  requestType = input<string>("");

  protected locations = [
    'BLA101',
    'BLA202',];
  
  protected requestRecieved: ExtraClassRequest[] = [];

  requestsResource = rxResource({
    params: () => ({ type: this.requestType() }), 
    
    stream: ({ params }) => {
      if (!params) return EMPTY;
      console.log("Fetching requests of type:", params.type);
      return this.extraClassService.searchAllRequests(params.type);
    }
  });

  protected openRequest(id: number) {
    if (this.openedRequestId() === id) {
      this.openedRequestId.set(null);
    } else {
      this.openedRequestId.set(id);
    }
  }
}
