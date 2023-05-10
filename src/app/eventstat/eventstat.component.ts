import { EvenetService } from './../service/event.service';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { label } from '../model/Event/Label';
import { Event } from '../model/Event/Event';
@Component({
  selector: 'app-eventstat',
  templateUrl: './eventstat.component.html',
  styleUrls: ['./eventstat.component.css'],
})
export class EventstatComponent implements OnInit {
  constructor(private EventService: EvenetService) {}
  allLabels!: label[];
  token!: string;
  chart: any;
  eventList!: Event[];
  labelstat!: Map<string, number>;
  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '{}';
    this.getlabels();
    this.getlabelstat();
    this.getEvents();
  }
  getEvents() {
    this.EventService.getAll(
      'http://localhost:8082/event/getevent',
      this.token
    ).subscribe(
      (response: any) => {
        this.eventList = response;
        this.chart3();
        this.chart4();
        this.chart5();
      },
      (error) => {
        if (error.error?.message) {
          alert(error.error.message);
        }
      }
    );
  }

  getlabels() {
    this.EventService.getlabels(
      'http://localhost:8082/event/labelall',
      this.token
    ).subscribe(
      (response: any) => {
        this.allLabels = response;
        console.log(this.allLabels);
        this.createpie();
      },
      (error) => {
        if (error.error?.message) {
          console.log(error);
        }
      }
    );
  }

  createpie() {
    console.log(this.allLabels);
    const lbs: (string | undefined)[] = this.allLabels.map(
      (label) => label.value
    );
    console.log(lbs);
    const counters: number[] = this.allLabels.map(
      (label) => label.subscribers.length
    );
    const colors = this.allLabels.map(() => this.getRandomColor());
    this.chart = new Chart('labelpie', {
      type: 'doughnut',
      data: {
        labels: lbs,
        datasets: [
          {
            label: 'Followers',
            data: counters,
            backgroundColor: colors,
            hoverOffset: 4,
          },
        ],
      },
    });
  }
  getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }
  getlabelstat() {
    this.EventService.getLabelStat(
      'http://localhost:8082/event/getlabelstat',
      this.token
    ).subscribe(
      (response: any) => {
        this.labelstat = response;
        console.log(this.labelstat);
        this.createChart();
        //this.createpie();
      },
      (error) => {
        if (error.error?.message) {
          console.log(error);
        }
      }
    );
  }
  createChart() {
    const labels = Object.keys(this.labelstat);
    const data = Object.values(this.labelstat);
    const colors = [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#8E5EA2',
      '#3cba9f',
      '#e8c3b9',
      '#c45850',
      '#FF8A80',
      '#EA80FC',
      '#B388FF',
    ];
    const chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: '# of Events',
            data: data,
            backgroundColor: labels.map(
              (label, index) => colors[index % colors.length]
            ),
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  chart3() {
    const ctx = document.getElementById('events-per-month');
    const data = this.getEventsPerMonthData();
    this.chart = new Chart('ctx', {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Number of Events',
            data: data.values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  getEventsPerMonthData(): { labels: string[]; values: number[] } {
    const labels = [];
    const values = [];
    const eventsByMonth: { [key: number]: number } = {};
    this.eventList.forEach((event: Event) => {
      const rl = new Date(event.eventStart).getMonth();
      const month = new Date(event.eventStart).getMonth();
      eventsByMonth[month] = (eventsByMonth[month] || 0) + 1;
    });
    for (let month = 0; month < 12; month++) {
      labels.push(this.getMonthName(month));
      values.push(eventsByMonth[month] || 0);
    }
    return { labels, values };
  }
  getMonthName(month: number): string {
    const names = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return names[month];
  }
  chart4() {
    // Assuming 'events' is an array of events
    const avgAttendeesPerEvent =
      this.eventList.reduce((sum, event) => sum + event.attendies.length, 0) /
      this.eventList.length;

    const chartData = {
      labels: this.eventList.map((event) => event.eventName),
      datasets: [
        {
          label: 'Average Number of Attendees per Event',
          data: this.eventList.map((event) => event.attendies.length),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          label: 'Average',
          data: Array(this.eventList.length).fill(avgAttendeesPerEvent),
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      scales: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    const chart = new Chart('chart4', {
      type: 'bar',
      data: chartData,
      options: {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart',
          },
        },
      },
    });
  }
  chart5() {
    // First, group the events by responsible user
    const eventsByResponsible: { [key: string]: number } = {};
    for (const event of this.eventList) {
      if (event.responsable) {
        const responsibleName = `${event.responsable.firstName} ${event.responsable.lastName}`;
        if (eventsByResponsible[responsibleName]) {
          eventsByResponsible[responsibleName]++;
        } else {
          eventsByResponsible[responsibleName] = 1;
        }
      }
    }

    // Next, create the chart data
    const chartData = {
      labels: Object.keys(eventsByResponsible),
      datasets: [
        {
          label: 'Events by Responsible User',
          data: Object.values(eventsByResponsible),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ], // Use a single color for all bars
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };

    // Finally, create the chart using Chart.js
    const chart = new Chart('chart5', {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
