import { Directive, HostListener, ElementRef } from '@angular/core';
import { SnippetService } from './snippet.service';
import { Snippet } from './snippet';
import { ParseService } from './parse.service';
import { ToastService } from './toast.service';
import { Toast } from './toast.enum';

@Directive({
  selector: '[appFiledrag]'
})
export class FiledragDirective {

  dragHappening = false;
  constructor(private parser: ParseService, private service: SnippetService, private toastService: ToastService) {
   }

  @HostListener('drop', ['$event'])
  drop(ev) {
    const files: FileList = ev.dataTransfer.files;
    ev.stopPropagation();
    ev.preventDefault();
    this.dragHappening = false;
    if (!files) {
      return;
    }
    for (let i = 0; i < files.length; i++) {
      this.readFile(files.item(i));
    }
  }

  @HostListener('dragover', ['$event'])
  dragover(ev) {
    if (!this.dragHappening) {
      this.dragHappening = true;
    }
    ev.stopPropagation();
    ev.preventDefault();
  }

  @HostListener('dragleave', ['$event'])
  dragleave(ev) {
    this.dragHappening = false;
    ev.stopPropagation();
    ev.preventDefault();
  }

  private readFile(droppedFile: File): void {
    if (droppedFile.size > 500000) {
      this.toastService.push(Toast.IMPORT_TOO_BIG);
      return;
    }

    const read = new FileReader();

    read.readAsText(droppedFile);
    
    read.onloadend =  () => {
      if (droppedFile.name.toLocaleLowerCase().endsWith('.coff')) {
        //import CodeCoffer xml (from the old desktop app)
        const newSnippets: Snippet[] = this.parser.parse(read.result.toString());
        newSnippets.forEach(snippet => this.service.addSnippet(snippet));
      }
      else if (droppedFile.name.toLocaleLowerCase().endsWith('.jcoff')) {
        //import CodeCoffer JSON
        const newSnippets: Snippet[] = JSON.parse(read.result.toString());
        this.service.import(newSnippets);
      }
      else {
        //import lone snippet
        const newSnippet: Snippet = new Snippet();
        newSnippet.title = droppedFile.name;
        newSnippet.tags = droppedFile.name;
        newSnippet.code = read.result.toString();
        this.service.addSnippet(newSnippet);
      }
    }
  }
}
