import { Component, OnInit, Input } from '@angular/core';
import { Snippet } from '../snippet';
import { SnippetService } from '../snippet.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-snippet-box',
  templateUrl: './snippet-box.component.html',
  styleUrls: ['./snippet-box.component.css']
})
export class SnippetBoxComponent implements OnInit {

  @Input() snippet: Snippet;
  
  constructor(private snippetService: SnippetService, private router: Router) {
  }

  ngOnInit() {
  }

  delete() {
    this.snippetService.deleteSnippet(this.snippet.id);
  }

  copy() {

  }

  export() {
    this.router.navigate(['/export', this.snippet.id])
  }

  clone() {

  }
}
