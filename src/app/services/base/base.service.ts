import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    protected http: HttpClient
  ) { 

  }

  public static Url(url: string): string {
    return environment.apiUrl + url;
  }

  public static Headers(): void {
    
  }

  public static BaseOptions() {
    
  }

  public static HandleError(errorResponse): void {
    
  }
}
