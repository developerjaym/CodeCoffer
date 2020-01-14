import { Injectable, Renderer2, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor() {}

  /**
   * This method can be used to make a click to an A tag download a file.
   * @param text the text of the file
   * @param name the file name, no extension
   * @param aTag Must be an A Tag elementRef
   * @param renderer
   */
  downloadAsFrom(text: string, name: string, aTag: ElementRef, renderer: Renderer2) {
    renderer.setAttribute(aTag.nativeElement, 'href', URL.createObjectURL(new Blob([text], { type: 'text' })));
    renderer.setAttribute(aTag.nativeElement, 'download', name + '.jcoff');
  }
}
