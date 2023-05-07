import { EvenetService } from './../service/event.service';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { label } from '../model/Event/Label';
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
  labelstat!: Map<string, number>;
  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '{}';
    this.getlabels();
    this.getlabelstat();
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
}
