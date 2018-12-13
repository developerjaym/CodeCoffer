import { Injectable } from '@angular/core';
import { SnippetService } from './snippet.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExportGuardService {

  constructor(private snippetService: SnippetService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return Boolean(this.snippetService.getSnippetById(route.params['snippetId']));
  }
}
