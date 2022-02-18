import { Component, OnInit } from '@angular/core';
import { MfService } from '../mf.service';
import { ActivatedRoute } from '@angular/router';
import { MutualFund } from './mf.model';
import { FormBuilder,FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { VarsenderService } from '../varsender.service';


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
importedCDs:any = this.varSend.importedCDs
importedStocks:any = this.varSend.importedStocks
mfForm: FormGroup
notValid: boolean = false;
  constructor(private route:ActivatedRoute, private mfService: MfService, private fb: FormBuilder, private varSend: VarsenderService) {
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
        // console.log(payload);
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
      // console.log('this is event',event, 'this is name',mfName)
      if (mfName == "" || mfName == null){
        this.notValid = true;
      }else {
        this.notValid=false;
        let cds = this.mfForm.value.cods;
        let stocks = this.mfForm.value.stks;
        let fund_name = mfName.toUpperCase()
        let daForm = {
          fund_name: fund_name,
          stocks: stocks,
          cds: cds
        }
        this.mfService.editMF(id, daForm).subscribe(payload =>{
          
         this.ngOnInit();
        })
       
      }
  
    }




  }


