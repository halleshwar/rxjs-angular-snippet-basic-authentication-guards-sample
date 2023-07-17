import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { AuthService } from "./features/services/auth.service";

@Component({
  selector: "app-root",
  template: `
    <button
      routerLink="/admin"
      routerLinkActive="active"
      *ngIf="(authService.isLogged$ | async)"
    >
      Admin (Protected)
    </button>

    <button routerLink="/home" routerLinkActive="active">HOME</button>

    <button
      routerLink="/"
      *ngIf="!(authService.isLogged$ | async)"
      [routerLinkActiveOptions]="{ exact: true }"
      routerLinkActive="active"
    >
      Login
    </button>

    <button (click)="logout()" *appIfLogged>LOGOUT</button>

    <hr />
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .active {
        background: orange;
      }
    `
  ]
})
export class AppComponent {
  constructor(private router: Router, private authService: AuthService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(res => console.log(res));
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/");
  }
}
