window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent'),
        descBtn = document.querySelectorAll('.description-btn');


    const hideTabContent = (a) => {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    };
    hideTabContent(1);

    const showTabContent = (b) => {
        if(tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    };

    const addPopup = (c) => {
        descBtn[c].addEventListener('click', () => {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    };
    addPopup(0);
  

    info.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i < tab.length; i++) {
                if(target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    addPopup(i);
                    break;
                }
            }
        }
    });




    // Timer


    const deadLine = '2020-01-12';

    const getTimeRemaining = (endtime) => {
        let t = Date.parse(endtime) - Date.parse(new Date()) - 10800000,
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000/60) % 60),
            hours = Math.floor((t / (1000*60*60)));

            if (hours < 10 ) {
                hours = '0' + hours;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (seconds < 10) {
                seconds = '0' + seconds;
            }

    


        // hours = Math.floor((t / 1000/60/60) % 24),
        // days = Math.floor((t / (1000*60*60*24)));

        return {
            'total' : t,
            'hours': hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    };


    const setClock = (id, endtime) => {
        let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000);

        function updateClock () {
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    };

    setClock('timer', deadLine);



    // Modal


    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay');
        close = document.querySelector('.popup-close');

    more.addEventListener('click', () => {
        overlay.style.display = 'block';
        // this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', () =>{
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    // Form

    let message = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');




    // form.addEventListener('submit', function(event) {
    //     event.preventDefault();
    //     form.appendChild(statusMessage);

    //     let request = new XMLHttpRequest();
    //         request.open('POST', 'server.php');
    //         request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
    //         // request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    //     let formData = new FormData(form);





        // let obj = {};
        // formData.forEach(function(value, key){
        //     obj[key] = value;
        // });
        // let json = JSON.stringify(obj);


    //     request.send(formData);
    //     // request.send(json);

    //     request.addEventListener('readystatechange', function(){
    //         if (request.readyState < 4) {
    //             statusMessage.innerHTML = message.loading;
    //         } else if (request.readyState === 4 && request.status == 200) {
    //             statusMessage.innerHTML = message.success;
    //         } else {
    //             statusMessage.innerHTML = message.failure;
    //         }
    //     });


    //     for (let i = 0; i < input.length; i++) {
    //         input[i].value = '';
    //     }
    // });




    // Contact Form



    // let footForm = document.querySelector('#form');


    // footForm.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     footForm.appendChild(statusMessage);

    //     let req = new XMLHttpRequest;
    //         req.open('POST', 'server.php');
    //         req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    //     let reqData = new FormData(footForm);

    //     let ob = {};

    //     reqData.forEach(function(value, key){
    //     ob[key] = value;
    //     });

    //     console.log(ob);

    //     let jso = JSON.stringify(ob);

    

    //         // req.send(footForm);
    //     req.send(jso);

    //     req.addEventListener('readystatechange', function(){
    //         if (req.readyState < 4) {
    //             statusMessage.innerHTML = message.loading;
    //         } else if (req.readyState === 4 && req.status == 200) {
    //             statusMessage.innerHTML = message.success;
    //         } else {
    //             statusMessage.innerHTML = message.failure;
    //         }
    //     });

    //     for (let i = 0; i < input.length; i++) {
    //         input[i].value = '';
    //     }
    // });
    


    // Contact Form | Promises


    function sendForm(elem) {
        elem.addEventListener('submit', function (e) {
            e.preventDefault();
            elem.appendChild(statusMessage);
            let formData = new FormData(elem);

            function postData(data) {
                return new Promise(function (resolve, reject) {
                    let request = new XMLHttpRequest();
                        request.open('POST', 'server.php');
                        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                        request.onreadystatechange = function () {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4) {
                            if (request.status === 200 && request.status < 3) {
                                resolve();
                            } else {
                                reject();
                            }
                        }
                    };
                    request.send(data);
                });
            } // End PostData

            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }
            
            postData(formData)
                .then(() => statusMessage.innerHTML = message.loading)
                .then(() => statusMessage.innerHTML = message.success)
                .catch(() => statusMessage.innerHTML = message.failure)
                .then(clearInput);
        });
    }
    
    sendForm(form);



    // Slider

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot'),
        wrap = document.querySelector('.wrap');

    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event){
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlide(i);
            }
        }
    });

    // автопереключение слайдов

    // function autoPlay() {
    //     plusSlides(1);
    // }
    // let timerID = setInterval(autoPlay, 1000);


    // wrap.addEventListener('mouseover', (event) => {
    //         console.log('навел и остановил');
    //         console.log(event.target);
    //         clearInterval(timerID);
    // });
            
    // wrap.addEventListener('mouseout', () => {
        
    // });       




    let hover;
    wrap.addEventListener('mousemove', () => hover = true);
    wrap.addEventListener('mouseout', () => hover = false);
    setInterval(() => !hover && plusSlides(1), 10000);

    // wrap.addEventListener('click', () => {
    //     let a = Math.random();
    //     a = a * 10000;
    //     a = Math.round(a);
    //     console.log(a);
    // })
    

    // Calc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0,
        schet = document.querySelector('.schet');

    totalValue.innerHTML = 0;


    persons.addEventListener('change', function () {
        personsSum = +this.value;
        total = (daysSum + personsSum)*4000;

        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });


    restDays.addEventListener('change', function () {
        daysSum = +this.value;
        total = (daysSum + personsSum)*4000;

        if (persons.value == '' || restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });


    place.addEventListener('change', function(){
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });


    schet.addEventListener('click', function(){
        total = (daysSum + personsSum)*4000;
    });


});
