import { label } from './../model/Event/Label';
import { EvenetService } from './../service/event.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { Event } from '../model/Event/Event';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventview',
  templateUrl: './eventview.component.html',
  styleUrls: ['./eventview.component.css'],
})
export class EventviewComponent implements OnInit {
  selectedEvent!: Event;
  eventQR!: Blob;
  eventId?: any;
  token!: string;
  constructor(
    private route: ActivatedRoute,
    private evenetService: EvenetService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    showCloseButton: true,
    timer: 6000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  private subscription!: Subscription;
  currentUser!: number;
  public dateNow = new Date();
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
    // console.log('dater2 is :' + dater);
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
    this.token = localStorage.getItem('token') || '{}';
    this.eventId = this.route.snapshot.paramMap.get('id');
    const decodedToken = this.jwtHelper.decodeToken(
      localStorage.getItem('token') || ''
    );
    this.currentUser = decodedToken.userId;
    this.getEvent(this.eventId);

    console.log('testing out userid: ', this.currentUser);

    // console.log('now this is a test' + this.selectedEvent.eventStart);

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
          this.selectedEvent = response;
          console.log(this.selectedEvent);
          console.log('length = ', this.selectedEvent.attendies.length);
          this.subscription = interval(1000).subscribe((x) => {
            this.getTimeDifference(this.selectedEvent.eventStart);
          });
        },
        (error) => {
          if (error.error?.message) {
            alert(error.error.message);
          }
        }
      );
  }
  ifearly(): boolean {
    if (this.dateNow < new Date(this.selectedEvent.eventStart)) return false;
    else return true;
  }
  ifnow(): boolean {
    if (
      this.dateNow > new Date(this.selectedEvent.eventStart) &&
      this.dateNow < new Date(this.selectedEvent.eventEnd)
    )
      return true;
    else return false;
  }
  ifpast() {
    if (this.dateNow > new Date(this.selectedEvent.eventEnd)) return true;
    else return false;
  }
  isSubscribed() {
    for (let us of this.selectedEvent.attendies) {
      if (us.userId === this.currentUser) return true;
    }
    return false;
  }
  Subscribe() {
    Swal.fire({
      title: 'Subscribing to ' + this.selectedEvent.eventName,
      text: 'By clicking on "I will attend!" you are confirming your attendance to this event',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'I will attend!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.evenetService
          .eventSub(
            'http://localhost:8082/event/subscribe/' +
              this.currentUser +
              '/' +
              this.selectedEvent.eventId,
            this.token
          )
          .subscribe(
            (response: any) => {
              console.log(response);
              this.Toast.fire({
                icon: 'success',
                title: 'Congratulations, we hope you have a great time',
              });
              this.ngOnInit();
            },
            (error) => {
              if (error.error?.message) {
                alert(error.error.message);
              }
            }
          );
      }
    });
  }
  Unsubscribe() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to free your spot in the event and thus cancelling your attendance !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel my attendance',
    }).then((result) => {
      if (result.isConfirmed) {
        this.evenetService
          .eventUnsub(
            'http://localhost:8082/event/unsubscribe/' +
              this.currentUser +
              '/' +
              this.selectedEvent.eventId,
            this.token
          )
          .subscribe(
            (response: any) => {
              this.Toast.fire({
                icon: 'success',
                title:
                  'Your spot has been freed, we hope to see you in future events',
              });
              this.ngOnInit();
            },
            (error) => {
              if (error.error?.message) {
                alert(error.error.message);
              }
            }
          );
      }
    });
  }
  labelSub(label: label) {
    this.evenetService
      .labelSub(
        'http://localhost:8082/event/labelsub/' +
          this.currentUser +
          '/' +
          label.labelId,
        this.token
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          this.Toast.fire({
            icon: 'success',
            title:
              "You Succefully followed events with the label '" +
              label.value +
              "'",
          });
          this.ngOnInit();
        },
        (error) => {
          if (error.error?.message) {
            alert(error.error.message);
          }
        }
      );
  }
  labelUnsub(label: label) {
    const x = label.labelId;
    console.log('testing unsub label : ', label);
    console.log('testing unsub x : ', x);
    this.evenetService
      .labelUnsub(
        'http://localhost:8082/event/labelunsub/' +
          this.currentUser +
          '/' +
          label.labelId,
        this.token
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          this.Toast.fire({
            icon: 'success',
            title:
              "You Succefully unfollowed events with the label '" +
              label.value +
              "'",
          });
          this.ngOnInit();
        },
        (error) => {
          if (error.error?.message) {
            alert(error.error.message);
          }
        }
      );
  }
  isLabelSub(L: label) {
    //console.log(L.Subscribers);
    for (let u of L.subscribers) {
      if (u.userId === this.currentUser) return true;
    }
    return false;
  }
  showsubs(L: label) {
    console.log('testing label = ', L);
  }
  freespot(): boolean {
    if (
      this.selectedEvent.maxAttend - this.selectedEvent.attendies.length ===
      0
    ) {
      return true;
    } else return false;
  }
  return() {
    let currentPath: string = this.router.routerState.snapshot.url;
    if (currentPath.includes('admin'))
      //let path: string = '/member/main/event/' + E.eventId;
      this.router.navigate(['admin/EventDash']);
    else this.router.navigate(['member/main/EventDash']);
  }
}
