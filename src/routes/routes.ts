import { Home } from '../pages/Home/Home'
import { Alunos } from '../pages/Alunos/Alunos'
import { Questoes } from '../pages/Questoes/Questoes';
import { Simulado } from '../pages/Simulado/Simulado';
import { PageNotFound } from '../pages/PageNotFound/PageNotFound'
import { SiGooglescholar } from 'react-icons/si';

export const routes = {
  adminRoutes: [
    { path: '/home', name: 'Home', icon: SiGooglescholar, element: Home },
    { path: '/alunos', name: 'Alunos', icon: SiGooglescholar, element: Alunos },
    { path: '/questoes', name: 'Questoes', icon: SiGooglescholar, element: Questoes },
    { path: '/simulado', name: 'Simulado', icon: SiGooglescholar, element: Simulado }
  ],
  alunoRoutes: [
    { path: '/home', name: 'Home', icon: SiGooglescholar, element: Home },
    { path: '/simulado', name: 'Simulado', icon: SiGooglescholar, element: Simulado }
  ]
}
