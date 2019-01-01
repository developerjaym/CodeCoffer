import { Injectable } from '@angular/core';
import { Style } from './style';
import { Observable, of } from 'rxjs';
import { StorageService } from './storage.service';
import { ToastService } from './toast.service';
import { Toast } from './toast.enum';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  private defaultStyleObject = {
    '--background-image': 'none',
    '--main-bg-color': 'rgba(244, 244, 244, 1)',
    '--main-fg-color': 'rgb(9, 9, 9)',
    '--secondary-bg-color': 'rgb(244, 244, 244)',
    '--secondary-fg-color': 'rgb(9, 9, 9)',
    '--accent-bg-color': 'rgb(35, 135, 66)',
    '--accent-fg-color': 'rgb(244, 244, 244)'
  };

  constructor(private storage: StorageService, private toastService: ToastService) {
   }

  getStyleObject(): Observable<Style> {
    return of(this.storage.getStyleObject(this.defaultStyleObject));
  }

  saveStyleObject(style: Style): void {
    for (const key in style) {
      if(style[key] !== '') {
        document.documentElement.style.setProperty(key, style[key]);
      }
    }

    this.storage.saveStyleObject(style, () => this.toastService.push(Toast.SAVE_SUCCEEDED), () => this.toastService.push(Toast.SAVE_FAILED));    
  }

  revert(): Style {
    this.storage.saveStyleObject(this.defaultStyleObject);
    return this.defaultStyleObject;
  }

  loadStyle(): void {
    this.saveStyleObject(this.storage.getStyleObject(this.defaultStyleObject)); //start off with saved styles
  
  }
}
