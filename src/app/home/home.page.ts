import { Component, ViewChild } from '@angular/core';
import { DataService, UserList } from '../services/data.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.getUsers(false, "");
  }

  users: UserList[] = []
  since: number = 1
  per_page: number = 15

  getUsers(isFirstLoad, event) {
    return this.data.getUsers(this.since, this.per_page).subscribe(data => {

      for (let i = 0; i < data.length; i++) {
        this.users.push(data[i]);
      }

      if (isFirstLoad){
        event.target.complete();
      }

      this.since = this.users[this.users.length - 1].id;

      if(this.users.length == 1000){
        event.target.disabled = true;
      }

    }, error => {
      console.log(error);
    })
  }

  doInfinite(event) {
    this.getUsers(true, event);
  }

}
