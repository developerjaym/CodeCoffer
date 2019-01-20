import { Component, OnInit, OnDestroy } from '@angular/core';
import { SnippetService } from '../../services/snippet.service';
import { Router } from '@angular/router';
import { HotKeyService } from '../../services/hot-key.service';
import { HotKey } from '../../models/hot-key.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[];

  constructor(private hotKeyService: HotKeyService, private snippetService: SnippetService, private router: Router) { }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit() {
    this.subscriptions = [];

    this.subscriptions.push(
      this.hotKeyService.pull().subscribe(hotKey => {
        switch (hotKey) {
          case HotKey.STYLE:
            this.style();
            break;
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
    );
  }

  save(): void {
    this.snippetService.saveSnippets();
  }

  download(): void {

  }

  style(): void {
    this.router.navigate(['/style'])
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
