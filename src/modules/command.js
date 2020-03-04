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

export default command;