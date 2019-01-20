import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { Toast } from '../models/toast.enum';

@Injectable({
  providedIn: 'root'
})
export class CopyService {

  constructor(private toastService: ToastService) { }

  copy(text: string): void {
    navigator["clipboard"].writeText(text).then(() => this.toastService.push(Toast.COPY_SUCCEEDED), 
    () => this.toastService.push(Toast.COPY_FAILED));
  }
}
