document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    //Timer
    const countTimer = (deadline) => {
        const timerHours = document.getElementById('timer-hours'),
            timerMinutes = document.getElementById('timer-minutes'),
            timerSeconds = document.getElementById('timer-seconds');
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
                clearInterval(upDateClock);
            }
            return {
                timeRemaining,
                hours,
                minutes,
                seconds
            };

        };
        const upDateClock = () => {
            const {
                hours,
                minutes,
                seconds
            } = getTimeRemaining();
            //Выводим значения на экран 
            timerHours.textContent = hours;
            timerMinutes.textContent = minutes;
            timerSeconds.textContent = seconds;
            //Добавляю 0 перед значениями, если это необходимо 
            if (timerHours.textContent < 10) {
                timerHours.textContent = '0' + timerHours.textContent;
            }
            if (timerMinutes.textContent < 10) {
                timerMinutes.textContent = '0' + timerMinutes.textContent;
            }
            if (timerSeconds.textContent < 10) {
                timerSeconds.textContent = '0' + timerSeconds.textContent;
            }
        };
        setInterval(upDateClock, 1000);
    };
    countTimer('20 february 2020');

    //Меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);

        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));


    };
    toggleMenu();

    //popup

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popUpClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content'),
            //Время анимации
            timeAnimate = 1700;

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popupContent.style.left = '44' +'%';
                popupContent.style.top = '0';
                popup.style.display = 'block';
                //Добавляю анимацию на модельное окно 
                const start = Date.now(),
                    windowSize = window.innerWidth;
                if (windowSize <= 768) {
                    popupContent.style.top = '10'+'%';
                    console.log('нет анимации');
                } else {
                    let timer = setInterval(() => {
                        let timePassed = Date.now() - start;

                        if (timePassed >= timeAnimate) {
                            clearInterval(timer);
                            return;
                        }
                        draw(timePassed);
                    }, 20);
                    const draw = (timePassed) => {
                        popupContent.style.top = timePassed / 15 + 'px';
                    };
                }

            });
            popUpClose.addEventListener('click', () => {
                popup.style.display = 'none';
            });
        });

    };
    togglePopUp();
});