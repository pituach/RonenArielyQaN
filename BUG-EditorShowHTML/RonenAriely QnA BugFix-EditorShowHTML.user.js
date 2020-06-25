// ==UserScript==
// @name         RonenAriely QnA BugFix-EditorShowHTML
// @namespace    https://ariely.info/
// @icon         http://ariely.info/favicon.ico
// @version      1.0
// @description  When Editing the message the content show HTML code instead of the Markdown code. This script simply use the "An HTML to Markdown converter written in JavaScript" script, writen by Dom Christie.
// @author       Ronen Ariely
// @match        https://docs.microsoft.com/en-us/answers/*
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
2020-06-25 : Version 1.0 ready

****************************************************/
//--- Style our newly added elements using CSS.
GM_addStyle ( RonenAriely ( function () {/*!
    body { color: white; background-color: black; } img { border: 0; }"
    #ArielyButtonID {
         width: 100%;
    }
*/} ) );

var $ = window.jQuery;

function RonenAriely (zEvent) {
    window.onload = RonenArielyOnLoad();
}

function RonenArielyOnLoad () {

    var RonenArielyDiv = document.createElement("div");
    RonenArielyDiv.setAttribute("id", "RonenArielyDiv");
    RonenArielyDiv.innerHTML = "Ronen Ariely Scripts: "
    var MainNavbar = document.getElementById("main-navbar");
    MainNavbar.appendChild(RonenArielyDiv);

    var MyTextarea = document.getElementById("body"); // editor ID is "body". We check if the editor is open
    if (typeof MyTextarea != "undefined" && MyTextarea != null){

        // Add External Script
        var GM_turndown = document.createElement('script');
        GM_turndown.src = 'https://unpkg.com/turndown/dist/turndown.js';
        GM_turndown.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(GM_turndown);

        // Adding the new cleaning Button
        var RonenArielyHTML2MArkdownButton = document.createElement("button");
        RonenArielyHTML2MArkdownButton.innerHTML = "Convert HTML 2 MArkdown in main Textarea";
        RonenArielyDiv.appendChild(RonenArielyHTML2MArkdownButton);
        RonenArielyHTML2MArkdownButton.addEventListener ("click", function() {
            //alert("did something");
            var turndownService = new TurndownService();
            MyTextarea.value = turndownService.turndown(MyTextarea.value);
        });
    }
}