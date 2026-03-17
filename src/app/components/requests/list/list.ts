import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List {

  protected openedRequestId = signal<number | null>(null);

  protected requests = [
    {
      id: 1,name: 'Request 1',description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc efficitur varius. Sed at ligula a enim efficitur commodo. Nulla facilisi. Donec ac odio id nisl convallis tincidunt. Proin in felis sed metus efficitur bibendum. Curabitur ac nunc ut nisl efficitur fermentum.'
    },{
      id: 2,name: 'Request 2',description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc efficitur varius. Sed at ligula a enim efficitur commodo. Nulla facilisi. Donec ac odio id nisl convallis tincidunt. Proin in felis sed metus efficitur bibendum. Curabitur ac nunc ut nisl efficitur fermentum.'
    },{
      id: 3,name: 'Request 3',description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc efficitur varius. Sed at ligula a enim efficitur commodo. Nulla facilisi. Donec ac odio id nisl convallis tincidunt. Proin in felis sed metus efficitur bibendum. Curabitur ac nunc ut nisl efficitur fermentum.'
    },
    ]

  protected openRequest(id: number) {
    if (this.openedRequestId() === id) {
      this.openedRequestId.set(null);
    } else {
      this.openedRequestId.set(id);
    }
  }
}
