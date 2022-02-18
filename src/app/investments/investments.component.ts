import { Component, OnInit } from '@angular/core';
import { MfService } from '../mf.service';
import { faTrashAlt, faEdit  } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss']
})
export class InvestmentsComponent implements OnInit {
  
  constructor(private mfService: MfService) { }
mfs:any;
investments: any;
mfId: any;
loading: boolean = true;
investData = ({
  MutualFundId: "invest",
  investAmount: 0,
  percentage: .01,
  return: 0
})
faTrash = faTrashAlt;
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
      
      this.mfs = payload;
      this.mfId = payload.id;
      this.loading = false;
    })
    this.mfService.getInvests().subscribe(payload =>{
      this.investments = payload;
    })



  }
  notValid: boolean = false;
  addInvestment(){

    if (this.investData.investAmount <= 1000 || this.investData.percentage <=0 || this.investData.return <= 1000 || this.investData.MutualFundId == "" || this.investData.percentage > 1){
      this.notValid = true;
    } else {
      this.notValid = false;
    this.mfService.addInvest(this.investData).subscribe(payload =>{
      this.ngOnInit();
    })
  }

  }
removeInvest(id:any){
  this.mfService.deleteInvest(id).subscribe((data)=>{
    console.log(data);
    this.ngOnInit();
  })
}


}
