import { Routes } from '@angular/router';
import { BudgetPageComponent } from './budget-page/budget-page.component';
import { AccountsPageComponent } from './accounts-page/accounts-page.component';

export const routes: Routes = [
    { path: '', component: BudgetPageComponent },
    { path: 'accounts', component: AccountsPageComponent },
    { path: '**',   redirectTo: '/', pathMatch: 'full' }
];
