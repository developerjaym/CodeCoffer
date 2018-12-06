import { Component, OnInit } from '@angular/core';
import { SearchParameters } from '../searchParameters';
import { SnippetService } from '../snippet.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  searchParameters: SearchParameters;

  constructor(private snippetService: SnippetService) {
    this.searchParameters = new SearchParameters();
  }

  ngOnInit() {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.snippetService.search(term, this.searchParameters);
  }
}
