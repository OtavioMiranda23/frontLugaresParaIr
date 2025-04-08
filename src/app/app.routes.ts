import { Routes } from '@angular/router';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CardUpdateComponent } from './components/card-update/card-update.component';

export const routes: Routes = [{ 
    path:'detail/:id', component: CardDetailComponent
},
{
    path:'', component: HomeComponent
},
{
    path:'update/:id', component: CardUpdateComponent
}
];
