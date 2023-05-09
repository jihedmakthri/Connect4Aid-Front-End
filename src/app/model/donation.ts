export class Donation {
  id!: number;
  amount!: any;
  date!: any;
  reason!: any;
  type!:any
  name!:any
  Payment!:Payment
}
export class Payment{
  type!:any
  name!:any
  status!:any
  amount!:any
  date!: any
}
