import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SnippetService } from '../snippet.service';
import { map, tap } from 'rxjs/operators';
import { CopyService } from '../copy.service';
import { DownloadService } from '../download.service';
import { RemoteImportService } from '../remote-import.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  @ViewChild("downloadButton")
  downloadButton: ElementRef;

  exportedJson: string;
  remoteUrl: string;
  loading: boolean = false;

  constructor(private copyService: CopyService, 
    private downloadService: DownloadService, 
    private service: SnippetService, 
    private remoteService: RemoteImportService,
    private router: Router, 
    private renderer: Renderer2,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loading = false;
    this.remoteUrl = '';
    this.activatedRoute.params
    .pipe(
      map(params => params['snippetId'])
    )
    .subscribe(
      snippetId => {
        if (snippetId) {
          this.exportedJson = JSON.stringify(this.service.getSnippetById(snippetId), null, 2);
        }
        else {
          this.exportedJson = JSON.stringify(this.service.getAllSnippets(), null, 2);
        }
      }
    )
  }

  back(): void {
    this.router.navigate(['']);
  }

  copy(): void {
    if (this.remoteUrl) {
      this.copyService.copy(this.remoteUrl);
    }
    else {
      this.copyService.copy(this.exportedJson);
    }
    this.back();
  }

  exportRemotely(): void {
    this.loading = true;
    this.remoteUrl = null;
    this.remoteService.exportToServer(this.exportedJson)
    .pipe(
      tap(link => this.remoteUrl = link, (error) => this.remoteUrl = error)
    ).subscribe();
  }

  download(): void {
    this.downloadService.downloadAsFrom(
      this.exportedJson, 
      "CodeCoffer" + Date.now(), 
      this.downloadButton, this.renderer);
    this.back();
  }
}
