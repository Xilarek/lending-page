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

export default validatorDataInput;