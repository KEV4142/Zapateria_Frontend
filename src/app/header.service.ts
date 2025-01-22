import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private authService: AuthService) {}

  getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Sin Autorización!');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
