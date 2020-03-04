const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const form = document.getElementById('form1'),
        form2 = document.getElementById('form2'),
        form3 = document.getElementById('form3');
    const allForm = [form, form2, form3];
     const placeholder = document.getElementsByName('user_phone');
     for ( let i = 0; i < placeholder.length; i++) {
         placeholder[i].placeholder = '+7(999)-999-99-99';
     }
    

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: #fff';


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
                        if (!/^[А-Яа-яЁё]*$/.test(value)) {check = false;}
                        break;
                    case 'user_phone':
                        if (!/^\+?[78]([-()]*\d){10}$/.test(value)) {check = false;}
                        break;
                    case 'user_message':
                        if (!/^[А-Яа-яЁё\,?\.?\-? ]+([а-яё\,?\.?\-? ]+)*$/gi.test(value)) {check = false;}
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
                allForm[i].reset();
                return;
            }
            
            statusMessage.textContent = loadMessage;

            const postData = body => fetch('./server.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });  

            postData(body).then((response) => {
                if(response.status !== 200) {
                    throw new Error('status network not 200');
                }
                statusMessage.textContent = successMessage;
            }, () => {
                statusMessage.textContent = errorMessage;
            });

            allForm[i].reset(); 
        });
    }

};

export default sendForm;