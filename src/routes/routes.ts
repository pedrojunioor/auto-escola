import { PageNotFound } from '../pages/PageNotFound/PageNotFound'
import { Home } from '../pages/Home/Home'
import { Students } from '../pages/Students/Students'
import { Questions } from '../pages/Questions/Questions';
import { Simulado } from '../pages/Simulado/Simulado';
import { SiGooglescholar } from 'react-icons/si';

export const routes = {
  adminRoutes: [
    { path: '/home', name: 'Home', icon: SiGooglescholar, element: Home },
    { path: '/alunos', name: 'Alunos', icon: SiGooglescholar, element: Students },
    { path: '/questoes', name: 'Questoes', icon: SiGooglescholar, element: Questions },
    { path: '/simulado', name: 'Simulado', icon: SiGooglescholar, element: Simulado }
  ],
  alunoRoutes: [
    { path: '/home', name: 'Home', icon: SiGooglescholar, element: Home },
    { path: '/simulado', name: 'Simulado', icon: SiGooglescholar, element: Simulado }
  ]
}
