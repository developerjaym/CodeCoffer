import { Component, OnInit, OnDestroy } from '@angular/core';
import { SnippetService } from '../snippet.service';
import { Observable, Subscription } from 'rxjs';
import { Snippet } from '../snippet';

@Component({
  selector: 'app-quick-links',
  templateUrl: './quick-links.component.html',
  styleUrls: ['./quick-links.component.css']
})
export class QuickLinksComponent implements OnInit, OnDestroy {

  pinnedSnippets: Snippet[];

  private subscriptions: Subscription[] = [];

  constructor(private service: SnippetService) { }

  ngOnInit() {
    this.subscriptions.push(this.service.getPinnedSnippets().subscribe(snippets => this.pinnedSnippets = snippets));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  unpinSnippet(id: string) {
    this.service.unpinSnippet(id);
  }

  selectSnippet(id: string) {
    this.service.onPinnedSnippetSelected(id);
  }
}
