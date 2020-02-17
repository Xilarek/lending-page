window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    //Timer
    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
            //Дата когда должен остановиться таймер
            function getTimeRemaining() {
                let dateStop = new Date(deadline).getTime(),
            //Текущая дата
            dateNow = new Date().getTime(),
            //Разница в м.сек между дедлайном и фактом(Получаем секунды) 
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
            // Если дата прошла получаю 00.00.00
            if (timeRemaining < 0) {
                seconds = 0;
                minutes = 0;
                hours = 0;
            }
            return {timeRemaining, hours, minutes, seconds};
            
            }
            function upDateClock() {
                let timer = getTimeRemaining();
            //Выводим значения на экран 
            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;
            //Добавляю 0 перед значениями, если это необходимо 
            if (timerHours.textContent < 10) {
                timerHours.textContent = '0' + timerHours.textContent;
            } if (timerMinutes.textContent < 10) {
                timerMinutes.textContent = '0' + timerMinutes.textContent;
            }if (timerSeconds.textContent < 10) {
                timerSeconds.textContent = '0' + timerSeconds.textContent;
            }
            }
            upDateClock();
    }

    //countTimer('01 july 2020');
    setInterval(countTimer, 1000, '18 february 2020');

});