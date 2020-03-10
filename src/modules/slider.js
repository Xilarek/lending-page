
/*class SliderCarousel {
    constructor({slider, slide, dotsUl}){
        this.slider = document.querySelector(slider);
        this.slide = document.querySelector(slider).children;
        this.dotsUl = document.querySelector(dotsUl);
    }

    init() {
        this.addGloClass();
        this.addStyle();
    }

    addGloClass() {
        this.slider.classList.add('glo-slider');
        for ( const item of this.slide ) {
            item.classList.add('glo-slider__item');
        }
        this.dotsUl.classList.add('glo-slider');
    }

    addStyle() {
        const style = document.createElement('style');
        style.id = 'sliderCarusel-style';
        style.textContent = `

        `;
        document.head.append(style);
    }
}*/













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

export default slider;