var path = window.location.href;
const pathnames = "/portfolio/gitrepo/";
var now = window.location.pathname.substring(pathnames.length-1);
console.log(path);
// console.log(window.location.hostname);
console.log(now);

/* 도큐먼트 로드시 link, script태그 삽입 */
document.addEventListener("DOMContentLoaded", function(){
    var lnk = document.createElement("link");
    lnk.setAttribute("rel", "stylesheet");
    lnk.setAttribute("href", "assets/fontawesome/css/all.css");
    document.head.appendChild(lnk);
    var lnk1 = document.createElement("link");
    lnk1.setAttribute("rel", "stylesheet");
    lnk1.setAttribute("href", "assets/fontawesome/css/fontawesome.css");
    document.head.appendChild(lnk1);
    var lnk2 = document.createElement("link");
    lnk2.setAttribute("rel", "stylesheet");
    lnk2.setAttribute("href", "assets/fontawesome/css/brands.css");
    document.head.appendChild(lnk2);
    var lnk3 = document.createElement("link");
    lnk3.setAttribute("rel", "stylesheet");
    lnk3.setAttribute("href", "assets/fontawesome/css/solid.css");
    document.head.appendChild(lnk3);
    
    var script = document.createElement("script");
    script.setAttribute("defer", "");
    script.setAttribute("src", "assets/fontawesome/js/all.js");
    document.head.appendChild(script);
    var script1 = document.createElement("script");
    script1.setAttribute("defer", "");
    script1.setAttribute("src", "assets/fontawesome/js/fontawesome.js");
    document.head.appendChild(script1);
    var script2 = document.createElement("script");
    script2.setAttribute("defer", "");
    script2.setAttribute("src", "assets/fontawesome/js/brands.js");
    document.head.appendChild(script2);
    var script3 = document.createElement("script");
    script3.setAttribute("defer", "");
    script3.setAttribute("src", "assets/fontawesome/js/solid.js");
    document.head.appendChild(script3);
    var script4 = document.createElement("script");
    script4.setAttribute("defer", "");
    script4.setAttribute("src", "assets/dist/js/dbsource.js");
    document.head.appendChild(script4);
    
});

/* 헤더와 푸터를 자동 삽입 */
window.addEventListener('load', function(){
    var allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function(el){
        var includePath = el.dataset.includePath;
        if(includePath){
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                if(this.readyState==4&&this.status==200){
                    el.outerHTML = this.responseText;
                }
            };
            xhttp.open('GET', includePath, true);
            xhttp.send();
        }
    });
});

/* 페이지별 타이들을 자동 설정 */
$(document).ready(function(e){
    let currentPath = now.split("/")[now.split("/").length-1].split(".")[0];
    document.title = `Kims ${currentPath}`; // 타이틀 페이지별 자동 변경
});