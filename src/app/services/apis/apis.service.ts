import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApisService extends BaseService {
  public apiData: any;
  public photos = [];
  public audioFiles: Array<object> = [];

  constructor(
    protected http: HttpClient
  ) {
    super(http);
  }

  getData() {
    return this.http.get(environment.apiUrl).toPromise();
  }

}
