import { Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DatashareService {
  exclusive = new Subject<boolean>();
  username = new BehaviorSubject<string>("Hemant");
  videoemit = new ReplaySubject<string>(5, 3000);
  constructor() {}

  print(val: any, cotainerId: string) {
    let el = document.createElement("li");
    el.innerHTML = val;

    document.getElementById(cotainerId)?.appendChild(el);
  }
}
