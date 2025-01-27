import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private token: string="";
  constructor(private authService: AuthService) {this.token = this.authService.getToken()!;}

  getHeaders(): HttpHeaders {
    if (!this.token) {
      throw new Error('Sin Autorización!');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

}
