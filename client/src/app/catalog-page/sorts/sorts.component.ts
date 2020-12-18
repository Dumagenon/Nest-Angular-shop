import {
  Component,
  DoCheck,
  Input, OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-sorts',
  templateUrl: './sorts.component.html',
  styleUrls: ['./sorts.component.scss'],
})
export class SortsComponent {
  @Input() setSelectOption: any;
}
