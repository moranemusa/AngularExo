import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PageAdminComponent } from './page-admin/page-admin.component';
import { AdminQuizListComponent } from './admin-quiz-list/admin-quiz-list.component';
import { QuizFormComponent } from './quiz-form/quiz-form.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionFormComponent } from './question-form/question-form.component';

import { ObservablesComponent } from './observables/observables.component';

import { FakeQuizService } from './fake-quiz.service';

const routes: Routes = [
  {
    path: '',
    component: PageAdminComponent,
    children: [
      { path: '', redirectTo: 'quiz', pathMatch: 'full' },
      { path: 'quiz', component: AdminQuizListComponent },
      { path: 'quiz/new', component: QuizFormComponent },
      { path: 'quiz/:quizId', component: QuizFormComponent },
      { path: 'quiz/:quizId/questions', component: QuestionsListComponent },
    ]
  },
  { path: 'obs', component: ObservablesComponent }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [
    PageAdminComponent,
    AdminQuizListComponent,
    QuizFormComponent,
    QuestionsListComponent,
    QuestionFormComponent,
    ObservablesComponent
  ],
  providers: [
    FakeQuizService
  ]
})
export class AdminModule { }
