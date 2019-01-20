import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { Observable, Subscription } from 'rxjs';
import { Toast } from '../../models/toast.enum';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {

  message$: Observable<string>;
  message: string;
  subscription: Subscription;
  TOAST = Toast;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.subscription = this.toastService.pull().subscribe(
      (toast) => this.message = toast
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
