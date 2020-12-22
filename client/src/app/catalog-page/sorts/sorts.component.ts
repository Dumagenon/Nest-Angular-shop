import { Component, DoCheck, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-sorts',
  templateUrl: './sorts.component.html',
  styleUrls: ['./sorts.component.scss'],
})
export class SortsComponent {
  @Input() setSelectOption: any;

  sorts: any = [
    { value: 8, label: '8' },
    { value: 12, label: '12' },
    { value: 16, label: '16' },
  ];

  orders: any = [
    { value: 'asc', label: 'Price: Low to High' },
    { value: 'desc', label: 'Price: High to Low' },
  ];
}
