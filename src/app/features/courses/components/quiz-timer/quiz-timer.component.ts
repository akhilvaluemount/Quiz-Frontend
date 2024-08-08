import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-quiz-timer',
  templateUrl: './quiz-timer.component.html',
  styleUrls: ['./quiz-timer.component.scss']
})
export class QuizTimerComponent implements OnInit, OnChanges {

  @Input() public quizDuration: number = 0; // In Minutes
  @Input() public type: any; // timer, countdown
  @Output() public timerComplete:EventEmitter<boolean> = new EventEmitter();

  public time: string = "";
  public countdownCounter: number = 0;
  public timerCounter: number = 0;
  public intervalId: any;

  ngOnChanges(changes: SimpleChanges): void {
    this.countdownCounter = this.quizDuration * 60;
  }

  ngOnInit(): void {

    // Interval Function
    const quizTimer = () => {
      if (this.type === 'countdown') {
        this.time = this.formatTime(--this.countdownCounter);
        if(this.countdownCounter<=0){
          this.clearInterval();
        }
      } else if (this.type === 'timer') {
        this.time = this.formatTime(++this.timerCounter);
        if(this.timerCounter==this.quizDuration * 60){
          this.clearInterval();
        }
      }
    }

    // Start Interval
    this.intervalId = setInterval(quizTimer, 100);

  }

  clearInterval(){
    clearInterval(this.intervalId);
    this.timerComplete.emit(true);
  }

  formatTime(seconds: number): string {

    const hours = Math.floor((seconds / 3600));
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  }

}
