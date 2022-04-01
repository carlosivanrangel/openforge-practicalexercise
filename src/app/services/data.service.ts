import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

export interface UserList {
  login: string;
  id: number;
  avatar_url: string;
}

export interface User {
  id: number;
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  company: string;
  location: string;
  blog: string;
  public_repos: number;
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  public getUsers(since: number, per_page: number) {
    return this.httpClient.get<Array<UserList>>("api/users?since="+ since.toString() 
    +"&per_page=" + per_page.toString() + "&accept=application/vnd.github.v3+json");
  }

  public getUserByUsername(username: string) {
    return this.httpClient.get<User>("api/users/" + username + "?accept=application/vnd.github.v3+json",);
  }

}
