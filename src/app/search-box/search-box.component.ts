import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SearchParameters } from '../searchParameters';
import { SnippetService } from '../snippet.service';
import { HotKeyService } from '../hot-key.service';
import { HotKey } from '../hot-key.enum';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  searchParameters: SearchParameters;

  @ViewChild('searchBox')
  searchBox: ElementRef;

  constructor(private hotKeyService: HotKeyService, private snippetService: SnippetService) {
    this.searchParameters = new SearchParameters();
  }

  ngOnInit() {
    this.hotKeyService.pull().subscribe(hotKey => {
      switch (hotKey) {
        case HotKey.SEARCH:
          this.focusSearch();
          break;
        default:
          break;
      }
    })
  }

  focusSearch(): void {
    this.searchBox.nativeElement.focus();
  }

  search(term: string): void {
    this.snippetService.search(term, this.searchParameters);
  }
}
