import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UserUpdateService {
  private valueSubject: Subject<object> = new Subject<object>();
  value$: Observable<object> = this.valueSubject.asObservable();

  emitValue(newValue: object): void {
    this.valueSubject.next(newValue);
  }
}
