import { Quiz } from '../models/quiz';

export const QUIZZES: Quiz[] = [
  new Quiz({
    'id': 32,
    'title': 'Quiz Angular 2 (général)',
    'description': 'Questions d\'ordre général sur le framework Angular 2.',
    'questions': [
      {
        'id': 12,
        'title': 'En quelle année AngularJS (première version) est-il sorti ?',
        'choices': [
          { 'text': '2008'},
          { 'text': '2009', 'isCorrect': true },
          { 'text': '2012'},
          { 'text': '2014'}
        ],
        'explanation': 'La version de 2009 est celle développé initialement par Miško Hevery, qui ne travaillait pas encore chez Google.'
      },
      {
        'id': 24,
        'title': 'Quels langages de programmation sont supportés par Angular ?',
        'choices': [
          { 'text': 'JavaScript', 'isCorrect': true },
          { 'text': 'TypeScript', 'isCorrect': true },
          { 'text': 'VBScript'},
          { 'text': 'PHP'},
          { 'text': 'Python'},
          { 'text': 'Dart', 'isCorrect': true }
        ],
        'explanation': 'Même si plusieurs langages sont supportés, le plus utilisé et de loin est TypeScript.'
      },
      {
        'id': 35,
        'title': 'Angular est vraiment trop canon.',
        'choices': [
          { 'text': 'Vrai', 'isCorrect': true },
          { 'text': 'Faux'}
        ],
        'explanation': 'À ce stade, comment ne pas en être persuadé ? 😝'
      }
    ]
  }),
  new Quiz({
    'id': 99,
    'title': 'Quiz TypeScript',
    'description': 'Connaissez-vous vraiment le langage TypeScript ?'
  }),
  new Quiz({
    'id': 568,
    'title': 'Quiz Module',
    'description': 'Que sont les modules Angular et à quoi servent-ils ?'
  }),
  new Quiz({
    'id': 37,
    'title': 'Capitales européennes',
    'description': 'Testez vos connaissances en géographie grâce à ce quiz endiablé.'
  }),
  new Quiz({
    'id': 500,
    'title': 'Séries TV',
    'description': 'Alors comme ça Game of Thrones n\'a pas de secrets pour vous ?'
  })
];
