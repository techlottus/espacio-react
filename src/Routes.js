import Dashboard from './flow/Dashboard'
import TermsShow from './layout/Terms/views/TermsShow'
export const routes = [
    {
        path:'/',
        component: 'Main',
        routes:[
            {
                path:'/dashboard',
                component:Dashboard
            }
        ]
    },
    {
        path:'/terminos',
        component: 'Terms',
        routes:[
            {
                path:'/terminos/aviso-de-privacidad',
                component:TermsShow
            },
            {
                path:'/terminos/terminos-y-condiciones',
                component:TermsShow
            },
        ]
    }
] 