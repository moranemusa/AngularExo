import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Quiz } from '../../models/quiz';
import { QuizService } from '../../quiz/quiz.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html'
})
export class QuizFormComponent implements OnInit {

  quizForm: FormGroup;
  quizId: number; // id du quiz en cours d'édition

  constructor(private quizService: QuizService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    //Construit le formulaire toujours a vide
    this.quizForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(5)]],
      description: [],
      CanRetryQuestion: [],
    });
    //a-t-on un id de quiz dans l'url? (si oui edition)
    this.route.paramMap.subscribe(params => {
      this.quizId = +params.get('quizId');
      if (this.quizId) {//edition
        //charge le quiz depuis le backend
        this.quizService.loadQuiz(this.quizId).subscribe(quiz => {
          //met a jour le form avec le quiz qu'on vient de charger
          this.quizForm.patchValue(quiz)
        });
      } else {//creation

      }
    })
  }

  createQuiz() {
    //Recupere les données du formulaire
    const data = this.quizForm.value;
    // const titleQuiz = this.quizForm.get('title').value;
    // const descriptionQuiz = this.quizForm.get('description').value;
    // const tryQuiz = this.quizForm.get('CanRetryQuestion').value;

    //Créer une instance de quiz à partir des data form
    const quiz = new Quiz(data);
    quiz.id = this.quizId;
    //Enregistre le quiz dans la base de donnée  
    this.quizService.saveQuiz(quiz).subscribe(() => {
      //confirmation
      alert('quiz enregistré avec succés!');
      //Redirection sur la liste des quizzes
      this.router.navigate(['admin/quiz']);
    });

  }
}
