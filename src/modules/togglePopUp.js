const togglePopUp = () => {
    const popUp = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupContent = document.querySelector('.popup-content'),
        //Время анимации
        timeAnimate = 1700,
        pixelStep = 8,
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

export default togglePopUp;