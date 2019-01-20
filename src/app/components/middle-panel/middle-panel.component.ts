import { Component, OnInit, OnDestroy } from '@angular/core';
import { Snippet } from '../../models/snippet';
import { SnippetService } from '../../services/snippet.service';
import { map, tap } from 'rxjs/operators';
import { HotKeyService } from '../../services/hot-key.service';
import { HotKey } from '../../models/hot-key.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-middle-panel',
  templateUrl: './middle-panel.component.html',
  styleUrls: ['./middle-panel.component.css']
})
export class MiddlePanelComponent implements OnInit, OnDestroy {
  snippets: Snippet[];
  index: number;
  hasMoreSnippetsToLoad: boolean;

  private subscriptions: Subscription[];

  constructor(private hotKeyService: HotKeyService, private snippetService: SnippetService) {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit() {
    this.subscriptions = [];

    this.subscriptions.push(
      this.snippetService.getSnippetList()
        .pipe(
          map(snippets => snippets.filter(snippet => snippet.showing)),
          tap(snippetList => this.snippets = snippetList),
          map(snippetList => snippetList.length),
          tap(length => this.hasMoreSnippetsToLoad = this.snippetService.hasMoreSnippets(length)),
          tap(length => this.index = length)
        )
        .subscribe(),

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
    );
  }

  addSnippet() {
    this.snippetService.addSnippet(new Snippet());
  }

  loadMoreSnippets() {
    this.snippetService.loadRemainingSnippets();
  }
}
