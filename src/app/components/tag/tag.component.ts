import { Component, Input } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent {

  @Input("tag")
  tag: string;

  constructor(private searchService: SearchService) { }

  onClick(): void {
    const searchParameters = {
      tags: true,
      title: false,
      notes: false,
      code: false,
      query: this.tag
    };
    this.searchService.search(searchParameters, false);
  }

}
