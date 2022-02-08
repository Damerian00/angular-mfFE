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
investData = ({
  MutualFundId: "invest",
  investAmount: 0,
  percentage: 0,
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

    if (this.investData.investAmount <= 0 || this.investData.percentage <=0 || this.investData.return <= 0 || this.investData.MutualFundId == ""){
      alert("need to input name, type, and fee to add")
    } else {

    
   
    let mf = this.investData.MutualFundId;
  console.log('this is mf', mf)
    

    console.log('before changes', this.investData)
    
    console.log('this will be the payload',this.investData)
    this.mfService.addInvest(this.investData).subscribe(payload =>{
      console.log('this is investment', payload);
      this.ngOnInit();
    })

  


  }

  }
removeInvest(id:any){
  console.log('this is invest id', id);
  // this.mfService.deleteInvest(id).subscribe((data)=>{
  //   console.log(data);
  //   this.ngOnInit();
  // })
}


}
