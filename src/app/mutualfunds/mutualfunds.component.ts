import { Component, OnInit, Input } from '@angular/core';
import { MfService } from '../mf.service';
import { FormBuilder,FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { faTrashAlt, faEdit  } from '@fortawesome/free-regular-svg-icons';
import { VarsenderService } from '../varsender.service';


export interface MFElement {
  id: number;
  fund_name: string;
  cds: Array<Object>;
  stocks: Array<Object>;
  investAmount: Array<Object>;
  percentage: Array<Object>;
  return: Array<Object>;
}

@Component({
  selector: 'app-mutualfunds',
  templateUrl: './mutualfunds.component.html',
  styleUrls: ['./mutualfunds.component.scss']
})
export class MutualfundsComponent implements OnInit {
  displayedColumns: string[] = ["fund_name", "cds", "stocks", "investAmount", "percentage", "return" ]
  mfForm: FormGroup
  constructor(private mfService: MfService, private fb: FormBuilder, private varsend: VarsenderService) {
    this.mfForm = this.fb.group({
     cods : this.fb.array([], [Validators.required]),
     stks : this.fb.array([], [Validators.required])
    });  
   }
notValid: boolean = false;
mfs: any;
investments: any;
faTrash = faTrashAlt;
faEdit = faEdit;
importedCDs:any = [
  {id:1, symbol: "NASDAQ"},
  {id:2, symbol: "DOW JONES" },
  {id:3, symbol: "Traditional" },
  {id:4, symbol: "Equity Linked" },
  {id:5, symbol: "Industrial Average" }
]
importedStocks:any = [
  {id:1, symbol: "NYSE"},
  {id:2, symbol: "ADBE" },
  {id:3, symbol: "NVDA" },
  {id:4, symbol: "MRNA" },
  {id:5, symbol: "GILD" },
  {id:6, symbol: "MHK" },
  {id:7, symbol: "NXPI" },
  {id:8, symbol: "MAS" },
  {id:9, symbol: "AMCR" },
  {id:10, symbol: "CHTR" },
  {id:11, symbol: "DOV" },
  {id:12, symbol: "DAL" },
  {id:13, symbol: "COST" },
  {id:14, symbol: "AMZN" },
  {id:15, symbol: "AZO" },
  {id:16, symbol: "ALK" },
  {id:17, symbol: "AAP" },
  {id:18, symbol: "CBOE" },
  {id:19, symbol: "GLW" },
  {id:20, symbol: "MMM"}
  
]
mfName: string = "";


  ngOnInit(): void {
    this.mfService.getMFs().subscribe(payload => {
      console.log('this is the payload:',payload)
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
      
      console.log('this is the new payload:',payload)
      this.mfs = payload;
      

      
    })
    this.varsend.importedStocks = this.importedStocks;
  }
  onChecked(e: any){
    const cdSelections: FormArray = this.mfForm.get('cods') as FormArray;
    const stkSelections: FormArray = this.mfForm.get('stks') as FormArray;
    if (e.target.checked && e.target.name == "data-cd") {
      cdSelections.push(new FormControl(e.target.value));
    }else if(e.target.checked && e.target.name == "data-stk"){

      stkSelections.push(new FormControl(e.target.value));
    } else {
       const index = cdSelections.controls
       .findIndex(x => x.value === e.target.value);
       const idex = stkSelections.controls
       .findIndex(x => x.value === e.target.value);
       cdSelections.removeAt(index);
       stkSelections.removeAt(idex);
  }
}
  submit(event: any, mfName:any){
    console.log('this is event',event)
    if (mfName == "" || mfName == null){
      this.notValid = true;
    }else {
      this.notValid=false;
      let cds = this.mfForm.value.cods;
      let stocks = this.mfForm.value.stks;
      let fund_name = mfName.toUpperCase()
      console.log('this is the name',fund_name)
      console.log('this is the forms value',this.mfForm.value);
      console.log('this is the cds', cds);
      console.log('this is the stoks', stocks)
      let daForm = {
        fund_name: fund_name,
        stocks: stocks,
        cds: cds
      }
      this.mfService.addMF(daForm).subscribe(payload => {
        console.log("payload",payload)
        this.ngOnInit();
      })
      this.toggleModal();
    }


  }
  toggleModalButton = "Add Mutual Fund";
  moveClass: boolean = false;
  toggleModal(): void{
    if (this.moveClass == false){
      this.moveClass = true;
      this.toggleModalButton = "Close Modal";
    } else {
      this.moveClass = false;
      this.toggleModalButton = "Add Mutual Fund";
    }
  }
  removeMF(id: any){
    console.log(id);
    this.mfService.deleteMF(id).subscribe((data)=>{
      console.log(data);
      this.ngOnInit();
    })
  }


}
