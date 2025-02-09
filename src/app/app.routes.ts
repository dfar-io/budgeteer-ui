import { Routes } from '@angular/router';
import { BudgetPageComponent } from './budget-page/budget-page.component';
import { TransactionPageComponent } from './transaction-page/transaction-page.component';

export const routes: Routes = [
    { path: '', component: BudgetPageComponent },
    { path: 'transactions', component: TransactionPageComponent },
    { path: '**',   redirectTo: '/', pathMatch: 'full' }
];
