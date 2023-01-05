var score;
var ul = document.querySelector('ul');
var btnClear = document.querySelector('#clear');
var storage = JSON.parse(localStorage.getItem('scores')) || [];

if (storage) {
    for (let i = 0; i < storage.length; i++) {
        var currentScore = storage[i];
        var li = document.createElement('li');
        li.setAttribute('class', 'list-unstyled text-center fs-3 list-group-item')
        li.setAttribute('id', 'clean')
        li.innerHTML = `<b>${currentScore.name} ~</b> ${currentScore.score}`;
        ul.appendChild(li);
    }
    console.log(storage);
}

btnClear.addEventListener('click', () => {
    localStorage.clear();
    document.getElementById('clean').textContent = '';
})