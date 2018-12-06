import { Component, OnInit } from '@angular/core';
import { Snippet } from '../snippet';
import { SnippetService } from '../snippet.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-middle-panel',
  templateUrl: './middle-panel.component.html',
  styleUrls: ['./middle-panel.component.css']
})
export class MiddlePanelComponent implements OnInit {
  snippets: Snippet[];

  constructor(private snippetService: SnippetService) {
  }

  ngOnInit() {
    this.snippetService.getSnippetList().pipe(
      tap(console.log)
    ).subscribe(snippetList => this.snippets = snippetList);
  }

  addSnippet() {
    this.snippetService.addSnippet(new Snippet());
  }
}
