import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  public isAuthenticated: boolean;

  constructor(
    protected http: HttpClient
  ) {
    super(http);
  }

  authenticate(customerNum: string, optCode: string) {
    // return this.http.get(AuthService.Url('')).toPromise();
    return Promise.resolve({token: '558c7e73e929fe1d76c48677aa8b3dc0'});
  }
}
