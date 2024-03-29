import { Injectable } from '@angular/core';
import { Style } from '../models/style';
import { Observable, of } from 'rxjs';
import { StorageService } from './storage.service';
import { ToastService } from './toast.service';
import { Toast } from '../models/toast.enum';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  private defaultStyleObject = {
    'background-image': 'none',
    'main-bg-color': 'rgba(244, 244, 244, 1)',
    'main-fg-color': 'rgb(9, 9, 9)',
    'secondary-bg-color': 'rgb(244, 244, 244)',
    'secondary-fg-color': 'rgb(9, 9, 9)',
    'accent-bg-color': 'rgb(35, 135, 66)',
    'accent-fg-color': 'rgb(244, 244, 244)',
    'main-font-size': '1rem',
    'code-font-size': '0.9rem',
    'code-line-height': '1rem',
    'direction': 'ltr',
    'flex-row-direction': 'row',
    'flex-align': 'flex-end',
    'text-align': 'left'
  };

  constructor(private storage: StorageService, private toastService: ToastService) {
   }

  getStyleObject(): Observable<Style> {
    return of(this.generateStyle());
  }

  saveStyleObject(style: Style): void {
    this.activateStyle(style);
    this.storage.saveStyleObject(style, () => this.toastService.push(Toast.SAVE_SUCCEEDED), () => this.toastService.push(Toast.SAVE_FAILED));
  }

  revert(): Style {
    this.storage.saveStyleObject(this.defaultStyleObject);
    return this.defaultStyleObject;
  }

  loadStyle(): void {
    this.activateStyle(this.storage.getStyleObject(this.defaultStyleObject)); //start off with saved styles
  }

  private activateStyle(style: Style): void {
    for (const key in style) {
      if (style[key] !== '') {
        document.documentElement.style.setProperty('--' + key, style[key]);
      }
    }
  }

  /**
   * Sometimes the user has a Style object saved in LocalStorage.
   * We don't want to overwrite that, but we sometimes add new css variables.
   * This method takes the default style object - defined above - and merges it with what's saved.
   * If the saved style object has a value for a css variable, that value is used.
   * If it doesn't, then the default value is used.
   */
  private generateStyle(): Style {
    return {...this.defaultStyleObject, ...this.storage.getStyleObject(this.defaultStyleObject)};
  }
}
