import { EvenetService } from './../service/event.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { Event } from '../model/Event/Event';

@Component({
  selector: 'app-eventview',
  templateUrl: './eventview.component.html',
  styleUrls: ['./eventview.component.css'],
})
export class EventviewComponent implements OnInit {
  selectEvent!: Event;
  eventId?: any;
  constructor(
    private route: ActivatedRoute,
    private evenetService: EvenetService
  ) {}

  private subscription!: Subscription;

  public dateNow = new Date();
  public dDay = new Date('Jan 01 2024 00:00:00');
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference: any;
  public secondsToDday: any;
  public minutesToDday: any;
  public hoursToDday: any;
  public daysToDday: any;

  private getTimeDifference(dater: Date) {
    console.log('dater2 is :' + dater);
    let dater2 = dater.toString();
    var dater3 = new Date(Date.parse(dater2));
    this.timeDifference = dater3.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference: any) {
    this.secondsToDday = Math.floor(
      (timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute
    );
    this.minutesToDday = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) %
        this.SecondsInAMinute
    );
    this.hoursToDday = Math.floor(
      (timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute)) %
        this.hoursInADay
    );
    this.daysToDday = Math.floor(
      timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute *
          this.hoursInADay)
    );
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    console.log(this.eventId);
    this.getEvent(this.eventId);
    console.log('now this is a test' + this.selectEvent.eventStart);
    //const datetemp = new Date(this.selectEvent.eventStart);
    //  console.log(datetemp);
    //  console.log(this.selectEvent);
    // this.subscription = interval(1000).subscribe((x) => {
    //     this.getTimeDifference(datetemp);
    //  });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  getEvent(eventId: string) {
    this.evenetService
      .getEvent(
        'http://localhost:8082/event/' + eventId,
        localStorage.getItem('token') || '{}'
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          this.selectEvent = response;
          console.log('test of selectevent');
          console.log(this.selectEvent);

          this.subscription = interval(1000).subscribe((x) => {
            this.getTimeDifference(this.selectEvent.eventStart);
          });
        },
        (error) => {
          if (error.error?.message) {
            alert(error.error.message);
          }
        }
      );
  }
}
