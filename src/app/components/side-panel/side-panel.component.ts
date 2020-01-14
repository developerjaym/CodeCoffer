import { Component, OnInit, OnDestroy } from '@angular/core';
import { SnippetService } from '../../services/snippet.service';
import { HotKeyService } from '../../services/hot-key.service';
import { HotKey } from '../../models/hot-key.enum';
import { Subscription } from 'rxjs';
import { SettingsService } from '../../services/settings.service';
import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit, OnDestroy {
  isEditable: boolean = true;

  private subscriptions: Subscription[];

  constructor(
    private hotKeyService: HotKeyService,
    private snippetService: SnippetService,
    private routingService: RoutingService,
    private settingsService: SettingsService
  ) {}

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit() {
    this.subscriptions = [];

    this.isEditable = this.settingsService.isEditable();

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

  download(): void {}

  style(): void {
    this.routingService.goToStyle();
  }

  load(): void {
    this.routingService.goToImport();
  }

  export(): void {
    this.routingService.goToExport();
  }

  about(): void {
    this.routingService.goToAbout();
  }
}
