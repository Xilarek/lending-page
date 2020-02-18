window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    //Timer
    const countTimer = (deadline) => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
            //Дата когда должен остановиться таймер
            const getTimeRemaining = () => {
                let dateStop = new Date(deadline).getTime(),
            //Текущая дата
            dateNow = new Date().getTime(),
            //Разница в м.сек между дедлайном и фактом(Получаем секунды) 
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
            // Если дата прошла вывожу 00.00.00
            if (timeRemaining < 0) {
                seconds = 0;
                minutes = 0;
                hours = 0;
            }
            return {timeRemaining, hours, minutes, seconds};
            
            };
            const  upDateClock = () => {
                const timer = getTimeRemaining();
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
            setInterval(upDateClock, 1000);
            };
            upDateClock();
    };
    countTimer('19 february 2020');
});