import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  constructor(private authService: AuthService, private router: Router) {
    this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
