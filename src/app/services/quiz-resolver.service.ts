import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { Quiz } from '../models/quiz';

@Injectable()
export class QuizResolver implements Resolve<Quiz> {

  constructor(private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    const quizId = +route.params['quizId'];
    return Observable.of(null);  // @TODO
  }
}
