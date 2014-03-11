/*jslint browser:true, evil: true, plusplus: true, white: true, indent: 4 */

(function () {
  "use strict";

  var doc = document;

  window.addEvent = function(evt, target, method) {
    if (target.addEventListener) {
      target.addEventListener(evt, method, false);
    } else if (target.attachEvent) {
      target.attachEvent('on' + evt, method);
    }
  }

  window.createButton = function(name, txt, method) {
    var btn = doc.createElement('button');
    btn.className = 'btn ' + name;
    btn.innerHTML = txt;
    window.addEvent('click', btn, method);
    return btn;
  }

  function Stopwatch(elem) {
    this.container = doc.querySelector(elem);
    this.output = doc.createElement('div');
    this.output.className = 'timer';
    this.timer;
    this.startBtn = createButton('btn-start', 'START', this.toggleTimer.bind(this));
    this.resetBtn = createButton('btn-reset', 'RESET', this.resetTimer.bind(this));
    this.container.appendChild(this.output);
    this.container.appendChild(this.startBtn);
    this.container.appendChild(this.resetBtn);
    this.resetTimer();
    return this;
  }

  Stopwatch.prototype.toggleTimer = function() {
    if (this.startBtn.classList.contains('btn-stop')) {
      this.stopTimer();
      this.startBtn.innerHTML = 'START';
      this.startBtn.classList.remove('btn-stop');
    } else {
      this.startTimer();
      this.startBtn.innerHTML = 'STOP';
      this.startBtn.className += ' btn-stop';
    }
  };

  Stopwatch.prototype.startTimer = function() {
    var sw = this;
    this.timer = window.setInterval(function() {
          sw.seconds ++;
          if (sw.seconds == 60) {
            sw.seconds = 0;
            sw.minutes += 1;
          } else {
            sw.minutes = sw.minutes;
          }

          if (sw.minutes == 60) {
            sw.minutes = 0;
            sw.hours += 1;
          } else {
            sw.hours = sw.hours;
          }
          var seconds = (sw.seconds < 10) ? '0' + sw.seconds : sw.seconds,
              minutes = (sw.minutes < 10) ? '0' + sw.minutes : sw.minutes,
              hours = (sw.hours < 10) ? '0' + sw.hours : sw.hours,
              formattedTime = hours + ':' + minutes + ':' + seconds;
          sw.output.innerHTML = formattedTime;
        }, 1000);
        return this.timer;
  };

  Stopwatch.prototype.stopTimer = function() {
    window.clearInterval(this.timer);
    return this.timer;
  };

  Stopwatch.prototype.resetTimer = function() {
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.output.innerHTML = '00:00:00';
  };

  var sw = new Stopwatch('.output');
}());