import { Component, OnInit, ElementRef, ViewChild, OnDestroy, Renderer2 } from '@angular/core';
import { SearchParameters } from '../searchParameters';
import { SnippetService } from '../snippet.service';
import { HotKeyService } from '../hot-key.service';
import { HotKey } from '../hot-key.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  searchParameters: SearchParameters;

  @ViewChild('searchBox')
  searchBox: ElementRef;

  freshlyLoaded: boolean;
  private subscriptions: Subscription[];

  constructor(private hotKeyService: HotKeyService, 
    private snippetService: SnippetService,
    private renderer: Renderer2) {
    this.searchParameters = new SearchParameters();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit() {
    this.subscriptions = [];
    this.freshlyLoaded = true;
    this.subscriptions.push(
      this.hotKeyService.pull().subscribe(hotKey => {
        switch (hotKey) {
          case HotKey.SEARCH:
            this.focusSearch();
            break;
          default:
            break;
        }
      })
    );

    this.renderer.setAttribute(this.searchBox.nativeElement, 'value', 'test');
  }

  focusSearch(): void {
    this.searchBox.nativeElement.focus();
  }

  search(term: string): void {
    if (!this.freshlyLoaded) {
      this.snippetService.search(term, this.searchParameters);
    }
    this.freshlyLoaded = false;
  }
}
