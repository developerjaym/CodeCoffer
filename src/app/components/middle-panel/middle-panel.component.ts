import { Component, OnInit, OnDestroy, Renderer2, ViewChild, ElementRef, ComponentRef } from '@angular/core';
import { Snippet } from '../../models/snippet';
import { SnippetService } from '../../services/snippet.service';
import { map, tap } from 'rxjs/operators';
import { HotKeyService } from '../../services/hot-key.service';
import { HotKey } from '../../models/hot-key.enum';
import { Subscription } from 'rxjs';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-middle-panel',
  templateUrl: './middle-panel.component.html',
  styleUrls: ['./middle-panel.component.css'],
})
export class MiddlePanelComponent implements OnInit, OnDestroy {
  snippets: Snippet[];
  index: number;
  lastTop: string = '';
  hasMoreSnippetsToLoad: boolean;

  isEditable: boolean = false;

  private subscriptions: Subscription[];

  constructor(
    private hotKeyService: HotKeyService,
    private snippetService: SnippetService,
    private settingsService: SettingsService,
    private node: ElementRef
  ) {}

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit() {
    this.subscriptions = [];

    this.isEditable = this.settingsService.isEditable();

    this.subscriptions.push(
      this.snippetService
        .getSnippetList()
        .pipe(
          map((snippets) => snippets.filter((snippet) => snippet.showing)),
          tap((snippetList) => (this.snippets = snippetList)),
          map((snippetList) => snippetList.length),
          tap((length) => (this.hasMoreSnippetsToLoad = this.snippetService.hasMoreSnippets(length))),
          tap((length) => (this.index = length))
        )
        .subscribe((length) => {
          // Scroll to the top of the component when something different is at the top
          // This is usually when a new snippet is added or a search is completed or a pinned snippet is selected
          if (length > 0 && this.lastTop !== this.snippets[0].id) {
            this.node.nativeElement.scrollTo(0, 0);
          }
          this.lastTop = length > 0 ? this.snippets[0].id : '';
        }),

      this.hotKeyService.pull().subscribe((hotKey) => {
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
