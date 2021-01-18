import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  isOpen = false;

  @ViewChild('toggleButton') private toggleButton!: ElementRef;
  @ViewChild('cart') private cart!: ElementRef;

  @HostListener('document:click', ['$event'])
  clickOut(e: Event) {
    if (
      !this.toggleButton.nativeElement.contains(e.target) &&
      !this.cart.nativeElement.contains(e.target)
    ) {
      this.isOpen = false;
    }
  }

  clickOnCart() {
    this.isOpen = !this.isOpen;
  }
}
