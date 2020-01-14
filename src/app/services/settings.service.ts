import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Mode } from '../models/mode.enum';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private mode: Mode = Mode.PERSONAL;
  private locale: string;
  private user: string;

  constructor() {}

  setFrom(params: Params): void {
    this.mode = SettingsService.getMode(params);
    this.locale = params['locale'];
    this.user = params['user'];
  }

  getLocale(): string {
    return this.locale;
  }

  getUser(): string {
    return this.user;
  }

  getMode(): Mode {
    return this.mode;
  }

  isEditable(): boolean {
    return this.mode === Mode.PERSONAL || this.mode === Mode.EDITOR;
  }

  static getMode(params: Params): Mode {
    switch (params['mode']) {
      case Mode.DISPLAY:
        return Mode.DISPLAY;
      case Mode.EDITOR:
        return Mode.EDITOR;
      default:
        return Mode.PERSONAL;
    }
  }
}
