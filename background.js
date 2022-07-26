console.log("Background.js running");
dict = [];
chrome.storage.sync.get(["lang" , "Dict","Reload"],function(result){
     if(result.Dict==undefined){
          chrome.storage.sync.set({"Dict": dict});
     }
     if(result.Reload==undefined){
          chrome.storage.sync.set({"Reload": false});
     }
})
