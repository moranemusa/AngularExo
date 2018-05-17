import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { Quiz } from '../../models/quiz';
import { FakeQuizService } from '../fake-quiz.service';

@Component({
  selector: 'app-admin-quiz-list',
  templateUrl: './admin-quiz-list.component.html'
})
export class AdminQuizListComponent implements OnInit {
  pageTitle = 'Admin - Liste des quizzes';
  quizzes: Quiz[] = [];

  constructor(title: Title,
              private qs: FakeQuizService) {
    title.setTitle(this.pageTitle);
  }

  ngOnInit() {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.qs.loadQuizzes()
      .subscribe(quizzes => this.quizzes = quizzes);
  }

  deleteQuiz(quiz: Quiz): boolean {
    // Delete the given quiz _AFTER_ user confirmation.
    this.showConfirmationModal()
      .subscribe({
        complete: () => this.qs.deleteQuiz(quiz.id).subscribe(() => this.loadQuizzes()),
        error: () => {}
      });

    return false;  // No action on the <button>
  }

  // Display a confirmation modal and return the corresponding observable.
  showConfirmationModal(): Observable<any> {
    return Observable.create(observer => {
      if (confirm('Êtes-vous certain de vouloir effacer ce quiz à tout jamais ?')) {
        observer.complete();
      } else {
        observer.error();
      }
    });
  }

}
