import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../models/quiz';
import { QuizService } from '../quiz.service';


@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styles: ['.jaune {background: yellow}']
})
export class QuizListComponent implements OnInit {

  quizList: Quiz[] = []; //undefined


  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.loadQuizzes().subscribe(data => this.quizList = data);

  }
 


}
