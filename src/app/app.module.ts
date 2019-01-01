import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { MiddlePanelComponent } from './middle-panel/middle-panel.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SnippetBoxComponent } from './snippet-box/snippet-box.component';
import { SnippetService } from './snippet.service';
import { StorageService } from './storage.service';
import { ParseService } from './parse.service';
import { AboutComponent } from './about/about.component';
import { ExportComponent } from './export/export.component';
import { ImportComponent } from './import/import.component';
import { HomeComponent } from './home/home.component';
import { FiledragDirective } from './filedrag.directive';
import { StrikeThroughBoxComponent } from './strike-through-box/strike-through-box.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { HotKeyService } from './hot-key.service';
import { ExportGuardService } from './export-guard.service';
import { FocusDirective } from './focus.directive';
import { ToastComponent } from './toast/toast.component';
import { ToastService } from './toast.service';
import { CopyService } from './copy.service';
import { DownloadService } from './download.service';
import { TitleComponent } from './title/title.component';
import { StyleService } from './style.service';
import { StyleEditorComponent } from './style-editor/style-editor.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'export/:snippetId', component: ExportComponent, canActivate: [ExportGuardService] },
  { path: 'export', component: ExportComponent },
  { path: 'import', component: ImportComponent },
  { path: 'style', component: StyleEditorComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [AppComponent, AboutComponent, ExportComponent, ImportComponent, HomeComponent, SidePanelComponent, 
    MiddlePanelComponent, SearchBoxComponent, SnippetBoxComponent, HomeComponent, FiledragDirective, StrikeThroughBoxComponent,
     CodeEditorComponent, FocusDirective, StyleEditorComponent, ToastComponent, TitleComponent],
  imports: [BrowserModule, CommonModule, FormsModule, RouterModule.forRoot(
    appRoutes,
    {
      enableTracing: false, // <-- debugging purposes only
      useHash: true
    }
  ),
  ],
  providers: [CopyService, DownloadService, ExportGuardService, HotKeyService, ParseService, SnippetService, StorageService, StyleService, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
