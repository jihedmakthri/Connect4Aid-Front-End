import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DonationService} from "../../service/donation.service";
import {Donation} from "../../model/donation";
import {ToastrService} from "ngx-toastr";
interface Type {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  donationForm!: FormGroup;
    test:any
  default_amount: number = 0;
  form!: FormGroup;
  donation!:Donation
  type: Type[] = [
    {value: 'Money', viewValue: 'Money'},
    {value: 'cloth', viewValue: 'cloth'},
    {value: 'food', viewValue: 'food'},
  ];
  constructor(
    public donationsService: DonationService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.donation = new Donation()
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      date: new FormControl('', Validators.required),
      raison: new FormControl('', Validators.required),
    });
  }






  create(){
    this.donation.type=this.form.get('type')?.value
    this.donation.name=this.form.get('name')?.value
    this.donation.date=this.form.get('date')?.value
    this.donation.reason=this.form.get('raison')?.value
    console.log(this.donation)
    this.donationsService.create(this.donation).subscribe(res=>{
      if(this.donation.type =="Money")  {
        this.router.navigate(['user/main/payment',res.id]);
      }else{
        this.router.navigate(['user/main/list']);
      }
      this.toastr.success('Donation Created', 'Donamtion');
      console.log("done")
    })

  }
}
