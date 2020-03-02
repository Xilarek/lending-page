document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    //Таймер
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
            const timer = getTimeRemaining();
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
    countTimer('1 March 2020');

    //Меню
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            btnMenuImg = btnMenu.querySelector('img'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuList = menu.querySelector('ul'),
            menuListLinks = menuList.querySelectorAll('a'),
            body = document.querySelector('body');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        const scrollToBlock = (index) => {
            for (let i = 0; i < menuListLinks.length; i++) {
                if (index === i) {
                    handlerMenu();
                }
            }
        };

        body.addEventListener('click', (event) => {
            let target = event.target,
                parent = target.parentNode;

            if (target === btnMenuImg) {
                handlerMenu();
            } else if (target === closeBtn) {
                handlerMenu();
            } else if (parent.tagName === 'li') {
                menuListLinks.forEach((item, i) => {
                    if (item === target) {
                        scrollToBlock(i);
                    }
                });
            } else if (target !== menu) {
                menu.classList.remove('active-menu');
            }
        });
    };
    toggleMenu();

    //Плавное перемещение по якорям
    const scrollToBlock = () => {

        const menu = document.querySelector('menu'),
            menuList = menu.querySelector('ul'),
            menuItem = menuList.querySelectorAll('a[href^="#"]');

        for (let anchor of menuItem) {
            anchor.addEventListener('click', (event) => {
                event.preventDefault();
                const blockId = anchor.getAttribute('href');
                document.querySelector(blockId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        }
    };
    scrollToBlock();

    //Pop-Up
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
                    const timer = setInterval(() => {
                        const timePassed = Date.now() - start;

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

    //Tабы
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

    //Слайдер
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),

            slider = document.querySelector('.portfolio-content'),
            dotsUl = document.querySelector('.portfolio-dots');


        //Переменная, которая будет содежать индекс текущего слайда, интервал и точку
        let currentSlide = 0,
            interval,
            dots = null;

        //Проверяем кол-во слайдеров и создаем необходимое кол-во точек
        const createPoints = () => {
            for (let i = 0; i < slide.length; i++) {
                let li = document.createElement('li');
                li.classList.add('dot');
                dotsUl.append(li);
            }
            dots = dotsUl.querySelectorAll('.dot');
        };

        //Функция смены слайда
        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);

        };
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        //автоматическое прелистывание слайдера
        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');
            currentSlide++;
            //Ограничиваем кол-во слайдов
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');

        };

        //Запуск и остановка слайдера
        const startSlider = (time = 2500) => {
            interval = setInterval(autoPlaySlide, time);
        };
        const stopSlider = () => {
            clearInterval(interval);

        };
        //Взаимодействие со слайдером вручную
        slider.addEventListener('click', (event) => {
            event.preventDefault();

            const target = event.target;

            //Ограничения на клик(если кликнули не на один из элементов)
            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            //Убираем активные классы утекущего слайда
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');

            //Проверяем на какую кнопку нажали
            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;

                //Присваиваем индекс исходя из того на какую точку мы кликнули
            } else if (target.matches('.dot')) {
                dots.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            //Добавляем классы тому слайду, который получился после проверки на условия
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                stopSlider();
            }
        });
        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                startSlider();
            }
        });
        createPoints();
        startSlider(2500);


    };
    slider();

    //Смена аватаров команды
    const command = () => {
        const command = document.getElementById('command');

        const svapImage = event => {
            const target = event.target;
            if (target.matches('img')) {
                [event.target.dataset.img, event.target.src] = [event.target.src, event.target.dataset.img];
            }
        };
        command.addEventListener('mouseover', svapImage);

        command.addEventListener('mouseout', svapImage);
    };
    command();

    //Валидатор рассчета стоимости
    const validateNumber = (elem, reg) => {
        elem.value = elem.value.replace(reg, '');
    };
    const validatorDataInput = () => {
        const calcBlock = document.querySelector('.calc-block');

        calcBlock.addEventListener('input', event => {
            const target = event.target;
            if (target.matches('input')) {
                if (target.matches('.calc-square')) {
                    validateNumber(target, /[^\d.]/ig);
                } else {
                    validateNumber(target, /[\D]/g);
                }
            }
        });


    };
    validatorDataInput();

    //Калькулятор
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSqare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSqare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }
            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 5 < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = Math.floor(price * (typeValue * squareValue * countValue * dayValue));
            }
            totalValue.textContent = total;
        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;
            //Создаем проверку, если событие прошло в одном из инпутов 
            if (target.matches('select') || target.matches('input')) {
                countSum();

            }
        });
    };
    calc(100);

    // send-ajax-form
    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так...',
            loadMessage = 'Загрузка',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

        const form = document.getElementById('form1'),
            form2 = document.getElementById('form2'),
            form3 = document.getElementById('form3');
        const allForm = [form, form2, form3];

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem; color: #fff';

        const postData = (body) => {
            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.open('POST', './server.php');
                request.setRequestHeader('Content-Type', 'application/json');
                request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return;
                }
                if (request.status === 200) {
                    resolve();
                } else {
                    reject(request.statusText);
                }
            });
            request.send(JSON.stringify(body));
            });
            
        };

        for (let i = 0; i < allForm.length; i++) {
            allForm[i].addEventListener('submit', (event) => {
                event.preventDefault();
                allForm[i].append(statusMessage);
                const formData = new FormData(allForm[i]);

                let body = {};
                let check = true;

                //Валидация
                formData.forEach((value, key) => {
                    switch (key) {
                        case 'user_name':
                            if (!/^[А-ЯЁ ][а-яё ]*$/.test(value)) {check = false;}
                            break;
                        case 'user_phone':
                            if (!/^\+?[78]([-()]*\d){10}$/.test(value)) {check = false;}
                            break;
                        case 'user_message':
                            if (!/^[А-ЯЁ\,?\.?\-? ]+([а-яё\,?\.?\-? ]+)*$/gi.test(value)) {check = false;}
                            break;
                    }
                    console.log(check);
                    body[key] = value;
                    
                });
                setTimeout(() => {
                    statusMessage.remove();
                }, 10000);
                
                if (!check) {
                    statusMessage.textContent = 'Не валидные данные';
                    return;
                }
                
                statusMessage.textContent = loadMessage;

                postData(body).then(() => {
                    statusMessage.textContent = successMessage;
                }, () => {
                    statusMessage.textContent = errorMessage;
                });
    
                allForm[i].reset(); 
            });
        }
 
    };
    sendForm();
});