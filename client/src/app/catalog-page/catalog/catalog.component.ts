import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ProductPrice } from '../../../../../src/interfaces/product.interface';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent {
  @Input() products$: any;

  // @ViewChild('elsePrice', { static: true })
  // public elsePrice: TemplateRef<any>;

  isNumber(price: number | ProductPrice): boolean {
    return typeof price === 'number';
  }
}
