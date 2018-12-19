import { Component, OnInit } from '@angular/core';
import { ToastService } from '../toast.service';
import { Observable } from 'rxjs';
import { Toast } from '../toast.enum';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  message$: Observable<string>;
  TOAST = Toast;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.message$ = this.toastService.pull();
  }
}
