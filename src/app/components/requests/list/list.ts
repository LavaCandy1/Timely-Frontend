import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExtraClass } from '../../../services/requests/extraClass';
import { ExtraClassRequest } from '../../../models/extraClass-request';
import { rxResource } from '@angular/core/rxjs-interop';
import { EMPTY, of } from 'rxjs';
import { ExtraClassList } from '../extra-class-list/extra-class-list';
import { LeaveList } from '../leave-list/leave-list';
import { RoomChangeList } from '../room-change-list/room-change-list';

@Component({
  selector: 'app-list',
  imports: [FormsModule, ExtraClassList, LeaveList, RoomChangeList],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List {
  
  private extraClassService = inject(ExtraClass);
  // constructor(private extraClassService : ExtraClass) { }

  requestType = input<string>("");

  requestsResource = rxResource({
    params: () => ({ type: this.requestType() }), 
    
    stream: ({ params }) => {
      if (!params) return EMPTY;
      console.log("Fetching requests of type:", params.type);
      return this.extraClassService.searchAllRequests(params.type);
    }
  });


}
