import { Component, OnInit } from '@angular/core';
import { Answer } from '../../models/answer';
import { AnswersState, QuizStateManager } from './../quiz-state-manager.service';
import { QuizService } from './../quiz.service';
import { Quiz } from '../../models/quiz';
import { Question } from '../../models/question';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-player',
  templateUrl: './quiz-player.component.html',
  providers: [QuizStateManager],
  styles: []
})
export class QuizPlayerComponent implements OnInit {

  currentQuiz: Observable<Quiz>;
  currentQuestion: Observable<Question>;
  currentAnswer: Observable<Answer>;
  currentAnswers: Observable<AnswersState>;

  //Le quiz est-il démarré?
  isStarted = false;

  constructor(private quizService: QuizService, private quizStateManager: QuizStateManager, private route: ActivatedRoute) {

  }

  ngOnInit() {

    //on récupére les 4 observable fournit par QuizStateManager
    this.currentQuiz = this.quizStateManager.getCurrentQuiz();
    this.currentQuestion = this.quizStateManager.getCurrentQuestion();
    this.currentAnswer = this.quizStateManager.getCurrentAnswer();
    this.currentAnswers = this.quizStateManager.getCurrentAnswers();


    this.route.paramMap.subscribe(params => {
      //recupere l'id du quiz afficher dans l'url
      const quizId = +params.get('quizId');
      //Charge le quiz que l'utilisateur a cliqué
      const obs = this.quizService.loadQuiz(quizId);
      //pousse le quiz chargé dans l'observable 'currentQuiz'
      obs.subscribe(quiz => {this.quizStateManager.setQuiz(quiz)});
      

    });
  }

  validation(answer: Answer) {
    console.log(answer);
    //Sauvegarde la réponse dans le servcie QuizStateManager
    this.quizStateManager.addAnswer(answer);
  }
  gotoNextQuestion() {
    //utilise le QuizStateManager pour aller à la prochaine question
    this.quizStateManager.gotoNextQuestion();
  }

  gotoPreviousQuestion() {
    //utilise le QuizStateManager pour aller à la précédente question
    this.quizStateManager.gotoPreviousQuestion();
  }
  startQuiz() {
    this.isStarted = true;
    //utilise le QuizStateManager pour aller à la premiere qustion
    this.quizStateManager.gotoFirstQuestion();
  }
}
