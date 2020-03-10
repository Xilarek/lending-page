const scrollToBlock = () => {

    const menu = document.querySelector('menu'),
        menuList = menu.querySelector('ul'),
        menuItem = menuList.querySelectorAll('a[href*="#"]'),
        scrollBtn = document.querySelector('.scroll');
        console.log(scrollBtn);

        const links = [...menuItem, scrollBtn];

    links.forEach(anchor => {
        anchor.addEventListener('click', (event) => {
            event.preventDefault();
            const blockId = anchor.getAttribute('href').substr(1);
            document.getElementById(blockId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
});
};

export default scrollToBlock;