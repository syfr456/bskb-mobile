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

  getNasabah(userId: string) {
    return this.http.get(`${this.API_URL}/api/nasabah/${userId}`, { headers: this.service.getHeader() }) as Observable<ProfileModel>;
  }

  getDocSupport(userId: string) {
    return this.http.get(`${this.API_URL}/api/nasabah/document/${userId}`, { headers: this.service.getHeader() }) as Observable<any>;
  }

  updateUser(user: ProfileModel) {
    return this.http.put(`${this.API_URL}/api/user/${user.id}`, user, { headers: this.service.getHeader() });
  }

  updateNasabah(user: ProfileModel) {
    return this.http.put(`${this.API_URL}/api/nasabah/${user.id}`, user, { headers: this.service.getHeader() });
  }

  postNasabah(user: ProfileModel) {
    return this.http.post(`${this.API_URL}/api/nasabah`, user, { headers: this.service.getHeader() });
  }

  updateKtp(id: string, url: string) {
    return this.http.put(`${this.API_URL}/api/nasabah/upload-ktp/${id}`, { ktp: url }, { headers: this.service.getHeader() });
  }

  updateSktm(id: string, url: string, exp: string) {
    return this.http.put(`${this.API_URL}/api/nasabah/upload-sktm/${id}`, { sktm: url, sktm_expired: exp }, { headers: this.service.getHeader() });
  }
}
