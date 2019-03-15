const nav = document.getElementsByTagName("nav")[0];
console.log(nav);
let lis = nav.getElementsByTagName("li");
let ul = nav.getElementsByTagName("ul")[0];
let hamburger = document.getElementsByClassName("hamburger")[0];
hamburger.addEventListener("click", evt => {
    console.log(lis);
    console.log(ul);
    console.log(hamburger);
    if (ul.className.includes("menuOpen")){
        ul.className = "";
    }
    else {
        ul.className = "menuOpen";
    }
    for(let i = 0; i<lis.length;i++){
        if(!lis[i].className.includes("hamburger")) {
            let txt = "";
            if (lis[i].className.includes("active"))
                txt = "active ";
            if (lis[i].className.includes("visible")) {

                txt += "hidden";
            } else {
                txt += "visible";
            }
            lis[i].className=txt;
        }
    }
});
