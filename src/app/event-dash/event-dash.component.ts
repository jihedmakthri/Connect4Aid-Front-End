import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Event } from '../model/Event/Event';
import { EvenetService } from '../service/event.service';
import { CalendarOptions, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { label } from '../model/Event/Label';
import { User } from '../model/user';

@Component({
  selector: 'app-event-dash',
  templateUrl: './event-dash.component.html',
  styleUrls: ['./event-dash.component.css'],
})
export class EventDashComponent implements OnInit {
  eventCalender = [
    {
      title: 'Helloooooo',
      start: '2023-10-11',
      end: '2023-12-30',
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
    initialEvents: this.eventCalender, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    themeSystem: 'standard',
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

  filterStartDate!: Date;
  filterEndDate!: Date;
  filterName!: string;
  selectedValues!: label[];
  toAddEvent: Event = {
    eventId: undefined,
    eventName: '',
    eventInfo: '',
    eventStart: new Date(),
    eventEnd: new Date(),
    labels: [],
    attendies: [],
    responsable: {
      userId: 12,
      contactNumber: '99999999',
    },
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
  EventList!: Event[];
  LabelList!: label[];
  todaysDate: Date = new Date();
  constructor(
    private eventService: EvenetService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef
  ) {}
  viewMode: boolean = false;
  ngOnInit(): void {
    this.filterEndDate = new Date('1999-01-01');
    this.filterStartDate = new Date('2060-01-01');
    this.filterName = '';
    this.emptyEvent;
    this.viewMode = false;
    this.getEvents();
    console.log();
    this.getlabels();
  }
  changeView(x: boolean) {
    this.viewMode = x;
  }
  isEventActive(eventStart: Date): boolean {
    return new Date(eventStart) > this.todaysDate;
  }
  open(content: any) {
    this.modalService.open(content, { centered: true });
  }
  deleteEvent(event: Event) {
    this.eventService
      .deleteEvent(
        'http://localhost:8082/event/' + event.eventId,
        localStorage.getItem('token') || '{}'
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          this.cdr.detectChanges();
        },
        (error) => {
          if (error.error?.message) {
            alert(error.error.message);
            this.cdr.detectChanges();
          }
        }
      );
  }
  test1() {
    Swal.fire('Any fool can use a computer');
  }
  postEvent() {
    this.eventService
      .postEvent(
        'http://localhost:8082/event/postevent',
        localStorage.getItem('token') || '{}',
        this.toAddEvent
      )
      .subscribe(
        (response: any) => {
          console.log(response);
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
      .getAll(
        'http://localhost:8082/event/getevent',
        localStorage.getItem('token') || '{}'
      )
      .subscribe(
        (response: any) => {
          this.EventList = response;
          console.log(this.EventList);
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
    console.log(this.toAddEvent);
    console.log(this.selectedValues);

    /* for (var e of this.selectedValues) {
      const templabel: label = {
        LabelId: e.LabelId,
      };
      this.toAddEvent.labels.push(templabel);
    }*/
    this.toAddEvent.labels = this.selectedValues;
    console.log(this.toAddEvent.labels);

    // this.toAddEvent.labels = this.selectedValues;
    this.postEvent();

    // this.emptyEvent(this.toAddEvent);
  }
  applyFilter() {
    console.log(
      this.filterStartDate + ' ' + this.filterEndDate + ' ' + this.filterName
    );
    this.eventService
      .filterEvent(
        'http://localhost:8082/event/filtered',
        localStorage.getItem('token') || '{}',
        {
          filterStartDate: this.filterStartDate,
          filterEndDate: this.filterEndDate,
          filterName: this.filterName,
        }
      )
      .subscribe(
        (response: any) => {
          console.log(response);
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
      .getlabels(
        'http://localhost:8082/event/labelall',
        localStorage.getItem('token') || '{}'
      )
      .subscribe(
        (response: any) => {
          console.log(response);
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
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }
  setupdate(event: Event) {
    this.toUpdateEvent = event;
    console.log(this.toUpdateEvent);
  }
}
