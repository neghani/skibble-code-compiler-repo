// CREATE AN EDITOR
// Initial data
let JS_CODE = `    console.log("hello")    `;
var h_div = document.getElementById("editor");
var preview = document.getElementById("preview");
var editor = monaco.editor.create(h_div, {
  value: JS_CODE,
  language: "javascript",
});

var run = () => {
  preview.innerHTML = "";
  try {
    var value = eval(editor.getValue());
  } catch (err) {
    preview.innerHTML = "<pre class='error'>" + err + "</pre>";
  }
};

(function () {
  var oldLog = console.log;
  console.log = function (message) {
    // DO MESSAGE HERE

    preview.innerHTML += message + "</br>";
    oldLog.apply(console, arguments);
  };
})();
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
if (params.file) {
  readTextFile("./files/" + params.file);
}
function readTextFile(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        editor.setValue(allText);
        preview.innerHTML = "";
      }
    }
  };
  rawFile.send(null);
}
