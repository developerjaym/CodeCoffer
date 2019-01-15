import { Component, OnInit, Input } from '@angular/core';
import { Snippet } from '../snippet';
import { SnippetService } from '../snippet.service';
import { Router } from '@angular/router';
import { CopyService } from '../copy.service';
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

  clone() {

  }
}
