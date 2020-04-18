import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ModelService } from './model.service';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ModelLoadedGuard implements CanActivate, CanActivateChild {
  constructor(private modelService: ModelService, private router: Router) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.modelService.model$.pipe(
      tap((model) => {
        if (!model) {
          this.router.navigate(['/home']);
        }
      }),
      map((model) => !!model)
    );
  }
}
