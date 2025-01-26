import { Routes } from '@angular/router';
import { BudgetPageComponent } from './budget-page/budget-page.component';

export const routes: Routes = [
    { path: '', component: BudgetPageComponent },
    { path: '**',   redirectTo: '/', pathMatch: 'full' }
];
