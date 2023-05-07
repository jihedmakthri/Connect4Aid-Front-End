import { label } from './../model/Event/Label';
import { Component, OnInit, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { Event } from '../model/Event/Event';
import { EvenetService } from '../service/event.service';
import { CalendarOptions, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { User } from '../model/user';
import { Router } from '@angular/router';
interface CalEvent {
  title: string;
  start: Date;
  end: Date;
  evId: Number;
}
@Component({
  selector: 'app-event-dash',
  templateUrl: './event-dash.component.html',
  styleUrls: ['./event-dash.component.css'],
})
export class EventDashComponent implements OnInit {
  EventList!: Event[];
  calevents!: CalEvent[];
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
  Toast2 = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    showCloseButton: true,
    timer: 99999,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  eventCalender: CalEvent[] = [
    {
      title: 'Helloooooo',
      start: new Date('2023-10-11'),
      end: new Date('2023-12-30'),
      evId: 12,
    },
  ];

  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    events: this.calevents, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    eventClick(arg) {
      const ider = arg.event.id;
    },
    themeSystem: 'bootstrap5',
    selectable: true,
    selectMirror: true,
    //eventClick:WhenClickingOneventInsidetheCalender,
    dayMaxEvents: true,
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  labelPhrase!: string;
  eventRes!: User;
  isCollapsed = true;
  filterStartDate!: Date;
  filterEndDate!: Date;
  filterName: string = '';
  selectedValues!: label[];
  Responsables!: User[];
  token!: string;
  toAddEvent: Event = {
    eventId: undefined,
    eventName: '',
    eventInfo: '',
    eventStart: new Date(),
    eventEnd: new Date(),
    labels: [],
    attendies: [],
    responsable: this.eventRes,
    maxAttend: 0,
  };
  closeResult = '';
  toUpdateEvent: Event = {
    eventName: '',
    eventInfo: '',
    maxAttend: 0,
    eventStart: new Date(),
    eventEnd: new Date(),
    responsable: new User(),
    attendies: [],
    labels: [],
  };

  toAddLabel: label = {
    labelId: undefined,
    value: '',
    subscribers: [],
  };
  LabelList!: label[];
  todaysDate: Date = new Date();
  constructor(
    private eventService: EvenetService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private renderer: Renderer2
  ) {}
  viewMode: boolean = false;
  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '{}';
    this.filterEndDate = new Date('2060-01-01');
    this.filterStartDate = new Date('1999-01-01');
    this.filterName = '';
    this.emptyEvent;
    this.viewMode = false;
    this.getEvents();
    this.getlabels();
    this.getHighUsers();
  }
  changeView(x: boolean) {
    this.viewMode = x;
  }
  isHappened(eventStart: Date): boolean {
    return eventStart > this.todaysDate;
  }
  open(content: any) {
    this.modalService.open(content, { centered: true });
  }
  deleteEvent(event: Event) {
    this.eventService
      .deleteEvent('http://localhost:8082/event/' + event.eventId, this.token)
      .subscribe(
        (response: any) => {
          this.getEvents();
        },
        (error) => {
          if (error.error?.message) {
            alert(error.error.message);
          }
        }
      );
  }
  postEvent() {
    /* this.Toast2.fire({
      title: 'Event is being created!',
      html: 'Please hold on while we create your event',
      timer: 99999,
      timerProgressBar: true,
      didOpen: () => {
        this.Toast.showLoading();
      },
    });*/
    this.eventService
      .postEvent(
        'http://localhost:8082/event/postevent',
        this.token,
        this.toAddEvent
      )
      .subscribe(
        (response: any) => {
          this.Toast.fire({
            icon: 'success',
            title: 'Event Added successfully',
          });
          this.getEvents();
        },
        (error) => {
          if (error.error?.message) {
            alert(error.error.message);
          }
        }
      );
  }
  getEvents() {
    this.eventService
      .getAll('http://localhost:8082/event/getevent', this.token)
      .subscribe(
        (response: any) => {
          this.EventList = response;
          this.calevents = this.lister();
          console.log('testing cal events:', this.calevents);
        },
        (error) => {
          if (error.error?.message) {
            alert(error.error.message);
          }
        }
      );
  }
  emptyEvent(event: Event) {
    event.eventId = undefined;
    event.eventName = '';
    event.eventInfo = '';
    event.maxAttend = 0;
    event.eventStart = new Date();
    event.eventEnd = new Date();
    event.labels = [];
    event.attendies = [];
    event.responsable = {
      userId: 12,
      contactNumber: '99999999',
    };
  }
  saveEvent() {
    this.toAddEvent.labels = this.selectedValues;
    this.toAddEvent.responsable = this.eventRes;

    this.postEvent();
  }
  updateEvent() {
    this.toUpdateEvent.responsable = this.eventRes;
    this.toUpdateEvent.labels = this.selectedValues;

    this.eventService
      .postEvent(
        'http://localhost:8082/event/postevent',
        this.token,
        this.toUpdateEvent
      )
      .subscribe(
        (response: any) => {
          this.getEvents();
          this.Toast.fire({
            icon: 'success',
            title: 'Event Updated successfully',
          });
        },
        (error) => {
          if (error.error?.message) {
            alert(error.error.message);
          }
        }
      );
  }

  applyFilter() {
    this.eventService
      .filterEvent('http://localhost:8082/event/filtered', this.token, {
        filterStartDate: this.filterStartDate,
        filterEndDate: this.filterEndDate,
        filterName: this.filterName,
      })
      .subscribe(
        (response: any) => {
          this.EventList = response;
          this.cdr.detectChanges();
        },
        (error) => {
          if (error.error?.message) {
            console.log(error);
          }
        }
      );
  }

  getlabels() {
    this.eventService
      .getlabels('http://localhost:8082/event/labelall', this.token)
      .subscribe(
        (response: any) => {
          this.LabelList = response;
          this.cdr.detectChanges();
        },
        (error) => {
          if (error.error?.message) {
            console.log(error);
          }
        }
      );
  }
  isEndActive(eventStart: Date, eventEnd: Date): boolean {
    return (
      new Date(eventStart) < this.todaysDate &&
      new Date(eventEnd) > this.todaysDate
    );
  }
  DeleteSwol(event: Event) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteEvent(event);
        this.Toast.fire({
          icon: 'success',
          title: 'Event Has Been Deleted',
        });
      }
    });
    this.ngOnInit();
  }
  setupdate(event: Event) {
    this.toUpdateEvent = event;
  }
  getHighUsers() {
    this.eventService
      .highUsers('http://localhost:8082/user/getEventers', this.token)
      .subscribe(
        (response: any) => {
          this.Responsables = response;
        },
        (error) => {
          if (error.error?.message) {
            alert(error.error.message);
          }
        }
      );
  }
  labelPhraser(labels: label[]): string {
    this.labelPhrase = '';
    labels.forEach((l) => {
      this.labelPhrase = this.labelPhrase + l.value + ' | ';
    });
    this.labelPhrase = this.labelPhrase.slice(0, -2);
    return this.labelPhrase;
  }
  affichtest() {
    console.log('Logger testing responsable : ', this.eventRes);
  }
  moreInfo(E: Event) {
    let path: string = '/member/main/event/' + E.eventId;
    this.router.navigate([path]);
  }
  assignUpdate(E: Event) {
    this.selectedValues = E.labels;
    this.eventRes = E.responsable;
  }
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    const div = document.querySelector('.collapse');
    if (this.isCollapsed) {
      this.renderer.removeClass(div, 'show');
    } else {
      this.renderer.addClass(div, 'show');
    }
  }
  async toggleAddLabel() {
    const { value: label } = await Swal.fire({
      input: 'text',
      title: 'New Label',
      inputPlaceholder: 'Ex: Meet-up',
      showCancelButton: true,
    });

    if (label) {
      const lbX = this.LabelList.find((l) => l.value === label.toString());
      if (lbX) {
        Swal.fire({
          icon: 'error',
          title: 'Already Exists',
          text: "There's a Label with that name already",
        });
      } else {
        this.toAddLabel.value = label.toString();
        this.eventService
          .addLabel(
            'http://localhost:8082/event/addlabel',
            this.toAddLabel,
            this.token
          )
          .subscribe(
            (response: any) => {
              this.Toast.fire({
                icon: 'success',
                title: 'Label Added successfully',
              });
              console.log(response);
              this.getlabels();
            },
            (error) => {
              if (error.error?.message) {
                alert(error.error.message);
              }
            }
          );
      }
    }
  }

  async selectLabel() {
    const options = this.LabelList.map((label) => label.value);
    console.log(options);
    const { value: label } = await Swal.fire({
      title: 'Select a label',
      input: 'select',
      inputOptions: options,
      inputPlaceholder: 'Select a label',
      showCancelButton: true,
    });
    if (label) {
      const selectedLabel = this.LabelList[label];
      console.log(selectedLabel);
      this.Toast.fire({
        icon: 'success',
        title: 'Label Has Been Deleted',
      });
      this.eventService
        .deleteLabel(
          'http://localhost:8082/event/labeldel',
          selectedLabel,
          this.token
        )
        .subscribe(
          (response: any) => {
            console.log(response);

            this.ngOnInit();
          },
          (error) => {
            if (error.error?.message) {
              alert(error.error.message);
            }
          }
        );
      this.getlabels();
    }
  }
  filterEvents(date1: Date, date2: Date, ch1: string) {
    const filteredEvents: Event[] = [];
    this.EventList.forEach((event: Event) => {
      if (
        event.eventName.includes(ch1) &&
        event.eventStart >= date1 &&
        event.eventStart <= date2
      ) {
        filteredEvents.push(event);
      }
    });
    console.log(
      'name =',
      this.filterName + ' and start :',
      this.filterStartDate,
      'and end : ',
      this.filterEndDate
    );
    console.log(filteredEvents);
    this.EventList = filteredEvents;
  }
  clear() {
    this.filterEndDate = new Date('2060-01-01');
    this.filterStartDate = new Date('1999-01-01');
    this.filterName = '';
    this.getEvents;
  }
  lister(): CalEvent[] {
    const calEvents: CalEvent[] = [];

    for (const event of this.EventList) {
      const calEvent: CalEvent = {
        title: event?.eventId?.toString()!,
        start: event.eventStart,
        end: event.eventEnd,
        evId: event.eventId!,
      };

      calEvents.push(calEvent);
    }
    return calEvents;
  }
}
