import { Home } from '../pages/Home/Home'
import { Alunos } from '../pages/Alunos/Alunos'
import { PageNotFound } from '../pages/PageNotFound/PageNotFound'
import { SiGooglescholar } from 'react-icons/si';

export const routes = {
  adminRoutes: [
    { path: '/home', name: 'Home', icon: SiGooglescholar, element: Home },
    { path: '/alunos', name: 'Alunos', icon: SiGooglescholar, element: Alunos },
    { path: '/questoes', name: 'Questoes', icon: SiGooglescholar, element: PageNotFound }
  ],
  alunoRoutes: [
    { path: '/home', name: 'Home', icon: SiGooglescholar, element: Home },
    { path: '/simulado', name: 'Simulado', icon: SiGooglescholar, element: PageNotFound }
  ]
}
