'use strict';

let NewsAlert = (function () {
    function Controller() {
        let moduleModel = null;
        let uiElem = null;
        let moduleOptions = null;

        this.init = function (model, ui, options) {
            moduleModel = model;
            uiElem = ui;
            moduleOptions = options;

            // window.addEventListener('load', this.makeAlert);
            setTimeout(function(){this.makeAlert()}.bind(this));
            uiElem.body.addEventListener('click', this.removeAlertHandler);
        }

        this.makeAlert = function () {
            moduleModel.makeAlert(moduleOptions);
        }

        this.removeAlertHandler = function (ev) {
            moduleModel.removeAlertHandler(ev, uiElem);
        }
    }

    function Model() {
        let moduleView = null;
        let alertList = [];

        this.init = function (view) {
            moduleView = view;
        }

        this.setStorage = function(){
            sessionStorage['alertList'] = JSON.stringify(alertList);
        }

        this.getStorage = function(){
            if(sessionStorage['alertList']) {
                let alert = function(text, session){
                    this.id = 0;
                    this.text = text;
                    this.show = true;
                    this.autoIndex = function(){
                        this.id = alertList.indexOf(this);
                    }
                    this.session = session;
                }
                let alerts = JSON.parse(sessionStorage['alertList']);
                alerts.forEach(x=>{
                    this.addAlertList(new alert(x.text, x.session));
                });
            } else {
                this.setStorage();
            }
        }

        this.makeAlert = function (options) {
            let alert = function(text){
                this.id = 0;
                this.text = text;
                this.show = true;
                this.autoIndex = function(){
                    this.id = alertList.indexOf(this);
                }
                this.session = 'on';
            }
            this.getStorage();
            if(this.changedValid(options)) this.resetStorage();
            if(alertList.length==0 || alertList[0]==null){
                options.alertlist.forEach((news)=>{
                    this.addAlertList(new alert(news));
                });
            }
            this.setStorage();
            this.updateView();
        }

        this.resetStorage = function(){
            sessionStorage['alertList'] = '';
            alertList = [];
        }

        this.changedValid = function(options){
            for(let valid in options.alertlist){
                if(alertList[valid] && options.alertlist[valid].trim() != alertList[valid].text.trim()) return true;
            }
            if(options.alertlist.length != alertList.length) return true;
            return false;
        }

        this.removeAlertHandler = function (ev, ui) {
            let target = ev.target;
            if (target.tagName !== 'SPAN' || target.className !== 'news-close') return;
            ev.preventDefault();
            let id = target.parentNode.dataset.newsAlertTag;
            alertList = alertList.map(alert=>{
                if(alert.id==id) {
                    alert.session = 'off';
                }
                return alert;
            });
            this.setStorage();
            this.updateView();
        }

        this.addAlertList = function (alert) {
            alertList.push(alert);
            alertList.forEach(alert=>alert.autoIndex());
        }

        this.updateView = function () {
            let usableSession = alertList.filter(alert=>alert.session!=='off');
            moduleView.updateView(usableSession);
        }
    }

    function View() {
        let uiElem = null;

        this.init = function (ui) {
            uiElem = ui;

            document.body.insertAdjacentHTML('afterBegin','<div news-alert></div>');
        }

        this.updateView = function (alertList) {
            let view = document.body.querySelector('[news-alert]')
            this.clearView(view);
            alertList.forEach(alert=>{
                view.innerHTML += `<div data-news-alert-tag="${alert.id}"><span class="alert-text">${alert.text}</span>
                <span class="news-close">&times;</span>
                </div>
                    `;
            });
        }

        this.clearView = function(view){
            view.innerHTML = '';
        }
    }
    return {
        init: function (options) {
            const body = document.body;

            const ui = {
                body
            };

            const view = new View();
            const model = new Model();
            const controller = new Controller();

            view.init(ui);
            model.init(view);
            controller.init(model, ui, options);
        }
    }
})();

window.addEventListener('scroll', function(ev){
    let tops = document.querySelector('.gotop');
    if(tops){
        if(document.body.scrollTop>window.innerHeight*0.5){
            tops.classList.remove('hide');
            tops.classList.add('show');
        } else {
            tops.classList.remove('show');
            tops.classList.add('hide');
        }
    }
}, true);

setTimeout(()=>{
    for(let i=1; i<=6; i++){
        let h = document.querySelectorAll(`h${i}`);
        h.forEach(x=>{
            let id = x.getAttribute("id");
            if(id){
                x.style.cssText = 'position: relative;';
                let a = document.createElement('a');
                a.href=`#${id}`;
                a.classList.add('linkpop');
                a.innerHTML = `🔗`;
                x.prepend(a);
            }
        });
    }
    if(document.querySelector('[data-value]')){
        document.querySelectorAll('span[data-value]').forEach(x=>{
            let per = x.dataset.value;
            let span = document.createElement('span');
            let span2 = document.createElement('span');
            span.classList.add('value');
            
            x.appendChild(span);
            span2.classList.add("ms-2");
            x.parentNode.appendChild(span2);
            // span2.innerHTML = `${per}%`;
            let i = 1;
            let set = setInterval(()=>{
                let num = i.toFixed(0);
                span.style.cssText = `
                    width: ${i}%;
                `;
                span2.innerHTML = `${num}%`;
                if(i==per){
                    clearInterval(set);
                }
                i+=0.5;
            }, 10);
        })
    }

    function valid(){
        let name = document.querySelector('[name="name"]');
        let email = document.querySelector('[name="email"]');
        let phone = document.querySelector('[name="phone"]');
        let x,y,z = [false,false,false]
        let rex1 = /^[가-힣]{2,4}$/gi;
        if(rex1.test(name.value)==true){
            console.log('이름 통과');
            x=true;
        }
        let rex2 = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/gi
        if(rex2.test(email.value)==true){
            console.log('메일 통과');
            y=true;
        }
        let rex3 = /^[0-9]+$/gi
        if(rex3.test(phone.value)==true){
            console.log('번호 통과');
            z=true;
        }
        if(x && y && z){
            return true;
        } else {
            alert('이름, 번호, 이메일란을 다시 확인해주세요.');
            return false;
        }
    }
    
    if(document.getElementById('sendMail'))
    document.getElementById('sendMail').addEventListener('click', function () {
        let name = document.querySelector('[name="name"]');
        let email = document.querySelector('[name="email"]');
        let message = document.querySelector('[name="message"]');
        let phone = document.querySelector('[name="phone"]');
        let type = document.querySelector('[name="type"]');
        
        if(valid()){
            let url = `https://script.google.com/macros/s/AKfycbzcKHV1ldNC0BmgldYDLEMGjqYdWCqkn-G85ptXK1Y9woc835I/exec`;
            fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`, {
                method: 'post',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrer: 'no-referrer',
                body: JSON.stringify({
                    name: name.value,
                    message: message.value,
                    email: email.value,
                    phone: phone.value,
                    type: type.value==1?'질문':'제안'
                })
            })
            .then(response => {
                if (response.ok) return response.json()
                throw new Error('Network response was not ok.')
            })
            .then(data => {
                // console.log(data.contents)

                alert(`${name.value}님의 메일이 발송되었습니다.`);
                name.value='';
                email.value='';
                message.value='';
                phone.value='';
                type.value='';

            });
            
        }
    
    });
});

setTimeout(()=>{
    setTimeout(()=>{
        settingHandler();
    });
    NewsAlert.init({
        alertlist: [
            '현재 포트폴리오 페이지는 kimson의 Penli CSS로 제작되었습니다. <a href="https://github.com/kkn1125/penli">Penli Github</a>',
        ]
    });
},500);

function requestLatestPenli(path){
    let url = 'https://cdn.jsdelivr.net/gh/kkn1125/penli@vlatest/docs/assets/css/penli.css';
    if(path)url = path;
    return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
  .then(response => {
    if (response.ok) return response.json()
    throw new Error('Network response was not ok.')
  });
}

function versionCheck(contents, path){
    let getVersion = (content) => content.split('\n')[1].match(/v[0-9\.]+/gm)[0];
    requestLatestPenli(path).then(data=>{
        let myVersion = getVersion(data.contents);
        if(getVersion(contents) == myVersion) console.debug('현재 Penli는 최신버전입니다.');
        else console.warn(`Penli가 업데이트 되었습니다. 최신버전은 ${getVersion(contents)}이며, 현재 버전은 ${myVersion}입니다. 버전 업데이트를 원하시면 아래 경로를 참고해주세요. https://kkn1125.github.io/penli`);
    })
}

let resources = window.performance.getEntriesByType("resource");
for(let resource in resources) {
    if(resources[resource].name.indexOf('penli')>-1){
        requestLatestPenli()
        .then(data=>versionCheck(data.contents, resources[resource].name))
        .catch(error=>console.error(error.message));
        break;
    }
};