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

export default scrollToBlock;