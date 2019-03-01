import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from './settings.service';
@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(
    private settingsService: SettingsService,
    private router: Router) { }


  goToExport(snippetId: string = null): void {
    this.router.navigate(this.generateCommands(['/export',
      snippetId]));
  }

  goToImport(): void {
    this.router.navigate(this.generateCommands(['/import']));
  }

  goToStyle(): void {
    this.router.navigate(this.generateCommands(['/style']));
  }

  goToAbout(): void {
    this.router.navigate(this.generateCommands(['/about']));
  }

  goHome(): void {
    this.router.navigate(this.generateCommands(['home']));
  }

  getHomeRoute(): string {
    return this.generateCommands(['home']).join('/');
  }

  private generateCommands(commands: string[]): string[] {
    commands.push(
      this.settingsService.getUser(),
      this.settingsService.getMode(),
      this.settingsService.getLocale());
    return commands.filter(Boolean);
  }
}
