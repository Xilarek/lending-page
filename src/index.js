
    'use strict';

    import "@babel/polyfill";
    import elementClosest from 'element-closest';
    import 'nodelist-foreach-polyfill';
    import 'formdata-polyfill';
    import 'es6-promise';
    import 'fetch-polyfill';

    elementClosest(window);

    //Таймер
    import countTimer from './modules/countTimer';
    //Меню
    import toggleMenu from './modules/toggleMenu';
    //Плавное перемещение по якорям
    import scrollToBlock from './modules/scrollToBlock';
    //Pop-Up
    import togglePopUp from './modules/togglePopUp';
    //Tабы
    import tabs from './modules/tabs';
    //Слайдер
    import slider from './modules/slider';
    //Смена аватаров команды
    import command from './modules/command';
    //Валидатор рассчета стоимости
    import validatorDataInput from './modules/validatorDataInput';
    //Калькулятор
    import calc from './modules/calc';
    // send-ajax-form
    import sendForm from './modules/sendForm';

    //Таймер
    countTimer('6 March 2020');
    //Меню
    toggleMenu();
    //Плавное перемещение по якорям
    scrollToBlock();
    //Pop-Up
    togglePopUp();
    //Tабы
    tabs();
    //Слайдер
    slider();
    //Смена аватаров команды
    command();
    //Валидатор рассчета стоимости
    validatorDataInput();
    //Калькулятор
    calc(100);
    // send-ajax-form
    sendForm();
