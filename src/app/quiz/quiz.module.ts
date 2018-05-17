import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizNavComponent } from './quiz-nav/quiz-nav.component';
import { QuizQuestionComponent } from './quiz-question/quiz-question.component';
import { QuizItemComponent } from './quiz-item/quiz-item.component';
import { QuizPlayerComponent } from './quiz-player/quiz-player.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizService } from './quiz.service';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'quizzes', component: QuizListComponent },
  { path: 'quiz/:quizId', component: QuizPlayerComponent }
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  declarations: [QuizListComponent, QuizQuestionComponent, QuizItemComponent, QuizPlayerComponent, QuizNavComponent],
  providers: [QuizService],
  exports: [QuizPlayerComponent]
})
export class QuizModule { }
