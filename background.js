console.log("Background.js running");
dict = [];
chrome.storage.sync.get(["lang","Dict","Reload","Text"],function(result){
     // console.log(result.lang)
     if(result.Dict==undefined){
          chrome.storage.sync.set({"Dict": dict});
     }
     if(result.lang==undefined){
          const lang = ['en','hi']
          chrome.storage.sync.set({"lang": lang});
     }
     if(result.Reload==undefined){
          chrome.storage.sync.set({"Reload": false});
     }
     if(result.Text==undefined){
          chrome.storage.sync.set({"Text": ""});
     }
})
