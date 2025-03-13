import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

// https://www.w3schools.com/bootstrap/bootstrap_progressbars.asp
@Component({
  selector: 'app-progress-bar',
  imports: [NgStyle],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {
  @Input() progressValue: number = 0;
}
