import { Component, OnInit } from '@angular/core';
import { Snippet } from '../snippet';
import { SnippetService } from '../snippet.service';
import { map, tap, debounce, debounceTime } from 'rxjs/operators';
import { HotKeyService } from '../hot-key.service';
import { HotKey } from '../hot-key.enum';

@Component({
  selector: 'app-middle-panel',
  templateUrl: './middle-panel.component.html',
  styleUrls: ['./middle-panel.component.css']
})
export class MiddlePanelComponent implements OnInit {
  snippets: Snippet[];
  index: number;
  hasMoreSnippetsToLoad: boolean;

  constructor(private hotKeyService: HotKeyService, private snippetService: SnippetService) {
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

    this.hotKeyService.pull().subscribe(hotKey => {
      switch (hotKey) {
        case HotKey.CREATE_NEW_SNIPPET:
          this.addSnippet();
          break;
        case HotKey.VIEW_REMAINING_SNIPPETS:
          this.loadMoreSnippets();
          break;
        default:
          break;
      }
    })
  }

  addSnippet() {
    this.snippetService.addSnippet(new Snippet());
  }

  loadMoreSnippets() {
    this.snippetService.loadRemainingSnippets();
  }
}
