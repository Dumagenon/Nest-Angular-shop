import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit() {
    // if (this.auth.isAuth()) {
    //   this.auth.verifyAuth().subscribe(
    //     () => console.log('Valid auth credential'),
    //     async (err) => {
    //       await this.auth.logout();
    //       console.log(err.message);
    //     },
    //   );
    // }
  }
}
