import { DatashareService } from './../../datashare.service';
import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.scss'],
})
export class Comp1Component implements OnInit {
  username: string = '';
  constructor(private datashareService: DatashareService) {}

  ngOnInit(): void {
    this.datashareService.username.subscribe((res) => (this.username = res));
  }
  onChange(obj: any): void {
    let val = obj.value;
    this.datashareService.username.next(val);
  }
  typing(obj: any): void {
    console.log(obj.value);
    let val = obj.value;
    this.username = val;
  }
}
