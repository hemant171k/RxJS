import { DatashareService } from './../datashare.service';
import { Component, OnInit } from '@angular/core';
import { from, of, map, toArray, filter } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  dataArr = [
    {
      id: 1,
      name: 'Anup',
      gender: 'Male',
    },
    {
      id: 2,
      name: 'Priyanka',
      gender: 'Female',
    },
    {
      id: 3,
      name: 'Ashish',
      gender: 'Male',
    },
    {
      id: 4,
      name: 'Vivek',
      gender: 'Male',
    },
    {
      id: 5,
      name: 'Janet',
      gender: 'Female',
    },
    {
      id: 6,
      name: 'J.Mounika',
      gender: 'Female',
    },
    {
      id: 7,
      name: 'Rajesh',
      gender: 'Male',
    },
    {
      id: 8,
      name: 'Sanjana',
      gender: 'Female',
    },
    {
      id: 9,
      name: 'Neha',
      gender: 'Female',
    },
    {
      id: 10,
      name: 'ASHOK',
      gender: 'Female',
    },
    {
      id: 11,
      name: ' Sakshi',
      gender: 'Female',
    },
    {
      id: 12,
      name: 'Neeraj',
      gender: 'Male',
    },
  ];
  items: any = [];
  items2: any = [];
  items3: any = [];
  name: string = 'no name';
  exclusive: boolean = false;
  constructor(private datashareService: DatashareService) {}

  ngOnInit(): void {
    const source = from(this.dataArr);
    this.datashareService.username.subscribe((res) => {
      this.name = res;
    });
    //filter by length
    source
      .pipe(
        filter((obj) => obj.name.length > 6),
        toArray()
      )
      .subscribe((res) => {
        this.items = res;
      });

    //filter by Gender
    source
      .pipe(
        filter((obj) => obj.gender == 'Male'),
        toArray()
      )
      .subscribe((res) => {
        this.items2 = res;
      });

    //filter by Position
    source
      .pipe(
        filter((obj) => obj.id <= 3),
        toArray()
      )
      .subscribe((res) => {
        this.items2 = res;
      });

    this.datashareService.exclusive.subscribe((res) => {
      this.exclusive = res;
    });
  }

  showExclusive(): void {
    this.datashareService.exclusive.next(true);
  }
}
