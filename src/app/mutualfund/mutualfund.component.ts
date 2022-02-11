import { Component, OnInit } from '@angular/core';
import { MfService } from '../mf.service';
import { ActivatedRoute } from '@angular/router';
import { MutualFund } from './mf.model';
import { FormBuilder,FormGroup, Validators, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-mutualfund',
  templateUrl: './mutualfund.component.html',
  styleUrls: ['./mutualfund.component.scss']
})
export class MutualfundComponent implements OnInit {
mutualFund: MutualFund= {
  id: 0,
  fund_name: '',
  cds: [],
  stocks: [],
  Investments: [],
};
mfName: string="";
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
mfForm: FormGroup
notValid: boolean = false;
  constructor(private route:ActivatedRoute, private mfService: MfService, private fb: FormBuilder) {
    this.mfForm = this.fb.group({
      cods : this.fb.array([], [Validators.required]),
      stks : this.fb.array([], [Validators.required])
     }); 

   }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const myid = +params['id']
      this.mfService.getMF(myid).subscribe(payload=>{
        this.mutualFund = payload;
        console.log(payload);
      })
      
    })

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
    submit(event: any, mfName:any, id:number){
      console.log('this is event',event, 'this is name',mfName)
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
        this.mfService.editMF(id, daForm).subscribe(payload =>{
         console.log('the payload is', payload); 
         this.ngOnInit();
        })
       
      }
  
    }




  }


