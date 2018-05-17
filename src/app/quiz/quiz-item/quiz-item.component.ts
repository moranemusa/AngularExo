import { Component, OnInit, Input } from '@angular/core';
import { Quiz } from '../../models/quiz';


@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  styles: []
})
export class QuizItemComponent implements OnInit {

  @Input() num: number;
  @Input() quiz: Quiz;
  constructor() { }

  ngOnInit() {
  }

}
