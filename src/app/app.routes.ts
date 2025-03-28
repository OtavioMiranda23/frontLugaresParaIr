import { Routes } from '@angular/router';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [{ 
    path:'detail/:id', component: CardDetailComponent
},
{
    path:'', component: HomeComponent
}];
