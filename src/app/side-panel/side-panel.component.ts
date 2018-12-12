import { Component, OnInit } from '@angular/core';
import { SnippetService } from '../snippet.service';
import { Router } from '@angular/router';
import { HotKeyService } from '../hot-key.service';
import { HotKey } from '../hot-key.enum';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {

  constructor(private hotKeyService: HotKeyService, private snippetService: SnippetService, private router: Router) { }

  ngOnInit() {
    this.hotKeyService.pull().subscribe(hotKey => {
      switch (hotKey) {
        case HotKey.SAVE:
          this.save();
          break;
        case HotKey.IMPORT:
          this.load();
          break;
        case HotKey.EXPORT:
          this.export();
          break;
        default:
          break;
      }
    })
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
