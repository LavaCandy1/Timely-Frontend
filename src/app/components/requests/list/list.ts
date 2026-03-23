import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExtraClass } from '../../../services/requests/extraClass';
import { rxResource } from '@angular/core/rxjs-interop';
import { EMPTY, of } from 'rxjs';
import { ExtraClassList } from '../extra-class-list/extra-class-list';
import { LeaveList } from '../leave-list/leave-list';
import { RoomChangeList } from '../room-change-list/room-change-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [FormsModule, ExtraClassList, LeaveList, RoomChangeList, CommonModule],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List {
  
  private extraClassService = inject(ExtraClass);
  // constructor(private extraClassService : ExtraClass) { }

  requestType = input<string>("");
  refreshTrigger = signal(true);

  requestsResource = rxResource({
    params: () => ({ type: this.requestType(), trigger: this.refreshTrigger() }),
    
    stream: ({ params }) => {
      if (params.type === "") return EMPTY;
      console.log("Fetching requests of type:", params.type);
      return this.extraClassService.searchAllRequests(params.type);
    }
  });

  triggerRefresh() {
    this.refreshTrigger.set(!this.refreshTrigger());
  }
}
