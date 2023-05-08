import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Donation, Payment} from "../../model/donation";
import {DonationService} from "../../service/donation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
interface Type {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
  styleUrls: ['./payment-create.component.css']
})
export class PaymentCreateComponent implements OnInit {
  donationForm!: FormGroup;
  test:any
  default_amount: number = 0;
  form!: FormGroup;
  Payment!:Payment
  type: Type[] = [
    {value: 'VIR', viewValue: 'VIR'},
    {value: 'CASH', viewValue: 'CASH'},
    {value: 'CHQ', viewValue: 'CHQ'},
  ];
  constructor(
    public donationsService: DonationService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.Payment = new Payment()
    this.form = new FormGroup({
      amount: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      date: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      raison: new FormControl('', Validators.required),
    });
  }






  create(){
    this.Payment.type=this.form.get('type')?.value
    this.Payment.name=this.form.get('name')?.value
    this.Payment.status=this.form.get('status')?.value
    this.Payment.amount=this.form.get('amount')?.value
    this.Payment.date=this.form.get('date')?.value
    this.toastr.success('Notification message', 'Notification Title');
    console.log(this.Payment)

  }

}
