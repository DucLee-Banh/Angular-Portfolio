import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalStatusService {
  private isOpen = new BehaviorSubject<boolean>(false);
  public isOpen$ = this.isOpen.asObservable();

  constructor() { }

  toggleOpen() {
    this.isOpen.next(!this.isOpen.value);
    if (this.isOpen.value) {
      document.body.classList.add('freeze');
    } else {
      document.body.classList.remove('freeze');
    }
  }
}
