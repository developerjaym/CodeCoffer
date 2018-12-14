import { Directive, HostListener, ElementRef } from '@angular/core';
import { SnippetService } from './snippet.service';
import { Snippet } from './snippet';
import { ParseService } from './parse.service';

@Directive({
  selector: '[appFiledrag]'
})
export class FiledragDirective {

  dragHappening = false;
  constructor(private parser: ParseService, private service: SnippetService) {
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
      console.error("File size limit exceeded by " + droppedFile.name);
      return;
    }

    const read = new FileReader();

    read.readAsText(droppedFile);
    
    read.onloadend =  () => {
      if (droppedFile.name.toLocaleLowerCase().endsWith('.coff')) {
        //import xml
        const newSnippets: Snippet[] = this.parser.parse(read.result.toString());
        newSnippets.forEach(snippet => this.service.addSnippet(snippet));
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
