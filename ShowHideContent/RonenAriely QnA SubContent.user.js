// ==UserScript==
// @name         RonenAriely QnA SubContent
// @namespace    https://ariely.info/
// @icon         http://ariely.info/favicon.ico
// @version      1.2
// @description  I hate the new interface which make me open each thread in seperate page only in order to view if I actually want to respond. Therefore I create this extenation to show the contact of the question.
// @author       Ronen Ariely
// @match        https://docs.microsoft.com/en-us/answers/index.html
// @match        https://docs.microsoft.com/en-us/answers/index.html?*
// @grant        GM_addStyle
// @grant        GM.xmlHttpRequest
//
// @resource icon1 ariely.info\ariely.info/favicon.ico
// ==/UserScript==

/************** Edit this section as you like ********/
//
//
//

/************** History and future ******************
2020-06-15 : first version is up

****************************************************/

//--- Style our newly added elements using CSS.
GM_addStyle ( RonenAriely ( function () {/*!
    body { color: white; background-color: black; } img { border: 0; }"
    #ArielyButtonID {
         width: 100%;
    }
*/} ) );


var $ = window.jQuery;

// alert('Hello, this page is using Ronen Ariely extentation. it is still in preview. hope you like it');

function RonenAriely (zEvent) {
    window.onload = RonenArielyOnLoad();
}

function RonenArielyOnLoad () {

    var RonenArielyDiv = document.createElement("div");
    RonenArielyDiv.setAttribute("id", "RonenArielyDiv");
    RonenArielyDiv.style.border = "1px solid #0000FF";
    RonenArielyDiv.innerHTML = "Ronen Ariely Scripts: "
    var MainNavbar = document.getElementById("main-navbar");
    MainNavbar.appendChild(RonenArielyDiv);

    // Adding the new cleaning Button
    var RonenArielyCleanPageButton = document.createElement("button");
    RonenArielyCleanPageButton.innerHTML = "Clean Page";
    RonenArielyDiv.appendChild(RonenArielyCleanPageButton);
    RonenArielyCleanPageButton.addEventListener ("click", function() {
        RonenArielyCleanPage ();
    });

    // Adding sub-content
    var RonenArielySubContentButton = document.createElement("button");
    RonenArielySubContentButton.innerHTML = "Show/Hide OP Message";
    RonenArielyDiv.appendChild(RonenArielySubContentButton);
    RonenArielySubContentButton.addEventListener ("click", function() {
        RonenArielySubContent ();
    });

}

// OK
function RonenArielyCleanPage () {
    // before remove the categories we can create new navigation option
    document.getElementsByClassName("span4 sidebarTwo")[0].remove()
    document.getElementsByClassName("span8 mainContent")[0].style.width = "100%";
    document.getElementsByClassName("sticky-posts-list")[0].style.padding = "2px";
}


// OK
function RonenArielySubContent () {
    var MainThread = document.getElementsByClassName("node-list-item og-poster-list-item question-list-item");
    //alert(MainThread.length);

    var ThreadID;
    var URL;

    for (var ThreadContent = 0; ThreadContent < MainThread.length; ThreadContent++) {

        ThreadID = document.getElementsByClassName("node-list-item og-poster-list-item question-list-item")[ThreadContent].children[2].id.replace("counts-", "");
        URL = document.getElementsByTagName("h2")[ThreadContent].getElementsByTagName("a")[0].href;

        //console.log("ThreadNum: " + ThreadContent + "; URL: " + URL + "; ThreadID: " + ThreadID);

        var RonenArielySubContentLoadButton = document.createElement("button");
        RonenArielySubContentLoadButton.setAttribute("id", "RonenArielySubContentLoadButton_" + ThreadID);
        RonenArielySubContentLoadButton.innerHTML = "➡";

        document.getElementsByClassName("col-xs-1 col-sm-2 col-md-1 icon-wrapper")[ThreadContent].style.width = "100px";
        document.getElementsByClassName("col-xs-1 col-sm-2 col-md-1 icon-wrapper")[ThreadContent].appendChild(RonenArielySubContentLoadButton);

        MyaddEventListener (ThreadContent, ThreadID, URL);

//         RonenArielySubContentLoadButton.addEventListener ("click", function() {
//             alert("ThreadNum: " + ThreadContent + "; URL: " + URL + "; ThreadID: " + ThreadID);
//             //RonenArielySubContentLoad (ThreadContent, ThreadID, URL);
//         });

    }
}

function MyaddEventListener (_ThreadContent, _ThreadID, _URL){
        document.getElementById("RonenArielySubContentLoadButton_" + _ThreadID).addEventListener ("click", function() {
            //alert("ThreadNum: " + ThreadContent + "; URL: " + URL + "; ThreadID: " + ThreadID);
            RonenArielySubContentLoad (_ThreadContent, _ThreadID, _URL);
        });
}

function RonenArielySubContentLoad (_ThreadContent, _ThreadID, _URL) {
    //alert("ThreadNum: " + _ThreadContent + "; URL: " + _URL + "; ThreadID: " + _ThreadID);

    //alert(document.getElementById("RonenArielySubContentLoadButton_" + _ThreadID).id);
    document.getElementById("RonenArielySubContentLoadButton_" + _ThreadID).style.display = 'none';



    // Show/Hide Button
    var ShowHidContentButton = document.createElement("button");
    ShowHidContentButton.setAttribute("id", "ShowHidContentButton_" + _ThreadID);
    ShowHidContentButton.innerHTML = "❎";
    document.getElementsByClassName("col-xs-1 col-sm-2 col-md-1 icon-wrapper")[_ThreadContent].appendChild(ShowHidContentButton);
    ShowHidContentButton.addEventListener ("click", function() {ShowHidContent("ContentDiv_" + _ThreadContent, "ShowHidContentButton_" + _ThreadID);});
    // ✅



    var MyDiv = document.createElement("div");
    MyDiv.setAttribute("id", "ContentDiv_" + _ThreadContent);
    MyDiv.style.width = "100%";
    MyDiv.style.clear = "both";

    var MyDiv0 = document.createElement("div");
    MyDiv0.setAttribute("id", "ContentDiv0_" + _ThreadContent);
    MyDiv0.style.width = "100px";
    MyDiv0.style.float = "left";
    MyDiv0.innerHTML = "&nbsp;&nbsp;&nbsp;";
    MyDiv.append(MyDiv0);

    var MyDiv1 = document.createElement("div");
    MyDiv1.setAttribute("id", "ContentDiv1_" + _ThreadContent);
    MyDiv1.style.border = "1px solid #0000FF";
    MyDiv1.style.backgroundColor = "#CCCCCC";
    MyDiv1.style.width = "calc(100% - 110px)";
    MyDiv1.style.float = "left";
    MyDiv1.innerHTML = "Loading...";
    MyDiv.append(MyDiv1);

    document.getElementsByClassName("node-list-item og-poster-list-item question-list-item")[_ThreadContent].after(MyDiv);
    //document.getElementsByClassName("node-list-item og-poster-list-item question-list-item")[_ThreadContent].append(MyDiv);

    var xdsfa = GM.xmlHttpRequest({
        method: "GET",
        url: _URL,
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "text/html"
        },
        onload: function(response) {
            var MyXML = response.responseText;
            //alert(MyXML); // OK

            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(MyXML, 'text/html');

            //var content = htmlDoc.getElementsByClassName("widget widget-nopad smallmargin")[0].innerHTML;
            //var content = htmlDoc.getElementsByClassName("span8 mainContent")[0].innerHTML;
            var content = htmlDoc.getElementsByClassName("question-body post-body")[0].innerHTML;
            //alert(content);

            MyDiv1.innerHTML = content;
        }
    });

}

function ShowHidContent(_ShowHidContentButton, _ContentButton){
    var x = document.getElementById(_ShowHidContentButton);
    if (x.style.display === "none") {
        x.style.display = "block";
        document.getElementById(_ContentButton).innerHTML = '❎';
    } else {
        x.style.display = "none";
        document.getElementById(_ContentButton).innerHTML = '✅';
    }
}





