import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { HomeComponent } from './common/home/home.component';
import { FooterComponent } from './common/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { QuizModule } from './quiz/quiz.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './common/login/login.component';
import { QuizListComponent } from './quiz/quiz-list/quiz-list.component';
import { QuizPlayerComponent } from './quiz/quiz-player/quiz-player.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  // Routes de l'application
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  declarations: [AppComponent, NavbarComponent, HomeComponent, FooterComponent, LoginComponent],
  imports: [BrowserModule, QuizModule, RouterModule.forRoot(routes), HttpClientModule],
  providers: [{ provide: 'JSON_SERVER_URL', useValue: 'http://localhost:3004'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
