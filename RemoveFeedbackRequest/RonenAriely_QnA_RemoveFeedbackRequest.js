// ==UserScript==
// @name         RonenAriely_QnA_RemoveFeedbackRequest
// @namespace    https://ariely.info/
// @icon         http://ariely.info/favicon.ico
// @version      1.1
// @description  Improving the looks & feel of the new Microsoft QnA forums. Remove the request for Feedback
// @author       Ronen Ariely
// @match        https://docs.microsoft.com/*
// @include
// @resource     RonenArielyicon https://github.com/pituach/RonenArielyQaN/raw/master/RonenArielyKey.gif
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @grant        GM_addStyle
// @grant        GM.xmlHttpRequest
// @grant        GM.getResourceUrl
//
// ==/UserScript==

/************** Edit this section as you like ********/
//


/************** tampermonkey Learning Tips ********/
//
//

/************** History and future ******************
// 1.0 :

****************************************************/

//--- Style our newly added elements using CSS.
GM_addStyle ( RonenAriely ( function () {/*!
    body { color: white; background-color: black; } img { border: 0; }"
    #ArielyButtonID {
         width: 100%;
    }
*/} ) );

// alert('Hello, this page is using Ronen Ariely extentation. it is still in preview. hope you like it');

function RonenAriely (zEvent) {
    window.onload = RonenArielyOnLoad();
}

function RonenArielyOnLoad () {

    /*-------------------------------------------------------  Removing the feedback iframe */
    document.body.addEventListener('DOMSubtreeModified', OnSubtreeModified, false);
}

function OnSubtreeModified(){
    // console.log('DOM Changed at ' + new Date());
    if(document.querySelector("[title='Usabilla Feedback Form']")){
        document.querySelector("[title='Usabilla Feedback Form']").remove();
        console.log("Feedback was removed!");
    }
}
