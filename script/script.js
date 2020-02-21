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
            }
            return {
                timeRemaining,
                hours,
                minutes,
                seconds
            };


        };
        const upDateClock = () => {
            let timer = getTimeRemaining();
            //Выводим значения на экран 
            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;
            if (timer.timeRemaining < 0) {
                clearInterval(timerId);
            }
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
        const timerId = setInterval(upDateClock, 1000);
    };
    countTimer('20 february 2020');

    //Меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            menuItems = menu.querySelectorAll('ul>li');

        btnMenu.addEventListener('click', () => {
            menu.classList.toggle('active-menu');
        });
        menu.addEventListener('click', (event) => {
            let target = event.target;
            console.log(target);
            if (target.classList.contains('close-btn')) {
                menu.classList.toggle('active-menu');
            }
            if ( target.closest('li')) {
                menu.classList.toggle('active-menu');
            }
            
        });
    };
    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content'),
            //Время анимации
            timeAnimate = 1700,
            pixelStep = 15,
            indentationLeft = '40%';

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popupContent.style.left = indentationLeft;
                popupContent.style.top = '0';
                popUp.style.display = 'flex';

                //Добавляю анимацию на модельное окно 
                const start = Date.now(),
                    windowSize = window.innerWidth;
                if (windowSize <= 768) {
                    popupContent.style.left = '';
                    popupContent.style.top = '';
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
                        popupContent.style.top = timePassed / pixelStep + 'px';
                    };
                }
            });

            popUp.addEventListener('click', (event) => {
                let target = event.target;
                console.log(target);

                if (target.classList.contains('popup-close')) {
                    popUp.style.display = 'none';
                } else {
                    target = target.closest('.popup-content');

                    if (!target) {
                        popUp.style.display = 'none';
                    }
                }
            });
        });

    };
    togglePopUp();

    //табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        //Функция будет перебирать все наши tab находить необходимый и его выдавать 
        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            //Проверяет силектор на соответствие таргету и присвоит его если найдет у родителя
            target = target.closest('.service-header-tab');
            //Проверяем если в таргете что-то
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });

    };
    tabs();
});