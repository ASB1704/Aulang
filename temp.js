console.log("Content script loaded");
window.addEventListener("mouseup", WordSelected);
// var elemDiv = document.createElement('div');
// document.body.appendChild(elemDiv);
function WordSelected() {
  let selectedtext = window.getSelection().toString();
  // if(selectedtext.length>0){
  // let message = {
  //      txt:selectedtext
  // }
  // chrome.runtime.sendMessage(message)
  // }
  window.addEventListener("click", (e) => {
    mx = e.clientX;
    my = e.clientY;
    let scroll = document.documentElement.scrollTop;
    if (selectedtext.length != 0) {
      window.elemDiv = document.createElement("div");
      elemDiv.style.cssText = `position:absolute;
                                       min-width:200px;
                                       border-radius: 5px;
                                        border: 1px solid gray;
                                        box-shadow: 0px 2px 4px #333;
                                        padding:10px;
                                       left:${mx}px;
                                       top:${
                                         my -
                                         (outerHeight - innerHeight) +
                                         110 +
                                         scroll
                                       }px;
                                       opacity:1;
                                       z-index:1000000;
                                       background:#fff;`;
      document.body.appendChild(elemDiv);

      let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedtext}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          let arr = data[0].meanings[0].definitions;
          let len = Math.min(5, arr.length);
          elemDiv.innerText = "";
          elemDiv.innerHTML = `<h3 style="display: inline-block;
          color:#333;
          font-weight: bold;
          font-size:1rem">${selectedtext}</h2>
          <div style="padding:5px 0;"> <p style="padding:3px 0 8px 0;">meaning : </p>
          <ol id="orderedList"></ol>
          </div>`;
          let ol = document.getElementById("orderedList");
          for (i = 0; i < len; i++) {
            ol.innerHTML += `<li>${i + 1} - ${arr[i].definition}</li><br>`;
          }
        });
    }
  });
}

// left:${mx}px;
// top:${
//   my -
//   (outerHeight - innerHeight) +
//   110 +
//   scroll
// }px;


//  <button id="copy" style="position:absolute;right:10px; padding:5px 10px; border:none;border-radius:3px;box-shadow:0 2px 4px blue;cursor:pointer;background-color:cyan;color:#333;">Copy</button>

// <button id="translate" 
//                style="position:absolute;
//                padding:5px 10px;
//                border:none;
//                border-radius:3px;
//                cursor:pointer;
//                background-color:#2035b1;
//                right:10px;
//                color:#fff;">Translate</button>




/* completed code okay !! */
/*
console.log("Content script loaded");
window.addEventListener("dblclick", WordSelected);
elemDiv = document.createElement("div");
elemDiv.style.cssText = `position:absolute;
                                       width:300px;
                                       border-radius: 5px;
                                        border: 1px solid gray;
                                        box-shadow: 0px 2px 4px #333;
                                        padding:10px;
                                       height:200px
                                       top:0;
                                       display:none;
                                       left:0;
                                       opacity:1;
                                       z-index:1000000;
                                       background:#fff;`;
document.body.appendChild(elemDiv);
let html = `<div> <p style="margin:5px 0;
              color:red;
               ">meaning : </p>
               <ol id="orderedList" 
               style="color:#000;">
               </ol>
               </div>`;
elemDiv.innerHTML = html;
btn = document.getElementById("translate");

function WordSelected(e) {
     elemDiv.innerHTML = `<h2 style="margin:0;color:#000">getting meaning...</h2>`
  let selectedtext = window.getSelection().toString();
  mx = e.clientX;
  my = e.clientY;
  let scroll = document.documentElement.scrollTop;
  if (selectedtext.length != 0) {
    elemDiv.style.left = `${mx}px`;
    elemDiv.style.top = `${
      my - (window.outerHeight - window.innerHeight) + 110 + scroll
    }px`;
    elemDiv.style.display = `block`;

    console.log("fetch ke opr");
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "db553e6076msh6431e04f8d54b9ep1c4067jsna3eb30d8d7c2",
        "X-RapidAPI-Host":
          "translated-mymemory---translation-memory.p.rapidapi.com",
      },
    };

    fetch(
         `https://translated-mymemory---translation-memory.p.rapidapi.com/api/get?langpair=en|hi&q=${selectedtext}&mt=1&onlyprivate=0&de=a%40b.c`,
         options
         )
         .then((response) => response.json())
         .then((response) => {
              translate = response.matches[0].translation;
              
        let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedtext}`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            let arr = data[0].meanings[0].definitions;
            let len = Math.min(5, arr.length);
            elemDiv.innerText = "";
            elemDiv.innerHTML =
              `<h2 style="display: inline-block;
                   color:#333;
                   font-weight: bold;
                   margin:0;
                   font-size:1.5rem;color:#000;">${selectedtext}</h2><span style="padding-left:8px;color:#000;">${translate}</span>
                   ` + html;
            let ol = document.getElementById("orderedList");
            for (i = 0; i < len; i++) {
              ol.innerHTML += `<li>${arr[i].definition}</li><br>`;
            }
          });
      });
  }
}



document.body.addEventListener("click", (e) => {
  let opt = elemDiv.getBoundingClientRect();
  if (
    e.clientX < opt.x ||
    e.clientX > opt.x + opt.width ||
    e.clientY < opt.y ||
    e.clientY > opt.y + opt.height
  ) {
    elemDiv.style.display = "none";
    elemDiv.innerHTML = "";
    console.log("done");
  }
  
});
*/