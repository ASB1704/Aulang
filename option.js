console.log("options.js loaded");
// declaring the variables //
let wrapper = document.getElementById("wrapper");
let dictionary = document.getElementById("dictionary");
let selectLang1 = document.getElementById("selectLang1");
let selectLang2 = document.getElementById("selectLang2");
let btn = document.getElementById("btn");
let dict_btn = document.getElementById("dict_btn");
let backBtn = document.getElementById("backBtn");
let ClearDict = document.getElementById("ClearDict");
let dictWord = document.getElementById("dictWord");

// getting the stored value //
chrome.storage.sync.get(["lang", "Dict","Reload"], function (result) {
  lang = result.lang;
  selectLang1.value = lang[0];
  selectLang2.value = lang[1];
  var x, y;
  x = lang[0];
  y = lang[1];

  //selecting from the list - 1
  selectLang1.addEventListener("click", (item) => {
    x = selectLang1.value;
  });
  //selecting from the list - 2
  selectLang2.addEventListener("click", (item) => {
    y = selectLang2.value;
  });
  // setting the language //
  btn.addEventListener("click", () => {
    lang[0] = x;
    lang[1] = y;
    setlanguage();

    btn.innerHTML = `<i class="fa fa-check" aria-hidden="true"></i>`;
    setTimeout(() => {
      btn.innerHTML = `Set`;
    }, 1000);
  });

  // storing in the chrome storage //
  function setlanguage() {
    
    chrome.storage.sync.set({ "Reload": true });
    chrome.storage.sync.set({ lang: lang }, function () {
      console.log("Value is set : " + lang);
    });
  }

  // adding/printing the saved word in the dict //
  result.Dict.forEach((element, index) => {
    dictWord.innerHTML += `<li>${index + 1}.&nbsp;&nbsp;${element}</li>`;
  });

  dict_btn.addEventListener("click", () => {
    wrapper.style.zIndex = 0;
    dictionary.style.zIndex = 1;
  });
  backBtn.addEventListener("click", () => {
    wrapper.style.zIndex = 1;
    dictionary.style.zIndex = 0;
  });

  // clear all the words
  ClearDict.addEventListener("click", () => {
    if (result.Dict.length == 0) {
      alert("Already empty");
    } else {
      result.Dict.forEach((element) => {
        result.Dict = [];
        dictWord.innerHTML = "";
        chrome.storage.sync.set({ Dict: result.Dict }, function () {});
      });
    }
  });
});
