import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileModel } from 'src/app/model/profile.model';
import { ServiceService } from '../service.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  API_URL = 'https://bskbmobile.herokuapp.com';

  constructor(
    private http: HttpClient,
    private service: ServiceService
  ) { }

  getProfile(userId: string) {
    return this.http.get(`${this.API_URL}/api/profile/${userId}`, { headers: this.service.getHeader() }) as Observable<ProfileModel>;
  }

}
