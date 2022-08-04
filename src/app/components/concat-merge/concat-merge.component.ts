import { Component, OnInit } from '@angular/core';
import { concat, interval, map, Subscription, take } from 'rxjs';
import { DatashareService } from 'src/app/datashare.service';

@Component({
  selector: 'app-concat-merge',
  templateUrl: './concat-merge.component.html',
  styleUrls: ['./concat-merge.component.scss'],
})
export class ConcatMergeComponent implements OnInit {
  items: any = [];

  subscribeMode2: boolean = true;

  // subscription
  intSubscription: Subscription | undefined;
  subscription2: Subscription | undefined;

  showAddButton: boolean = true;
  constructor(private DatashareService: DatashareService) {}

  ngOnInit(): void {
    const sourceTech = interval(1000).pipe(
      map((v) => `video #${v}`),
      take(5)
    );
    const sourceComedy = interval(1000).pipe(
      map((v) => `video #${v}`),
      take(5)
    );
    const sourceNews = interval(1000).pipe(
      map((v) => `video #${v}`),
      take(5)
    );
    let concatObs = concat(sourceTech, sourceComedy, sourceNews);
    concatObs.subscribe((res) => (this.items = res));
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
}
