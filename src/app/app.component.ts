import { Component } from '@angular/core';
import { SnippetService } from './snippet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Snippet Storer';

  constructor(private service: SnippetService) {}


  doUnload(): void {
    this.service.saveSnippets();
  }
}
