// CREATE AN EDITOR
// Initial data
let code = `    console.log("hello")    `;
let lang = "javascript";
var h_div = document.getElementById("editor");
var preview = document.getElementById("preview");
var editor;
let file_path;
const editorPreview =
  document.getElementById("editorPreview").contentWindow.document;



(function () {
  var oldLog = console.log;
  console.log = function (message) {
    preview.innerHTML += "> " + message + "</br>";
    oldLog.apply(console, arguments);
  };

  document.write = function (message) {
    preview.innerHTML += message;
  };
})();

function run() {
  let value = editor.getValue();
  if (lang == "html") {
    HTMLRun();
  } else {
    javascriptRun(value);
  }
}

function HTMLRun() {
  editorPreview.body.innerHTML = editor.getValue();
}
function javascriptRun(value) {
  preview.innerHTML = "";
  try {
    eval(value);
  } catch (err) {
    preview.innerHTML = "<pre class='error'> > " + err + "</pre>";
  }
}
function setConfigurations() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  if (params.file) {
    file_path = "/files/" + params.file;
  }
  if (params.language) {
    lang = params.language;
  }
}

function readTextFile(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        console.log(allText);
        editor.setValue(allText);
        preview.innerHTML = "";
        run();
        loadInstructions(file);
      }
    }
  };
  rawFile.send(null);
}

function loadInstructions(file) {
  var filepath = file.split(".").join("-ins.");
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", filepath, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        document.getElementById("ins").innerHTML = allText;
        
      }
    }
  };
  rawFile.send(null);
}

function init() {
  editor = monaco.editor.create(h_div, {
    value: code,
    language: lang,
    fontSize: "16px",
    theme: "vs-dark",
    automaticLayout: true, // <<== the important part
  });
  readTextFile(file_path);
}

