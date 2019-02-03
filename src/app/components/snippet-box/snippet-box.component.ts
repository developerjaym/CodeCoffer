import { Component, OnInit, Input } from '@angular/core';
import { Snippet } from '../../models/snippet';
import { SnippetService } from '../../services/snippet.service';
import { Router } from '@angular/router';
import { CopyService } from '../../services/copy.service';
import { Supplement } from '../../models/supplement';
@Component({
  selector: 'app-snippet-box',
  templateUrl: './snippet-box.component.html',
  styleUrls: ['./snippet-box.component.css']
})
export class SnippetBoxComponent implements OnInit {

  @Input() snippet: Snippet;

  constructor(private copyService: CopyService, private snippetService: SnippetService, private router: Router) {
  }

  ngOnInit() {
    this.snippet.supplements = this.snippet.supplements || [];
  }

  delete() {
    this.snippetService.deleteSnippet(this.snippet.id);
  }

  copy() {
    this.copyService.copy(this.snippet.code);
  }

  export() {
    this.router.navigate(['/export', this.snippet.id])
  }

  pin() {
    this.snippetService.pinSnippet(this.snippet.id);
  }

  unpin() {
    this.snippetService.unpinSnippet(this.snippet.id);
  }

  addSupplement(index: number) {
    this.snippet.supplements.splice(index+1, 0, new Supplement());
  }

  unsupplement(index: number) {
    this.snippet.supplements.splice(index, 1); //offset 1 because the first index of allSnippets is the main code/notes pair
  }

  clone() {

  }
}
