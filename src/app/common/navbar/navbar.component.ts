import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
interface NavItem {
  text: string;
  url: string;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  navItems: NavItem[] = [
    { text: 'Accueil', url: 'home' },
    { text: 'Quizzes', url: 'quizzes' },
    { text: 'Admin', url: 'admin' },
    { text: 'Login', url: 'login' }
  ];
  logo: string = "/assets/logo_superquiz.png";
  user: User = new User({ name: 'bob', email: 'mo@gmail.com' });
  constructor() { }

  ngOnInit() {
  }

}
