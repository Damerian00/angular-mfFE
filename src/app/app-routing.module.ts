import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InvestmentsComponent } from './investments/investments.component';
import { MutualfundsComponent } from './mutualfunds/mutualfunds.component';
import { MutualfundComponent } from './mutualfund/mutualfund.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "mutualfunds", component: MutualfundsComponent},
  {path: "mutualfunds/:id", component: MutualfundComponent},
  {path: "investments", component: InvestmentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
