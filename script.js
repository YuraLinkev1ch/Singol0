const chevLeft = document.getElementById('chev-left');
const chevRight = document.getElementById('chev-right');
const navigation = document.getElementById('navigation');
const phonesBlock = document.getElementById('phones');
const iphoneVertical = document.getElementById('iphone-vertical');
const iphoneHorizontal = document.getElementById('iphone-horizontal');
const firstScreen = document.getElementById('first-screen');
const secondScreen = document.getElementById('second-screen');
const firstPhoneButton = document.getElementById('first-phone-button');
const secondPhoneButton = document.getElementById('second-phone-button');

// плавный переход по ссылкам
const anchors = document.querySelectorAll('a[href^="#"]');

for (let anchor of anchors) {
    anchor.addEventListener("click", function(event) {
        event.preventDefault();
        const blockID = anchor.getAttribute('href')
        document.querySelector('' + blockID).scrollIntoView({
        behavior: "smooth",
        block: "start"
       })
    })
}

firstPhoneButton.addEventListener('click', ()=> {
    if(firstScreen.classList.contains('first-black-screen')){
        firstScreen.classList.remove('first-black-screen');
    } else {
        firstScreen.classList.add('first-black-screen');
    }
})

secondPhoneButton.addEventListener('click', ()=> {
    if(secondScreen.classList.contains('second-black-screen')){
        secondScreen.classList.remove('second-black-screen');
    } else {
        secondScreen.classList.add('second-black-screen');
    }
})

//tabs

function getImages () {
    let imagesNodeList = document.getElementById('portfolio-block');
    const lastPicture = document.getElementById('portfolio-block').lastChild;
    imagesNodeList.prepend(lastPicture);
}

let buttonsNodeList = document.getElementById('buttons-list');

buttonsNodeList.addEventListener('click', (event) => {
    if (event.target.tagName !== "BUTTON") return;
    buttonsNodeList.querySelectorAll('li > button').forEach(el => el.classList.remove('activeTab'));
    event.target.classList.add('activeTab');
    getImages();
});

const portfolioBlock = document.getElementById('portfolio-block');

portfolioBlock.addEventListener('click', (event)=> {
    portfolioBlock.querySelectorAll('div').forEach(el => el.classList.remove('activeCurrent'));
    event.target.classList.add('activeCurrent');
    portfolioBlock.classList.remove('activeCurrent');
})

// form

const button = document.getElementById('button__submit');
const mail = document.getElementById('mail');
const name = document.getElementById('name');
const subject = document.getElementById('subject');
const textarea = document.getElementById('textarea');
const subjectFill = document.getElementById('subjectFill');
const textareaFill = document.getElementById('textareaFill');
const form = document.querySelector(".form__wrapper");

function subjectFunc(string) {
    if (string === '') {
        return 'no subject';
    } else {
        return 'Тема: ' + string;
    }
}

function textareaFunc(string) {
    if (string === '') {
        return 'no description';
    } else {
        return 'Описание: ' + string;
    }
}

form.addEventListener("submit", () => submitHendler());


function submitHendler() {
    event.preventDefault();
        let isValid = form.checkValidity();
        if(isValid) {
            subjectFill.innerText = subjectFunc(subject.value.toString());
            textareaFill.innerText = textareaFunc(textarea.value.toString());
            document.getElementById('message-block').classList.remove('hidden');
        }
}

const closeBtn = document.getElementById('close-btn');

closeBtn.addEventListener('click', () => {
    name.value = '';
    mail.value = '';
    subject.value = '';
    textarea.value = '';
    document.getElementById('message-block').classList.add('hidden');
});

// carusel

let items = document.querySelectorAll('.carousel .item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active', direction);
	});
}

function showItem(direction) {
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('active');
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

document.querySelector('.chev-right').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

document.querySelector('.chev-left').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
	}
});

/*переключение меню*/

document.addEventListener('scroll', onScroll);

function onScroll() {
    const links = document.querySelectorAll('#navigation > .navigation__link > a');
    const indent = window.scrollY + 105;
    const sections = document.querySelectorAll('section');

    sections.forEach((el) => {
        if (el.offsetTop <= indent && (el.offsetTop + el.offsetHeight) > indent) {
            links.forEach((a) => {
                a.classList.remove('activeItem');
                if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                    a.classList.add('activeItem');
                };
            })
        }
    })

    const links2 = document.querySelectorAll('#menu > a');

    sections.forEach((el) => {
        if (el.offsetTop <= indent && (el.offsetTop + el.offsetHeight) > indent) {
            links2.forEach((a) => {
                a.classList.remove('activeItemMenu');
                if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                    a.classList.add('activeItemMenu');
                };
            })
        }
    })
}

//close menu
const menuLinks = document.querySelectorAll('#menu > a');
const checkBox = document.querySelectorAll('#menuToggle > input');

menuLinks.forEach(el => { 
    el.addEventListener('click', () => {
        checkBox[0].checked = false;
    })
});