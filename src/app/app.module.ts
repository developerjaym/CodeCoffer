import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { MiddlePanelComponent } from './components/middle-panel/middle-panel.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SnippetBoxComponent } from './components/snippet-box/snippet-box.component';
import { SnippetService } from './services/snippet.service';
import { StorageService } from './services/storage.service';
import { ParseService } from './services/parse.service';
import { AboutComponent } from './components/about/about.component';
import { ExportComponent } from './components/export/export.component';
import { ImportComponent } from './components/import/import.component';
import { HomeComponent } from './components/home/home.component';
import { FiledragDirective } from './directives/filedrag.directive';
import { StrikeThroughBoxComponent } from './components/strike-through-box/strike-through-box.component';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { HotKeyService } from './services/hot-key.service';
import { ExportGuardService } from './services/export-guard.service';
import { FocusDirective } from './directives/focus.directive';
import { ToastComponent } from './components/toast/toast.component';
import { ToastService } from './services/toast.service';
import { CopyService } from './services/copy.service';
import { DownloadService } from './services/download.service';
import { TitleComponent } from './components/title/title.component';
import { StyleService } from './services/style.service';
import { StyleEditorComponent } from './components/style-editor/style-editor.component';
import { QuickLinksComponent } from './components/quick-links/quick-links.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { ImportGuardService } from './services/import-guard.service';
import { RemoteImportService } from './services/remote-import.service';
import { HttpClientModule } from '@angular/common/http';
import { SvgButtonComponent } from './components/svg-button/svg-button.component';
import { SvgService } from './services/svg.service';
import { ExpandingTextareaComponent } from './components/expanding-textarea/expanding-textarea.component';
import { TagComponent } from './components/tag/tag.component';
import { EditableTagsAreaComponent } from './components/editable-tags-area/editable-tags-area.component';
import { TableOfContentsComponent } from './components/table-of-contents/table-of-contents.component';
import { SortService } from './services/sort.service';
import { SearchService } from './services/search.service';
import { SettingsService } from './services/settings.service';
import { RouteGuardService } from './services/route-guard.service';
import { RoutingService } from './services/routing.service';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'export/:snippetId', component: ExportComponent, canActivate: [ExportGuardService, RouteGuardService] },
  { path: 'export', component: ExportComponent, canActivate: [RouteGuardService] },
  { path: 'import/:conversationId', component: ImportComponent, canActivate: [ImportGuardService, RouteGuardService] },
  { path: 'import', component: ImportComponent, canActivate: [RouteGuardService] },
  { path: 'style', component: StyleEditorComponent, canActivate: [RouteGuardService] },
  { path: 'export/:snippetId', component: ExportComponent, canActivate: [ExportGuardService, RouteGuardService] },
  { path: 'contents', component: TableOfContentsComponent }, //<-- for debugging only

  { path: 'home/:user/:mode/:locale', component: HomeComponent, canActivate: [RouteGuardService] },

  {
    path: 'export/:snippetId/:user/:mode/:locale',
    component: ExportComponent,
    canActivate: [ExportGuardService, RouteGuardService]
  },
  { path: 'export/:user/:mode/:locale', component: ExportComponent, canActivate: [RouteGuardService] },
  {
    path: 'import/:conversationId/:user/:mode/:locale',
    component: ImportComponent,
    canActivate: [ImportGuardService, RouteGuardService]
  },
  { path: 'import/:user/:mode/:locale', component: ImportComponent, canActivate: [RouteGuardService] },
  { path: 'style/:user/:mode/:locale', component: StyleEditorComponent, canActivate: [RouteGuardService] },

  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ExportComponent,
    ImportComponent,
    HomeComponent,
    SidePanelComponent,
    MiddlePanelComponent,
    SearchBoxComponent,
    SnippetBoxComponent,
    HomeComponent,
    FiledragDirective,
    StrikeThroughBoxComponent,
    CodeEditorComponent,
    FocusDirective,
    StyleEditorComponent,
    ToastComponent,
    TitleComponent,
    QuickLinksComponent,
    LanguageSelectorComponent,
    SvgButtonComponent,
    ExpandingTextareaComponent,
    TagComponent,
    EditableTagsAreaComponent,
    TableOfContentsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      enableTracing: false, // <-- debugging purposes only
      useHash: true
    })
  ],
  providers: [
    CopyService,
    DownloadService,
    ExportGuardService,
    HotKeyService,
    ImportGuardService,
    RouteGuardService,
    ParseService,
    RemoteImportService,
    RoutingService,
    SearchService,
    SettingsService,
    SnippetService,
    SortService,
    StorageService,
    StyleService,
    SvgService,
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
