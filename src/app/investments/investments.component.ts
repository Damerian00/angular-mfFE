import { Component, OnInit } from '@angular/core';
import { MfService } from '../mf.service';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss']
})
export class InvestmentsComponent implements OnInit {
  
  constructor(private mfService: MfService) { }
mfs:any;
investments: any;
mfId: any = [];
investData = ({
  MutualFundId: 0,
  investAmount: 0,
  percentage: 0,
  return: 0
})
  ngOnInit(): void {
    this.mfService.getMFs().subscribe(payload =>{
      for(let i = 0; i< payload.length; i++){
        let amt: any =[]
        let percent: any = []
        let ret: any = []
        if(payload[i].Investments.length != 0){
          payload[i].Investments.forEach((invest: any) =>{
                 amt.push(invest.investAmount);
                 percent.push(invest.percentage);
                 ret.push(invest.return);               
          })
        }
        payload[i]["investAmount"] = amt;
        payload[i]["percentage"] = percent;
        payload[i]["return"] = ret;
      }
      console.log('mfs:',payload)
      this.mfs = payload;
      this.mfId = payload.id;
    })
    this.mfService.getInvests().subscribe(payload =>{
      console.log('investments:', payload)
      this.investments = payload;
    })



  }
  addInvestment(){
    if (this.investData.investAmount <= 0 || this.investData.percentage <=0 || this.investData.return <= 0 || this.investData.MutualFundId <= 0){
      alert("need to input name, type, and fee to add")
    } else {
    let dollarUS = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
  });
    let tempAmt = this.investData.investAmount.toString();
    let othertemp = Number(dollarUS.format(parseFloat(tempAmt)));
    this.investData.investAmount = othertemp;
    this.mfService.addInvest(this.investData).subscribe(payload =>{
      console.log('this is investment', payload);
      this.ngOnInit();
    })

  }
  }





}
