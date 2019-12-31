import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { SearchParameters } from '../../models/searchParameters';
import { HotKeyService } from '../../services/hot-key.service';
import { HotKey } from '../../models/hot-key.enum';
import { Subscription } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  searchParameters: SearchParameters;

  @ViewChild('searchBox', { static: false })
  searchBox: ElementRef;

  freshlyLoaded: boolean;
  private subscriptions: Subscription[];

  constructor(private hotKeyService: HotKeyService, private searchService: SearchService) {
    this.searchParameters = new SearchParameters();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit() {
    this.subscriptions = [];
    this.freshlyLoaded = true;
    this.subscriptions.push(
      this.searchService
        .getSearchParameters()
        .subscribe(searchParameters => (this.searchParameters = searchParameters)),

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
  }

  focusSearch(): void {
    this.searchBox.nativeElement.focus();
  }

  search(): void {
    if (!this.freshlyLoaded) {
      this.searchService.search(this.searchParameters);
    }
    this.freshlyLoaded = false;
  }
}
