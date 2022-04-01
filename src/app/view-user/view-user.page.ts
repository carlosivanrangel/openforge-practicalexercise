import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, User } from '../services/data.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.page.html',
  styleUrls: ['./view-user.page.scss'],
})
export class ViewUserPage implements OnInit {
  public user: User;
  public userName: string = "";
  public usernameTextColor: string = "black";

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
    const username = this.activatedRoute.snapshot.paramMap.get('username');
    if (username !== "search") {
      this.getUser(username);
    }
  }

  getUser(username) {
    this.data.getUserByUsername(username).subscribe(data => {
      this.user = data;
      this.userName = this.user.login;
      if(this.user.public_repos > 2){
        this.usernameTextColor = "red";
      }else{
        this.usernameTextColor = "black";
      }
    }, error => {
      console.log(error);
    })
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Users List' : '';
  }

  searchUser() {
    if (this.userName.length > 0) {
      this.getUser(this.userName);
    }
  }

  searchUrlOnBrowser() {
    if(this.user.blog){
      this.iab.create(this.user.blog, '_system');
    }
  }

}
