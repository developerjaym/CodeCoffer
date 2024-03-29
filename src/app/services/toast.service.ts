import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { Toast } from '../models/toast.enum';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastSubject: BehaviorSubject<Toast>;
  timeoutNumber: number = 0;
  constructor() {
    this.toastSubject = new BehaviorSubject<Toast>(Toast.WELCOME);
  }
  push(message: Toast): void {
    this.toastSubject.next(message);
  }
  pull(): Observable<Toast> {
    return this.toastSubject.asObservable().pipe(
      tap((value) => window.clearTimeout(this.timeoutNumber)),
      distinctUntilChanged(),
      tap((value) => this.pushEmpty(value))
    );
  }
  private pushEmpty(message: Toast): void {
    if (message !== Toast.EMPTY) {
      this.timeoutNumber = window.setTimeout(() => this.push(Toast.EMPTY), 5000);
    }
  }
}
