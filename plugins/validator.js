'use strict';
class Validator {
    constructor({
        selector,
        pattern = {},
        method
    }) {
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method;
        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' &&
                item.type !== 'button';
        });
        this.error = new Set();
    }

    init() {
        this.applyStyle();
        this.setPattern();
        this.elementsForm.forEach(elem => elem.addEventListener('change', this.chekIt.bind(this)));
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            this.elementsForm.forEach( elem => this.chekIt({target: elem}));
            if (this.error.size) {
                event.preventDefault();
            }
        });
    }

    isValid(elem) {
        const validatorMetod = {
            notEmpty(elem) {
                if (elem.value.trim() === '') {
                    return false;
                }
                return true;
            },
            pattern(elem, pattern) {
                return pattern.test(elem.value);
            }
        };
        if(this.method) {
            const method = this.method[elem.id];

        if (method) {
            return method.every(item => {
                return validatorMetod[item[0]](elem, this.pattern[item[1]]);
            });
        } else {
            console.warn('Необходимо передать id полей ввода и методы проверки этих полей');
        }

        }

        return true;
    }

    chekIt(event) {
        //Запуск проверки на валидиность
        const target = event.target;
        if (this.isValid(target)) {
            this.showSuccess(target);
            this.error.delete(target);
        } else {
            this.showError(target);
            this.error.add(target);
        }
    }




    showError(elem) {
        elem.classList.remove('success');
        elem.classList.add('error');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);
    }

    showSuccess(elem) {
        elem.classList.remove('error');
        elem.classList.add('success');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            elem.nextElementSibling.remove();
        }
    }

    applyStyle() {
        const style = document.createElement('style');
        style.textContent = `
        input.success {
            border: 2px solid green
        }
        input.error {
            border: 2px solid red
        }
        .validator-error {
            font-size: 17px;
            font-family: sans-serif;
            color: red
        }

        `;
        document.head.appendChild(style);
    }

    setPattern() {
        if (!this.pattern.form1Name || !this.pattern.form2Name ||
             !this.pattern.form3Name) {
            this.pattern.youName = /^[А-ЯЁ][а-яё]*$/;
        }
        
        if (!this.pattern.form2Message) {
            this.pattern.youMessage = /^[А-ЯЁ\,?\.?\-? ]+([а-яё\,?\.?\-? ]+)*$/gi;
        }
        if (!this.pattern.form2Email || !this.pattern.form1Email ||
             !this.pattern.form3Email) {
            this.pattern.email = /^\w+@\w+\.\w{2,}$/;
        }
        

        if (!this.pattern.form2Phone || !this.pattern.form1Phone ||
             !this.pattern.form3Phone) {
            this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
        }
        

    }
}