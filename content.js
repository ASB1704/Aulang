console.log("Content script loaded");
// creating elemnt div for appending in the body of the webpage
elemDiv = document.createElement("div");
elemDiv.id = "toolbar";
elemDiv.style.cssText = `position:absolute;
                         max-width:350px;
                         border-radius: 5px;
                         border: 1px solid gray;
                         box-shadow: 0px 2px 4px #333;
                         padding:10px;
                         top:0;
                         display:none;
                         left:0;
                         opacity:1;
                         z-index:1000000;
                         background:#fff;`;
document.body.appendChild(elemDiv);
// getting the set languages //
var language;
chrome.storage.sync.get(["lang", "Dict","Text"], function (result) {
  console.log(result.Text)
  language = result.lang;
  // fetching the html file //
  fetch(chrome.runtime.getURL("/foo.html"))
    .then((response) => response.text())
    .then((data) => {
      elemDiv.innerHTML = data;
      let head = document.getElementById("word");
      let hindiWord = document.getElementById("hindiMean");
      let Add_dict = document.getElementById("Add_to_dict");
      let ol = document.getElementById("orderedList");

      // selecting the text //
      window.addEventListener("dblclick", WordSelected);
      function WordSelected(e) {
        let selectedtext = window.getSelection().toString();
        chrome.storage.sync.set({"Text": selectedtext});

        
        // getting the mouse position //
        mx = e.clientX;
        my = e.clientY;
        console.log(mx,my)
        let scroll = document.documentElement.scrollTop;
        elemDiv.style.display = "block";
        const toolbar = document.getElementById('toolbar').getBoundingClientRect()
        console.log(toolbar)
        if (selectedtext.length > 0 && selectedtext != " ") {
          if( mx+toolbar.width > window.innerWidth || my+toolbar.height > window.innerHeight){
            elemDiv.style.left = `${mx-200}px`;
          elemDiv.style.top = `${
            my -  200 + scroll
          }px`
          }else{
            elemDiv.style.left = `${mx}px`;
            elemDiv.style.top = `${
              my - (window.outerHeight - window.innerHeight) + 110 + scroll
            }px`;
          }

          // loading effect for text //
          head.innerText = "...";
          hindiWord.innerText = "...";
          ol.innerHTML = `getting...`;

          // fetching the meaning and hindi meaning //
          const options = {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "db553e6076msh6431e04f8d54b9ep1c4067jsna3eb30d8d7c2",
              "X-RapidAPI-Host":
                "translated-mymemory---translation-memory.p.rapidapi.com",
            },
          };
          // fetching the hindi meaning //
          fetch(
            `https://translated-mymemory---translation-memory.p.rapidapi.com/api/get?langpair=${language[0]}|${language[1]}&q=${selectedtext}&mt=1&onlyprivate=0&de=a%40b.c`,
            options
          )
            .then((response) => response.json())
            .then((response) => {
              translate = response.matches;
              hindiWord.innerText = "";
              translate.forEach((element, index) => {
                hindiWord.innerText += element.translation + " / ";
              });
            });
          // fetching the meanings of the word //
          let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedtext}`;
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              let arr = data[0].meanings[0].definitions;
              let len = Math.min(5, arr.length);
              head.innerText = selectedtext;

              ol.innerHTML = ``;
              for (i = 0; i < len; i++) {
                ol.innerHTML += `<li>${arr[i].definition}</li><br>`;
              }
            })
            .catch((error) => {
              head.innerText = selectedtext;
              ol.innerHTML = `No definitions found ☹️...`;
            });
        }
      }


      
      Add_dict.addEventListener("click", () => {
        Add_dict.innerHTML = `Added 📝`;
        setInterval(() => {
          Add_dict.innerHTML = `Add to dictionary`;
        }, 1000);
        chrome.storage.sync.get(["Text","Dict"], function (result) {
          let a = result.Dict;
          a.push(result.Text)
          
          chrome.storage.sync.set({ Dict: a });
        })
      });

      
});
});


// deleting the popup element //
document.body.addEventListener("click", (e) => {
  let opt = elemDiv.getBoundingClientRect();
  if (
    e.clientX < opt.x ||
    e.clientX > opt.x + opt.width ||
    e.clientY < opt.y ||
    e.clientY > opt.y + opt.height
  ) {
    elemDiv.style.display = "none";
   
  }
});
