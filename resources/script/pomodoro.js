import $ from '../jquery.module.js';

export default class Pomodoro {
  constructor() {
    this.interval;
    this.totalTime = 60 * 25;
    this.progress = 360 / this.totalTime--;
    this.finalProgress = 0;
    this.alarm = new Audio('./resources/mixkit-retro-game-emergency-alarm-1000.wav');

    this.selectors = {
      pomodoro: '.pomodoro',
      resultsEl: '.pomodoro__timer',
      controller: '.pomodoro__controller',
      shortBreakBtn: '[short-break-btn]',
      pomodoroBtn: '[pomodoro-btn]',
      progressBar: '.loader__progress',
    };

    this.classNames = {
      active: 'active',
    };
  }

  eventsHandlers() {
    this.startPomodoro();
    $(this.selectors.controller).on('click', this.startTimer.bind(this));

    $(this.selectors.shortBreakBtn).on('click', () => {
      this.startShortBreak();
    });
    
    $(this.selectors.pomodoroBtn).on('click', () => {
      this.startPomodoro();
    });
  }
  
  activeBtnClass(button) {
    const $button = $(button);
    $button.siblings().removeClass(this.classNames.active)
    $button.addClass(this.classNames.active);
  }

  startShortBreak() {
    this.clearLength();
    this.activeBtnClass(this.selectors.shortBreakBtn);
    $(this.selectors.resultsEl).text('05:00').attr('data-type', 'short-break');
    this.totalTime = 60 * 5;
    this.progress = 360 / this.totalTime--;
  }
  
  startPomodoro() {
    this.clearLength();
    this.activeBtnClass(this.selectors.pomodoroBtn);
    $(this.selectors.resultsEl).text('25:00').attr('data-type', 'pomodoro');
    this.totalTime = 60 * 25;
    this.progress = 360 / this.totalTime--;
  }
  
  clearLength() {
    clearInterval(this.interval);
    this.finalProgress = 0;
    this.runProgressBar(0);
    $(this.selectors.controller).text('start');
  }
  
  startTimer({ currentTarget }) {
    this.alarm.pause();
    const $target = $(currentTarget);
    if ($target.text() === 'start') {
      $target.text('pause');

      this.interval = setInterval(() => {
        this.countDown(this.totalTime--);
      }, 1000);
    } else {
      $target.text('start');
		  clearInterval(this.interval);
    }
  }
  
  countDown(totalTime) {
    if (totalTime >= 0) {
      let minutes = (totalTime / 60) | 0;
      let seconds = (totalTime % 60) | 0;
      
      this.updateUI(minutes, seconds);
    } else {
      if ($(this.selectors.resultsEl).attr('data-type') === 'pomodoro') {
        this.clearLength();
        this.startShortBreak();
        this.alarm.play();
      } else {
        this.clearLength();
        this.startPomodoro();
        this.alarm.play();
      }
    }
  }

  updateUI(minutes, seconds) {
    $(this.selectors.resultsEl).text(`${this.addLeadingZero(minutes)}:${this.addLeadingZero(seconds)}`);
    if (this.finalProgress < 360 && this.finalProgress >= 0) {
      this.runProgressBar(this.finalProgress += this.progress);
    }
  }

  addLeadingZero(time) {
    return time < 10 ? `0${time}` : time;
  }

  runProgressBar(progress) {
    $(this.selectors.progressBar).css('background', `conic-gradient(
      #EF7271 ${progress}deg,
      transparent 0deg
    )`);
  }
}