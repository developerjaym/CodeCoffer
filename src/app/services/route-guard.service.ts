import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Mode } from '../models/mode.enum';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {
  constructor(private settingsService: SettingsService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    this.settingsService.setFrom(route.params);
    if (this.settingsService.getMode() === Mode.EDITOR) {
      //TODO do real auth
      return true;
    }
    return true;
  }
}
