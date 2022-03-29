import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../../services/routing.service';
import { Snippet } from '../../models/snippet';
import { RemoteImportService } from '../../services/remote-import.service';
import { SnippetService } from '../../services/snippet.service';

@Component({
  selector: 'app-import-helper',
  templateUrl: './import-helper.component.html',
  styleUrls: ['./import-helper.component.css']
})
export class ImportHelperComponent implements OnInit {
  newSnippets: SnippetImport[] = [];
  constructor(private remoteImport: RemoteImportService, private routingService: RoutingService, private service: SnippetService) { }

  ngOnInit(): void {
    const newSnippetsText = this.remoteImport.getTextToImport();
    if(newSnippetsText.startsWith("[")) {
      this.newSnippets = JSON.parse(newSnippetsText).map(snippet => new SnippetImport(snippet));
    }
    else {
      this.newSnippets = [JSON.parse(newSnippetsText)].map(snippet => new SnippetImport(snippet));
    }
  }

  save(): void {
    this.service.import(this.newSnippets.filter(snippetImport => snippetImport.checked).map(snippetImport => snippetImport.snippet));
    this.back();
  }

  back(): void {
    this.routingService.goHome();
  }
}

class SnippetImport {
  checked: boolean;
  expanded: boolean;
  snippet: Snippet;
  constructor(snippet) {
    this.snippet = snippet;
    this.checked = true;
    this.expanded = false;
  }
}
