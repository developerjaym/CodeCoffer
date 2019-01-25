import { Component, Input } from '@angular/core';
import { SnippetService } from '../../services/snippet.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent {

  @Input("tag")
  tag: string;

  constructor(private snippetService: SnippetService) { }

  onClick(): void {
    const searchParameters = {
      tags: true,
      title: false,
      notes: false,
      code: false,
      query: this.tag
    };
    this.snippetService.search(searchParameters, false);
  }

}
