import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DonationService} from "../../service/donation.service";
import {Donation} from "../../model/donation";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  default_amount: number = 0;
  form!: FormGroup;

  constructor(
    public donationsService: DonationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      amount: new FormControl('', [Validators.required]),
      blns_1: new FormControl('', [Validators.required]),
      blns_2: new FormControl('', Validators.required),
      other: new FormControl('', Validators.required),
      raison: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.form.controls;
  }

  onchange_amount(e: any) {
    this.default_amount = e.target.defaultValue
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  submit() {
    const now = new Date();

    console.log(this.form.value);
    const donation = {} as Donation;

    const default_amount = this.default_amount
    const amount = this.form.value.amount
    if (default_amount == 0 && amount != 0) {
      donation.amount = amount;
    } else if (default_amount != 0 && amount == 0) {
      donation.amount = default_amount;
    }else{
      alert("Amoun't cannot be 0.")
    }


    donation.reason = this.form.value.raison;
    donation.date = [
      now.getFullYear(),
      this.padTo2Digits(now.getMonth() + 1),
      this.padTo2Digits(now.getDate()),
    ].join('-'); // 2023-05-01

    console.log(donation);
    this.donationsService.create(donation).subscribe((res: any) => {
      console.log('Thanks for donating !');
      this.router.navigateByUrl('donations/index');
    })
  }


}
