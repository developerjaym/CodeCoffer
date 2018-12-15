import { Component, OnInit } from '@angular/core';
import { ToastService } from '../toast.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Toast } from '../toast.enum';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  message$: Observable<string>;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.message$ = this.toastService.pull();
  }

  cancel() {
    this.toastService.push(Toast.EMPTY);
  }
}
