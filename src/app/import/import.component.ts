import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnippetService } from '../snippet.service';
import { ParseService } from '../parse.service';
import { ToastService } from '../toast.service';
import { Toast } from '../toast.enum';
import { RemoteImportService } from '../remote-import.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit{

  importedJson: string = '';
  importedXml: string = '';

  importedSnippets: string = '';

  constructor(private parser: ParseService, private service: SnippetService, private remoteImport: RemoteImportService, private toastService: ToastService, private router: Router) { }

  ngOnInit() {
    this.importedSnippets = this.remoteImport.getTextToImport();
  }

  save(): void {
    if (this.importedSnippets.startsWith('<')) {
      this.saveXml(this.importedSnippets);
    }
    else if (this.importedSnippets.startsWith('[') || this.importedSnippets.startsWith('{')) {
      this.saveJson(this.importedSnippets);
    }
    else if (this.importedSnippets.length > 0) {
      this.toastService.push(Toast.IMPORT_FAILED);
    }
    this.back();
  }

  private saveJson(json: string): void {
    this.service.import(JSON.parse(json));
  }

  private saveXml(xml: string): void {
    this.service.import(this.parser.parse(xml));
  }

  back(): void {
    this.router.navigate(['']);
  }
}
