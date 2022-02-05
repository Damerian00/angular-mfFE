import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InvestmentsComponent } from './investments/investments.component';
import { MutualfundsComponent } from './mutualfunds/mutualfunds.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "mutualfunds", component: MutualfundsComponent},
  {path: "investments", component: InvestmentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
