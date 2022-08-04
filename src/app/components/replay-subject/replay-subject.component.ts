import { DatashareService } from './../../datashare.service';
import { Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-replay-subject',
  templateUrl: './replay-subject.component.html',
  styleUrls: ['./replay-subject.component.scss'],
})
export class ReplaySubjectComponent implements OnInit {
  userList1: any = ['Angular 1', 'Angular 2'];
  userList2: any = [];
  userList3: any = [];

  subscribeMode2: boolean = true;
  subscribeMode3: boolean = true;

  // subscription
  intSubscription: Subscription | undefined;
  subscription2: Subscription | undefined;
  subscription3: Subscription | undefined;

  showAddButton: boolean = true;
  constructor(private DatashareService: DatashareService) {}

  ngOnInit(): void {
    this.DatashareService.videoemit.subscribe((res) =>
      this.userList1.push(res)
    );
  }
  //video add method
  onVideoAdd(obj: any): void {
    this.DatashareService.videoemit.next(obj.value);
    obj.value = '';
  }

  //show hide add video button
  toggleButton(): void {
    const broadcastVideo = interval(1000);
    if (this.showAddButton) {
      this.intSubscription = broadcastVideo.subscribe((res) =>
        this.DatashareService.videoemit.next(`video ${res}`)
      );
    } else {
      this.intSubscription?.unsubscribe();
    }

    this.showAddButton = !this.showAddButton;
  }

  //change subscribe 2 mode
  changeSubscribe2Mode(): void {
    console.log('this.subscription2', this.subscribeMode2);
    if (!this.subscribeMode2) {
      this.subscription2?.unsubscribe();
    } else {
      console.log('success else', this.subscription2);
      this.subscription2 = this.DatashareService.videoemit.subscribe((res) =>
        this.userList2.push(res)
      );
    }
    this.subscribeMode2 = !this.subscribeMode2;
  }
  //change subscribe 3 mode
  changeSubscribe3Mode(): void {
    this.subscribeMode3 = !this.subscribeMode3;
  }
}
