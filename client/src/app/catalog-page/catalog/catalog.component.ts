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

  @ViewChild('salePrice', { static: true })
  public salePrice: TemplateRef<any>;

  @ViewChild('cost', { static: true })
  public cost: TemplateRef<any>;

  getPriceTemplate(price: ProductPrice) {
    return price.newPrice ? this.salePrice : this.cost;
  }
}
