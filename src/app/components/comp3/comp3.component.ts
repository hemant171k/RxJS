import { DatashareService } from './../../datashare.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comp3',
  templateUrl: './comp3.component.html',
  styleUrls: ['./comp3.component.scss'],
})
export class Comp3Component implements OnInit {
  username: string = '';
  constructor(private dataShareService: DatashareService) {}

  ngOnInit(): void {
    this.dataShareService.username.subscribe((res) => (this.username = res));
  }
  KeyUp(obj: any): void {
    this.username = obj.value;
  }
  onChange(obj: any): void {
    this.dataShareService.username.next(obj.value);
  }
}
