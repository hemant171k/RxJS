import { Component, OnInit } from "@angular/core";
import {
  concat,
  from,
  interval,
  map,
  merge,
  mergeMap,
  of,
  Subscription,
  take,
  toArray,
} from "rxjs";
import { DatashareService } from "src/app/datashare.service";

@Component({
  selector: "app-concat-merge",
  templateUrl: "./concat-merge.component.html",
  styleUrls: ["./concat-merge.component.scss"],
})
export class ConcatMergeComponent implements OnInit {
  items: any = [];
  concatItems: any = [];
  sourceTechFeeds: any = [];
  sourceComedyFeeds: any = [];
  sourceNewsFeeds: any = [];

  subscribeMode2: boolean = true;

  // subscription
  intSubscription: Subscription | undefined;
  subscription2: Subscription | undefined;

  showAddButton: boolean = true;
  constructor(private DatashareService: DatashareService) {}

  ngOnInit(): void {
    const sourceTech = interval(1000).pipe(
      map((v) => `Video #${v + 1}`),
      take(5)
    );
    const sourceComedy = interval(1000).pipe(
      map((v) => `Comedy #${v + 1}`),
      take(6)
    );
    const sourceNews = interval(1000).pipe(
      map((v) => `News #${v + 1}`),
      take(3)
    );

    //sourceTech.subscribe((res) => (this.sourceTechFeeds = res));
    // sourceComedy.subscribe((res) => (this.sourceComedyFeeds = res));
    // sourceNews.subscribe((res) => (this.sourceNewsFeeds = res));

    let concatObs = concat(sourceTech, sourceComedy, sourceNews);
    // concatObs.subscribe((res) => this.items.push(res));

    let concatObsMerge = merge(sourceTech, sourceComedy, sourceNews);
    // concatObsMerge.subscribe((res) => this.concatItems.push(res));  // commented but its wokring

    //********################################ MERGE MAP ******************************** */
    let source = from(["Tech", "Comdedy", "News"]);
    source
      .pipe(mergeMap((res) => this.getData(res)))
      .subscribe((res) => console.log(res));
  }

  getData(data: any): any {
    return of(`${data} Video Uploaded Successfully`);
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
