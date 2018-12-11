import { Component, OnInit } from '@angular/core';
import { Snippet } from '../snippet';
import { SnippetService } from '../snippet.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-middle-panel',
  templateUrl: './middle-panel.component.html',
  styleUrls: ['./middle-panel.component.css']
})
export class MiddlePanelComponent implements OnInit {
  snippets: Snippet[];
  index: number;
  hasMoreSnippetsToLoad: boolean;

  constructor(private snippetService: SnippetService) {
  }

  ngOnInit() {
    this.snippetService.getSnippetList()
    .pipe(
      tap(snippetList => this.snippets = snippetList),
      map(snippetList => snippetList.length),
      tap(length => this.hasMoreSnippetsToLoad = this.snippetService.hasMoreSnippets(length)),
      tap(length => this.index = length)
    )
    .subscribe();
  }

  addSnippet() {
    this.snippetService.addSnippet(new Snippet());
  }

  loadMoreSnippets() {
    this.snippetService.loadRemainingSnippets();
  }
}
