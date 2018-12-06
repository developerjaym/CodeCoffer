import { Component, OnInit } from '@angular/core';
import { SnippetService } from '../snippet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {

  constructor(private snippetService: SnippetService, private router: Router) { }

  ngOnInit() {
  }

  save(): void {
    this.snippetService.saveSnippets();
  }

  download(): void {
    
  }

  load(): void {
    this.router.navigate(['/import'])
  }

  export(): void {
    this.router.navigate(['/export'])
  }

  about(): void {
    this.router.navigate(['/about'])
  }
}
