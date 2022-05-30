import $ from './jquery.module.js';

class Pomodoro {
  constructor() {
    this.interval;
    this.totalTime = 60 * 25;
    this.progress = 360 / this.totalTime;
    this.finalProgress = 0;

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
    this.toggleLength('pomodoro');
    $(this.selectors.controller).on('click', this.startTimer.bind(this));

    $(this.selectors.shortBreakBtn).on('click', (event) => {
      this.activeBtnClass(event);
      this.toggleLength('short-break');
    });
    
    $(this.selectors.pomodoroBtn).on('click', (event) => {
      this.activeBtnClass(event);
      this.toggleLength('pomodoro');
    });
  }
  
  activeBtnClass(event) {
    const $button = $(event.target);
    $button.siblings().removeClass(this.classNames.active)
    $button.addClass(this.classNames.active);
  }
  
  toggleLength(mode) {
    clearInterval(this.interval);
    this.finalProgress = 0;
    this.runProgressBar(0);
    $(this.selectors.controller).text('start');
    
    if (mode === 'short-break') {
      $(this.selectors.resultsEl).text('05:00').attr('data-type', 'short-break');
      this.totalTime = 60 * 5;
      this.progress = 360 / this.totalTime--;
    } else {
      $(this.selectors.resultsEl).text('25:00').attr('data-type', 'pomodoro');
      this.totalTime = 60 * 25;
      this.progress = 360 / this.totalTime--;
    }
  }
  
  startTimer() {
    if ($(this.selectors.controller).text() === 'start') {
      $(this.selectors.controller).text('pause');

      this.interval = setInterval(() => {
        this.countDown(this.totalTime--);
      }, 1000);
    } else {
      $(this.selectors.controller).text('start');
		  clearInterval(this.interval);
    }
  }
  
  countDown(totalTime) {
    if (totalTime < 0) {
      if ($(this.selectors.resultsEl).attr('data-type') === 'pomodoro') {
        $(this.selectors.resultsEl).text('25:00');
        this.toggleLength('pomodoro');
      } else {
        $(this.selectors.resultsEl).text('05:00');
        this.toggleLength('short-break');
      }
      
      $(this.selectors.controller).text('start');
      return;
    }
  
    let minutes = (totalTime / 60) | 0;
    let seconds = (totalTime % 60) | 0;
    
    this.updateUI(minutes, seconds);
  }

  updateUI(minutes, seconds) {
    $(this.selectors.resultsEl).text(`${this.addLeadingZero(minutes)}:${this.addLeadingZero(seconds)}`);
    if (this.finalProgress < 360) {
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

const pomodoro = new Pomodoro();
pomodoro.eventsHandlers();