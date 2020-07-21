// ==UserScript==
// @name         RonenAriely_QnA_SubContent
// @namespace    https://ariely.info/
// @icon         http://ariely.info/favicon.ico
// @version      2.1
// @description  Improving the looks & feel of the new Microsoft QnA forums. Adding new features and better compact design
// @author       Ronen Ariely
// @match        https://docs.microsoft.com/en-us/answers/*
// @include
// @exclude      https://docs.microsoft.com/en-us/answers/idea/*
// @exclude      https://docs.microsoft.com/en-us/answers/questions/*
// @resource     RonenArielyicon https://github.com/pituach/RonenArielyQaN/raw/master/RonenArielyKey.gif
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @grant        GM_addStyle
// @grant        GM.xmlHttpRequest
// @grant        GM.getResourceUrl
//
// ==/UserScript==

/************** Edit this section as you like ********/
// https://docs.microsoft.com/en-us/answers/index.html
// https://docs.microsoft.com/en-us/answers/content/idea/list.html
//


/************** tampermonkey Learning Tips ********/
// @match vs @include: Regular Expressions can be used only with @include
//

/************** History and future ******************
// 1.4 : adding support for feedback and not just for questions
// 1.6 : fix bug
// 1.7 : add option to select tag/category (forum) using drop down list (I added 100 forums to the list out of about 300.
//       More work is needed to add all the tags and splut them into groups
// 1.8 : (1) Moving the Ronen Ariely Scripts location and remove my name
// 1.9 : Adding option to store setting in cookies
// 2.0 : Update the code to fit the latest UI of the site which was changed
// 2.1 : Add new option! Advance Search

****************************************************/

//--- Style our newly added elements using CSS.
GM_addStyle ( RonenAriely ( function () {/*!
    body { color: white; background-color: black; } img { border: 0; }"
    #ArielyButtonID {
         width: 100%;
    }
*/} ) );


var $ = window.jQuery;
var i;

// alert('Hello, this page is using Ronen Ariely extentation. it is still in preview. hope you like it');

function RonenAriely (zEvent) {
    window.onload = RonenArielyOnLoad();
}


function Add2Search(tag){
    //if (tag.selectedIndex != 0) top.location.href = "https://docs.microsoft.com/en-us/answers/topics/" + tag.options[tag.selectedIndex].value + ".html";return 1;
    //if (tag.selectedIndex != 0) alert("https://docs.microsoft.com/en-us/answers/topics/" + tag.options[tag.selectedIndex].value + ".html");return 1;

    $("#RonenArielySelectedTags")[0].add(new Option(tag.options[tag.selectedIndex].value, tag.options[tag.selectedIndex].value));
    $("#RonenArielyUnSelectedTags")[0].remove(tag.selectedIndex);
}
function Remove2Search(tag){
    $("#RonenArielyUnSelectedTags")[0].add(new Option(tag.options[tag.selectedIndex].value, tag.options[tag.selectedIndex].value));
    $("#RonenArielySelectedTags")[0].remove(tag.selectedIndex);
}
function Go2Search(){
    //$("#RonenArielyAdvanceSearchDiv").remove();
    //let URL = 'https://docs.microsoft.com/en-us/answers/search.html?type=question+OR+idea&redirect=search%2Fsearch&sort=relevance&q=';
    let URL = 'https://docs.microsoft.com/en-us/answers/search.html?redirect=search%2Fsearch&sort=relevance';

    URL += '&type=';
    if(document.getElementById("RonenArielyTypeQuestion").checked) URL += "question+OR";
    if(document.getElementById("RonenArielyTypeIdea").checked) URL += "idea+OR";
    if(document.getElementById("RonenArielyTypeAnswer").checked) URL += "answer+OR";

    URL += '&q=';
    for(i = 0; i < $("#RonenArielySelectedTags")[0].options.length; i++) {
        URL += "%5B" + $("#RonenArielySelectedTags")[0].options[i].value + "%5D";
    }
    // https://docs.microsoft.com/en-us/answers/search.html?c=&includeChildren=&f=&type=question+OR+idea+OR+kbentry+OR+answer+OR+topic+OR+user&redirect=search%2Fsearch&sort=relevance&q=%5Bazure-sql-database%5D%5Bazure-sql-virtual-machines%5D
    top.location.href = URL;
    return 1;
}
function CancelSearch(){
    $("#RonenArielyAdvanceSearchDiv").remove();
    return 1;
}

function RonenArielyAdvanceSearch () {
    //alert("This is advance search");

    var RonenArielySearchDiv = document.createElement('div');
    RonenArielySearchDiv.setAttribute("id", "RonenArielyAdvanceSearchDiv");
    RonenArielySearchDiv.style.border = "2px solid #0066CC";
    RonenArielySearchDiv.style.padding = "0px 4px 4px 3px";
    RonenArielySearchDiv.style.position = 'absolute';
    RonenArielySearchDiv.style.left = 'calc(50% - 250px)';
    RonenArielySearchDiv.style.top = '50px';
    RonenArielySearchDiv.style.width = '500px';
    RonenArielySearchDiv.style.height = '400px';
    RonenArielySearchDiv.style.padding = '10px';
    RonenArielySearchDiv.style.background = '#00ff00';
    RonenArielySearchDiv.innerHTML = 'Advance Search';
    RonenArielySearchDiv.style.zIndex = '999';

    RonenArielySearchDiv.appendChild(document.createElement("br"));
    /****************************************************************************  */
    /************************************************* add the UnSelectedTags list */
    let UnSelectedTags = document.createElement("select");
    UnSelectedTags.setAttribute("id", "RonenArielyUnSelectedTags");
    UnSelectedTags.setAttribute("size", "10");
    UnSelectedTags.multiple = true;
    UnSelectedTags.addEventListener ("change", function() {
        Add2Search(this)
    });
    let NewOption = document.createElement("option");
    NewOption.text = "Select forum";
    NewOption.disabled = true;
    NewOption.selected = true;
    UnSelectedTags.add(NewOption);
    //------------------------------------------------------- add tags from list
    let MyGroup = document.createElement("optgroup");
    MyGroup.label = "Data Platform";
    UnSelectedTags.add(MyGroup);
    let TagsList = [
        "azure-database-migration","azure-sql-database","azure-sql-virtual-machines","azure-synapse-analytics","azure-virtual-machines"
        ,"azure-data-factory"
    ]
    for(i = 0; i < TagsList.length; i++) {
        let NewOption = document.createElement("option");
        NewOption.text = TagsList[i];
        NewOption.value = TagsList[i];
        UnSelectedTags.add(NewOption);
    }
    //------------------------------------------------------- Office
    MyGroup = document.createElement("optgroup");
    MyGroup.label = "Office";
    UnSelectedTags.add(MyGroup);
    TagsList = ["teams", "teams-linux"]
    for(i = 0; i < TagsList.length; i++) {
        let NewOption = document.createElement("option");
        NewOption.text = TagsList[i];
        NewOption.value = TagsList[i];
        UnSelectedTags.add(NewOption);
    }
    //------------------------------------------------------- Virtual Machines
    MyGroup = document.createElement("optgroup");
    MyGroup.label = "Virtual Machines";
    UnSelectedTags.add(MyGroup);
    TagsList = ["azure-sql-virtual-machines","windows-10-setup"]
    for(i = 0; i < TagsList.length; i++) {
        let NewOption = document.createElement("option");
        NewOption.text = TagsList[i];
        NewOption.value = TagsList[i];
        UnSelectedTags.add(NewOption);
    }
    //------------------------------------------------------- More....
    MyGroup = document.createElement("optgroup");
    MyGroup.label = "More...";
    UnSelectedTags.add(MyGroup);
    TagsList = ["azure-active-directory","azure-ad-app-development","azure-ad-app-management","azure-ad-audit-logs","azure-ad-authentication-protocols","azure-ad-b2c","azure-ad-connect","azure-ad-device-management","azure-ad-fs","azure-ad-group-management","azure-ad-identity-governance","azure-ad-licensing","azure-ad-multi-factor-authentication","azure-ad-password-protection","azure-ad-privileged-identity-management","azure-ad-sign-in-logs","azure-ad-sspr","azure-ad-user-management","azure-analysis-services","azure-api-fhir","azure-app-configuration","azure-arc","azure-automation","azure-backup","azure-batch","azure-bing-custom","azure-bing-image","azure-bing-spellcheck","azure-bing-visual","azure-blob-storage","azure-blockchain-workbench","azure-bot-service","azure-cdn","azure-cloud-services","azure-cognitive-services","azure-container-instances","azure-content-moderator","azure-cost-management","azure-cyclecloud","azure-database-migration","azure-database-postgresql","azure-databricks","azure-data-explorer","azure-data-lake-analytics","azure-data-science-vm","azure-ddos-protection","azure-dedicated-hsm","azure-dev-tool-integrations","azure-disk-encryption","azure-dns","azure-ad-access-reviews","azure-ad-app-registration","azure-ad-b2b","azure-ad-connect-health","azure-ad-graph","azure-ad-libraries","azure-ad-pass-through-authentication","azure-ad-rbac","azure-ad-tenant","azure-anomaly-detector","azure-application-gateway","azure-avere-vfxt","azure-bing-autosuggest","azure-bing-news","azure-bing-web","azure-blueprints","azure-classroom-labs","azure-computer-vision","azure-cosmos-db","azure-database-mariadb","azure-data-box-family","azure-data-factory","azure-data-share","azure-devtestlabs","azure-disk-storage","azure-ad-application-proxy","azure-ad-conditional-access","azure-ad-hybrid-identity","azure-ad-powershell","azure-ad-user-provisioning","azure-archive-storage","azure-bing-entity","azure-blockchain-service","azure-cognitive-search","azure-custom-vision","azure-data-catalog","azure-dedicated-host","adfs","azure-ad-domain-services","azure-ad-single-sign-on","azure-bastion","azure-cache-redis","azure-database-mysql","azure-digital-twins","azure-ad-microsoft-account","azure-bing-video","azure-data-lake-storage","azure-api-management","azure-ad-authentication","azure-container-registry"];
    for(i = 0; i < TagsList.length; i++) {
        let NewOption = document.createElement("option");
        NewOption.text = TagsList[i];
        NewOption.value = TagsList[i];
        UnSelectedTags.add(NewOption);
    }
    //-------------------------------------------------------
    RonenArielySearchDiv.appendChild(UnSelectedTags);

    /****************************************************************************  */
    /************************************************* add the SelectedTags list */
    let SelectedTags = document.createElement("select");
    SelectedTags.setAttribute("id", "RonenArielySelectedTags");
    SelectedTags.setAttribute("size", "10");
    SelectedTags.multiple = true;
    SelectedTags.addEventListener ("change", function() {
        Remove2Search(this)
    });
    RonenArielySearchDiv.appendChild(SelectedTags);

    RonenArielySearchDiv.appendChild(document.createElement("br"));
    RonenArielySearchDiv.appendChild(document.createElement("br"));
    /****************************************************************************  */
    /************************************************* select types */
    // type=question+OR+idea+OR+kbentry+OR+answer+OR+topic+OR+user
    let RonenArielyTypeInput = document.createElement("input");
    RonenArielyTypeInput.setAttribute("id", "RonenArielyTypeQuestion");
    RonenArielyTypeInput.setAttribute("type", "checkbox");
    RonenArielyTypeInput.setAttribute("value", "question");
    RonenArielySearchDiv.appendChild(RonenArielyTypeInput);
    let RonenArielySpanInput = document.createElement("span");
    RonenArielySpanInput.innerHTML = " question ";
    RonenArielySearchDiv.appendChild(RonenArielySpanInput);
    RonenArielySearchDiv.appendChild(document.createElement("br"));

    RonenArielyTypeInput = document.createElement("input");
    RonenArielyTypeInput.setAttribute("id", "RonenArielyTypeIdea");
    RonenArielyTypeInput.setAttribute("type", "checkbox");
    RonenArielyTypeInput.setAttribute("value", "idea");
    RonenArielySearchDiv.appendChild(RonenArielyTypeInput);
    RonenArielySpanInput = document.createElement("span");
    RonenArielySpanInput.innerHTML = " idea ";
    RonenArielySearchDiv.appendChild(RonenArielySpanInput);
    RonenArielySearchDiv.appendChild(document.createElement("br"));

    RonenArielyTypeInput = document.createElement("input");
    RonenArielyTypeInput.setAttribute("id", "RonenArielyTypeAnswer");
    RonenArielyTypeInput.setAttribute("type", "checkbox");
    RonenArielyTypeInput.setAttribute("value", "answer");
    RonenArielySearchDiv.appendChild(RonenArielyTypeInput);
    RonenArielySpanInput = document.createElement("span");
    RonenArielySpanInput.innerHTML = " answer ";
    RonenArielySearchDiv.appendChild(RonenArielySpanInput);
    RonenArielySearchDiv.appendChild(document.createElement("br"));

    // NewOption.selected = true

    /****************************************************************************  */
    var RonenArielyGoSearchButton = document.createElement("button");
    RonenArielyGoSearchButton.innerHTML = "GO Search";
    RonenArielyGoSearchButton.addEventListener ("click", function() {
        Go2Search();
    });
    RonenArielySearchDiv.appendChild(RonenArielyGoSearchButton);

    /****************************************************************************  */
    var RonenArielyCancelSearchButton = document.createElement("button");
    RonenArielyCancelSearchButton.innerHTML = "Cancel";
    RonenArielyCancelSearchButton.addEventListener ("click", function() {
        CancelSearch();
    });
    RonenArielySearchDiv.appendChild(RonenArielyCancelSearchButton);

    /****************************************************************************  */
    document.body.appendChild(RonenArielySearchDiv);

}


function RonenArielyOnLoad () {

    /*-------------------------------------------------------  Advance Search Button */
    var RonenArielyAdvanceSearchButton = document.createElement("button");
    RonenArielyAdvanceSearchButton.setAttribute("id", "RonenArielyAdvanceSearch");
    RonenArielyAdvanceSearchButton.innerHTML = "Advance";
    RonenArielyAdvanceSearchButton.style.backgroundColor = "#66AAFF";
    RonenArielyAdvanceSearchButton.style.color = "#ffffff";
    RonenArielyAdvanceSearchButton.addEventListener ("click", function() {
        RonenArielyAdvanceSearch();
    });
    let $ = window.jQuery;
    $( "form[role='search']" )[0].style.width="calc(100% - 100px)";
    $( "form[role='search']" )[0].after(RonenArielyAdvanceSearchButton);

    /*------------------------------------------------------- Adding the buttons scripts in new div RonenArielyDiv */
    //document.getElementsByClassName("nav-bar")[1].style.lineHeight = "54px"; // This will put the content in the middle, It fit the high of the .nav-bar class

    var RonenArielyDiv = document.createElement("div");
    RonenArielyDiv.setAttribute("id", "RonenArielyDiv");
    //RonenArielyDiv.style.border = "1px solid #0000FF";
    //RonenArielyDiv.style.padding = "1px";
    //RonenArielyDiv.style.backgroundColor = "#ccffff";
    //RonenArielyDiv.innerHTML = "Ronen Ariely Scripts: "
    //RonenArielyDiv.style.display = "contents";
    //document.getElementsByClassName("nav-bar is-content")[0].getElementsByClassName("nav-bar-spacer")[0].appendChild(RonenArielyDiv);
    //RonenArielyDiv.style.float = "left";
    //RonenArielyDiv.style.display = "flex";
    RonenArielyDiv.style.margin = "auto";
    //RonenArielyDiv.style.margin = "10px";
    RonenArielyDiv.style.float = "right";
    //document.getElementsByClassName("has-padding-none has-flex-grow")[0].style.float = "left";
    //document.getElementsByClassName("has-padding-none has-flex-grow")[0].style.margin = "3px";
    //document.getElementsByClassName("has-padding-none has-flex-grow")[0].after(RonenArielyDiv);
    document.getElementsByClassName("nav-bar-spacer")[0].after(RonenArielyDiv);

    /************************************************************************** Adding the content to RonenArielyDiv */

    /*------------------------------------------------------- Add link to Ronen Ariely site (credit on script, please do not remove this)*/

    var RonenArielyiconS = document.createElement("span");
    RonenArielyiconS.style.border = "2px solid #0066CC";
    RonenArielyiconS.style.padding = "0px 4px 4px 3px";
    RonenArielyiconS.style.margin = "auto";

    var RonenArielyiconA = document.createElement("a");
    RonenArielyiconA.setAttribute("id", "RonenArielySite");
    RonenArielyiconA.title = "Ronen Ariely Site";
    RonenArielyiconA.href = "http://ariely.info/";
    RonenArielyiconA.target = "_blank";
    RonenArielyiconA.style.marginRight = "2px";
    RonenArielyiconA.style.marginLeft = "2px";
    //RonenArielyiconA.style.display = "flex";

    RonenArielyDiv.appendChild(RonenArielyiconS);
    RonenArielyiconS.appendChild(RonenArielyiconA);
    (async function() {
        //let img = document.createElement("img");
        //img.src = await GM.getResourceUrl("RonenArielyicon");
        var RonenArielyiconImg = document.createElement("img");
        RonenArielyiconImg.src = await GM.getResourceUrl("RonenArielyicon");
        RonenArielyiconA.appendChild(RonenArielyiconImg);
    })();

    /*------------------------------------------------------- Add Setting */
    var RonenArielySettingButton = document.createElement("button");
    RonenArielySettingButton.setAttribute("id", "RonenArielySetting");
    RonenArielySettingButton.innerHTML = "Setting";
    RonenArielySettingButton.style.backgroundColor = "#0066CC";
    RonenArielySettingButton.style.color = "#ffffff";
    RonenArielySettingButton.style.margin = "auto";
    RonenArielySettingButton.style.height = "30px";
    RonenArielySettingButton.addEventListener ("click", function() {
        RonenArielySetting();
    });
    RonenArielySettingButton.style.marginRight = "5px";
    RonenArielySettingButton.style.marginLeft = "5px";
    RonenArielyDiv.appendChild(RonenArielySettingButton);

    /*------------------------------------------------------- Adding the new cleaning Button */
    var RonenArielyCleanPageButton = document.createElement("button");
    RonenArielyCleanPageButton.setAttribute("id", "Page_Structure");
    RonenArielyCleanPageButton.innerHTML = "Change Page Structure";
    RonenArielyCleanPageButton.style.backgroundColor = "#0066CC";
    RonenArielyCleanPageButton.style.color = "#ffffff";
    RonenArielyCleanPageButton.addEventListener ("click", function() {
        RonenArielyCleanPage ();
    });
    RonenArielyCleanPageButton.style.margin = "auto";
    RonenArielyCleanPageButton.style.height = "30px";
    RonenArielyCleanPageButton.style.marginRight = "5px";
    RonenArielyCleanPageButton.style.marginLeft = "5px";
    RonenArielyDiv.appendChild(RonenArielyCleanPageButton);

    /*------------------------------------------------------- Adding the buttom to show the sub-content */
    var RonenArielySubContentButton = document.createElement("button");
    RonenArielySubContentButton.setAttribute("id", "Add_Show_Hide");
    RonenArielySubContentButton.innerHTML = "Add Show/Hide content";
    RonenArielySubContentButton.style.backgroundColor = "#0066CC";
    RonenArielySubContentButton.style.color = "#ffffff";
    RonenArielySubContentButton.addEventListener ("click", function() {
        RonenArielySubContent ();
    });
    RonenArielySubContentButton.style.margin = "auto";
    RonenArielySubContentButton.style.height = "30px";
    RonenArielySubContentButton.style.marginRight = "5px";
    RonenArielySubContentButton.style.marginLeft = "5px";
    RonenArielyDiv.appendChild(RonenArielySubContentButton);

    /*-------------------------------------------------------  */
    if (document.cookie.split('; ').find(row => row.startsWith('RonenArielyInput1='))) {
        if((document.cookie.split('; ').find(row => row.startsWith('RonenArielyInput1=')).split('=')[1]) == "true"){
            RonenArielyCleanPage ();
        }
    }
    if (document.cookie.split('; ').find(row => row.startsWith('RonenArielyInput2='))) {
        if((document.cookie.split('; ').find(row => row.startsWith('RonenArielyInput2=')).split('=')[1]) == "true"){
            RonenArielySubContent ();
        }
    }
}

function link_to(forum){
    // https://docs.microsoft.com/en-us/answers/topics/azure-migrate.html
    if (forum.selectedIndex != 0) top.location.href = "https://docs.microsoft.com/en-us/answers/topics/" + forum.options[forum.selectedIndex].value + ".html";return 1;
}

function RonenArielySetting () {

    var RonenArielySettingDiv = document.createElement('div');
    RonenArielySettingDiv.setAttribute("id", "RonenArielySettingDiv");
    RonenArielySettingDiv.style.border = "2px solid #0066CC";
    RonenArielySettingDiv.style.padding = "0px 4px 4px 3px";
    RonenArielySettingDiv.style.position = 'absolute';
    RonenArielySettingDiv.style.left = 'calc(50% - 150px)';
    RonenArielySettingDiv.style.top = 'calc(50% - 75px)';
    RonenArielySettingDiv.style.width = '300px';
    RonenArielySettingDiv.style.height = '150px';
    RonenArielySettingDiv.style.padding = '10px';
    RonenArielySettingDiv.style.background = '#00ff00';
    RonenArielySettingDiv.innerHTML = 'Enter your setting for the page';
    RonenArielySettingDiv.style.zIndex = '999';

    /*------------------------------------------------------- input */
    RonenArielySettingDiv.appendChild(document.createElement("br"));

    let RonenArielyInput1 = document.createElement("input");
    RonenArielyInput1.setAttribute("id", "input01");
    RonenArielyInput1.setAttribute("type", "checkbox");
    RonenArielyInput1.style.verticalAlign = "top";
    if (document.cookie.split('; ').find(row => row.startsWith('RonenArielyInput1='))) {
        //alert(document.cookie.split('; ').find(row => row.startsWith('RonenArielyInput1=')).split('=')[1]);
        if((document.cookie.split('; ').find(row => row.startsWith('RonenArielyInput1=')).split('=')[1]) == "true"){
            RonenArielyInput1.checked = true;
        }
        else{
            RonenArielyInput1.checked = false;
        }
    }
    RonenArielySettingDiv.appendChild(RonenArielyInput1);

    let RonenArielyS1 = document.createElement("span");
    RonenArielyS1.innerHTML = "Use Clean Page";
    RonenArielySettingDiv.appendChild(RonenArielyS1);

    RonenArielySettingDiv.appendChild(document.createElement("br"));

    let RonenArielyInput2 = document.createElement("input");
    RonenArielyInput2.setAttribute("id", "input02");
    RonenArielyInput2.setAttribute("type", "checkbox");
    RonenArielyInput2.style.verticalAlign = "top";
    if (document.cookie.split('; ').find(row => row.startsWith('RonenArielyInput2='))) {
        if((document.cookie.split('; ').find(row => row.startsWith('RonenArielyInput2=')).split('=')[1]) == "true"){
            RonenArielyInput2.checked = true;
        }
        else{
            RonenArielyInput2.checked = false;
        }
    }
    RonenArielySettingDiv.appendChild(RonenArielyInput2);

    let RonenArielyS2 = document.createElement("span");
    RonenArielyS2.innerHTML = "Use Show/Hide Content";
    RonenArielySettingDiv.appendChild(RonenArielyS2);

    RonenArielySettingDiv.appendChild(document.createElement("br"));

    /*------------------------------------------------------- Add Setting */
    var RonenArielyCloseButton = document.createElement("button");
    RonenArielyCloseButton.innerHTML = "Store Setting In Cookies";
    RonenArielyCloseButton.style.marginRight = "5px";
    RonenArielyCloseButton.style.marginLeft = "5px";
    RonenArielyCloseButton.addEventListener ("click", function() {
        //alert(RonenArielyInput1.checked);
        document.cookie = "RonenArielyInput1=" + document.getElementById("input01").checked + "; Expires=Wed, 27 Feb 2021 07:28:00 GMT; path=/";
        document.cookie = "RonenArielyInput2=" + document.getElementById("input02").checked + "; Expires=Wed, 27 Feb 2021 07:28:00 GMT; path=/";
        document.getElementById("RonenArielySettingDiv").remove();
    });
    RonenArielySettingDiv.appendChild(RonenArielyCloseButton);


    document.body.appendChild(RonenArielySettingDiv);

}

function RonenArielyCleanPage () {

    /**************************************************************************  */
    /*
    // All the page DOM is very complex instead simple structure
    // There is not need for the spaces on the left/right
    // The code based on CSS At-rules like @media
    // https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
    // Control @Media in JS: https://www.w3schools.com/howto/howto_js_media_queries.asp

    document.getElementsByClassName("nav-bar")[0].style.paddingLeft = "1rem";
    document.getElementsByClassName("nav-bar")[0].style.paddingRight = "1rem";
    document.getElementsByClassName("nav-bar")[1].style.paddingLeft = "1rem";
    document.getElementsByClassName("nav-bar")[1].style.paddingRight = "1rem";
    document.getElementsByClassName("container")[0].style.marginLeft = "1rem";
    document.getElementsByClassName("container")[1].style.marginLeft = "1rem";
    document.getElementsByClassName("container")[2].style.marginLeft = "1rem";
    document.getElementsByClassName("container")[0].style.marginRight = "1rem";
    document.getElementsByClassName("container")[1].style.marginRight = "1rem";
    document.getElementsByClassName("container")[2].style.marginRight = "1rem";
    document.getElementsByClassName("content-header uhf-container has-padding has-default-focus")[0].style.paddingLeft = "1rem";
    document.getElementsByClassName("content-header uhf-container has-padding has-default-focus")[0].style.paddingRight = "1rem";
    */

    /************************************************** Remove the category list on the right */
    document.getElementsByClassName("span4 sidebarTwo")[0].remove()

    /************************************************** Add dropdown menu */
    var ListOfForums, MyGroup, ListOfForumsArray
    ListOfForums = document.createElement("select");
    ListOfForums.setAttribute("id", "RonenArielyListOfForums");
    ListOfForums.style.backgroundColor = "#0066CC";
    ListOfForums.style.borderRight = "#cdc8c5 1px outset;";
    ListOfForums.style.borderTop = "#cdc8c5 1px outset;";
    ListOfForums.style.borderLeft = "#cdc8c5 1px outset";
    ListOfForums.style.borderBottom = "#cdc8c5 1px outset;";
    // color not working, so I will add it at the end
    //ListOfForums.style.color = "white;";

    ListOfForums.addEventListener ("change", function() {
        link_to(this)
    });

    let NewOption = document.createElement("option");
    NewOption.text = "Select forum";
    NewOption.disabled = true;
    NewOption.selected = true;
    ListOfForums.add(NewOption);

    //------------------------------------------------------- Data Platform
    MyGroup = document.createElement("optgroup");
    MyGroup.label = "Data Platform";
    ListOfForums.add(MyGroup);
    ListOfForumsArray = [
        "azure-database-migration","azure-sql-database","azure-sql-virtual-machines","azure-synapse-analytics","azure-virtual-machines"
        ,"azure-data-factory"
    ]
    for(i = 0; i < ListOfForumsArray.length; i++) {
        let NewOption = document.createElement("option");
        NewOption.text = ListOfForumsArray[i];
        NewOption.value = ListOfForumsArray[i];
        ListOfForums.add(NewOption);
    }

    //------------------------------------------------------- Office
    MyGroup = document.createElement("optgroup");
    MyGroup.label = "Office";
    ListOfForums.add(MyGroup);
    ListOfForumsArray = ["teams", "teams-linux"]
    for(i = 0; i < ListOfForumsArray.length; i++) {
        let NewOption = document.createElement("option");
        NewOption.text = ListOfForumsArray[i];
        NewOption.value = ListOfForumsArray[i];
        ListOfForums.add(NewOption);
    }

    //------------------------------------------------------- Virtual Machines
    MyGroup = document.createElement("optgroup");
    MyGroup.label = "Virtual Machines";
    ListOfForums.add(MyGroup);
    ListOfForumsArray = ["azure-sql-virtual-machines","windows-10-setup"]
    for(i = 0; i < ListOfForumsArray.length; i++) {
        let NewOption = document.createElement("option");
        NewOption.text = ListOfForumsArray[i];
        NewOption.value = ListOfForumsArray[i];
        ListOfForums.add(NewOption);
    }

    //------------------------------------------------------- More....
    MyGroup = document.createElement("optgroup");
    MyGroup.label = "More...";
    ListOfForums.add(MyGroup);

    // I got the category manually by executing:
       // var ListOfForums = document.getElementsByClassName("tag");
       // for(var i = 0; i < ListOfForums.length; i++){MyAll = MyAll + (ListOfForums[i].href.toString().replace('https://docs.microsoft.com/answers/topics/','\"').replace('.html','\",'))}
    ListOfForumsArray = ["azure-active-directory","azure-ad-app-development","azure-ad-app-management","azure-ad-audit-logs","azure-ad-authentication-protocols","azure-ad-b2c","azure-ad-connect","azure-ad-device-management","azure-ad-fs","azure-ad-group-management","azure-ad-identity-governance","azure-ad-licensing","azure-ad-multi-factor-authentication","azure-ad-password-protection","azure-ad-privileged-identity-management","azure-ad-sign-in-logs","azure-ad-sspr","azure-ad-user-management","azure-analysis-services","azure-api-fhir","azure-app-configuration","azure-arc","azure-automation","azure-backup","azure-batch","azure-bing-custom","azure-bing-image","azure-bing-spellcheck","azure-bing-visual","azure-blob-storage","azure-blockchain-workbench","azure-bot-service","azure-cdn","azure-cloud-services","azure-cognitive-services","azure-container-instances","azure-content-moderator","azure-cost-management","azure-cyclecloud","azure-database-migration","azure-database-postgresql","azure-databricks","azure-data-explorer","azure-data-lake-analytics","azure-data-science-vm","azure-ddos-protection","azure-dedicated-hsm","azure-dev-tool-integrations","azure-disk-encryption","azure-dns","azure-ad-access-reviews","azure-ad-app-registration","azure-ad-b2b","azure-ad-connect-health","azure-ad-graph","azure-ad-libraries","azure-ad-pass-through-authentication","azure-ad-rbac","azure-ad-tenant","azure-anomaly-detector","azure-application-gateway","azure-avere-vfxt","azure-bing-autosuggest","azure-bing-news","azure-bing-web","azure-blueprints","azure-classroom-labs","azure-computer-vision","azure-cosmos-db","azure-database-mariadb","azure-data-box-family","azure-data-factory","azure-data-share","azure-devtestlabs","azure-disk-storage","azure-ad-application-proxy","azure-ad-conditional-access","azure-ad-hybrid-identity","azure-ad-powershell","azure-ad-user-provisioning","azure-archive-storage","azure-bing-entity","azure-blockchain-service","azure-cognitive-search","azure-custom-vision","azure-data-catalog","azure-dedicated-host","adfs","azure-ad-domain-services","azure-ad-single-sign-on","azure-bastion","azure-cache-redis","azure-database-mysql","azure-digital-twins","azure-ad-microsoft-account","azure-bing-video","azure-data-lake-storage","azure-api-management","azure-ad-authentication","azure-container-registry"];
    for(i = 0; i < ListOfForumsArray.length; i++) {
        let NewOption = document.createElement("option");
        NewOption.text = ListOfForumsArray[i];
        NewOption.value = ListOfForumsArray[i];
        ListOfForums.add(NewOption);
    }

    //document.getElementById("RonenArielyDiv").append(ListOfForums);
    document.getElementById("Page_Structure").after(ListOfForums);
    document.getElementById("RonenArielyListOfForums").style.color = "#ffffff";
    document.getElementById("RonenArielyListOfForums").style.margin = "auto";

    /************************************************** chenge width to 100% *****/
    document.getElementsByClassName("span8 mainContent")[0].style.width = "100%";
    var StickyPostsList = document.getElementsByClassName("sticky-posts-list")[0];
    if (typeof StickyPostsList !== "undefined" && StickyPostsList !== '' && StickyPostsList != null) {
        StickyPostsList.style.padding = "2px";
    }

    /************************************************** Disable/remove cleaning button */
    //document.getElementById("Page_Structure").disabled = true;
    //document.getElementById("Page_Structure").style.background = "gray";
    //document.getElementById("Page_Structure").innerHTML = "Disabled";
    document.getElementById("Page_Structure").remove();

    document.cookie = "RonenArielyInput1=true; Expires=Wed, 27 Feb 2021 07:28:00 GMT; path=/";
}


// OK
function RonenArielySubContent () {

    document.getElementById("Add_Show_Hide").disabled = true;
    document.getElementById("Add_Show_Hide").style.background = "gray";
    document.getElementById("Add_Show_Hide").innerHTML = "Disabled";

    var MainThread = document.getElementsByClassName("node-list-item og-poster-list-item");
    //alert(MainThread.length);
    // node-list-item og-poster-list-item question-list-item
    // node-list-item og-poster-list-item idea-list-item

    var ThreadID;
    var URL;

    for (var ThreadContent = 0; ThreadContent < MainThread.length; ThreadContent++) {


        //ThreadID = document.getElementsByClassName("node-list-item og-poster-list-item question-list-item")[ThreadContent].children[2].id.replace("counts-", "");
        //ThreadID = document.getElementsByClassName("node-list-item og-poster-list-item idea-list-item")[ThreadContent].children[2].id.replace("counts-", "");

        // In the odea we have the nodeid in the main div. But in question this attribute is missing for some reason
        ThreadID = MainThread[ThreadContent].getAttribute("nodeId");
        if (typeof ThreadID === "undefined" | ThreadID === '' | ThreadID == null) {
            ThreadID = MainThread[ThreadContent].children[2].id.replace("counts-", "");
        }

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
    document.cookie = "RonenArielyInput2=true; Expires=Wed, 27 Feb 2021 07:28:00 GMT; path=/";
}

function MyaddEventListener (_ThreadContent, _ThreadID, _URL){
        document.getElementById("RonenArielySubContentLoadButton_" + _ThreadID).addEventListener ("click", function() {
            //alert("ThreadNum: " + ThreadContent + "; URL: " + URL + "; ThreadID: " + ThreadID);
            RonenArielySubContentLoad (_ThreadContent, _ThreadID, _URL);
        });
}

// Loading the external page
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


    /*********************************** Create the div for the content and add them to the page *******************/
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
    MyDiv1.style.border = "1px solid #A0AAEE";
    MyDiv1.style.backgroundColor = "#DDDDFF";
//     MyDiv1.style.border = "1px solid rgb(129, 175, 245);";
//     MyDiv1.style.backgroundColor = "rgb(244, 244, 255, 1);";
    MyDiv1.style.width = "calc(100% - 110px)";
    MyDiv1.style.float = "left";
    MyDiv1.innerHTML = "Loading...";
    MyDiv.append(MyDiv1);

    document.getElementsByClassName("node-list-item og-poster-list-item")[_ThreadContent].after(MyDiv);

    /*********************************** Load External Page of the thread *******************/
    // Note! If we will have a well formatted RSS then we should replace this part and load the RSS,
    // instead of loading the full HTML+CSS+Scripos of the client page

    var xdsfa = GM.xmlHttpRequest({
        method: "GET",
        url: _URL,
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "text/html"
        },
        /********************************************* Load finished and we can parse the conetnt */
        onload: function(response) {
            var MyXML = response.responseText;
            //alert(MyXML); // OK

            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(MyXML, 'text/html');
            var content;
            var ChildComments;

            setTimeout(function() {}, 1000);

            /************************************************* CLEAN PAGE *******************/
            // Show all comment
            for (i = 0; i < htmlDoc.getElementsByClassName("comments-container").length; i++) {
                htmlDoc.getElementsByClassName("comments-container")[i].style.display = "block";
            }

            // Clean code
            i = htmlDoc.getElementsByClassName("control-bar").length;
            while (i--) {
                htmlDoc.getElementsByClassName("control-bar")[i].remove();
            }
            i = htmlDoc.getElementsByClassName("comment-info").length;
            while (i--) {
                htmlDoc.getElementsByClassName("comment-info")[i].remove();
            }
            i = htmlDoc.getElementsByClassName("vote-widget").length;
            while (i--) {
                htmlDoc.getElementsByClassName("vote-widget")[i].remove();
            }
            i = htmlDoc.getElementsByTagName('script').length;
            while (i--) {
                htmlDoc.getElementsByTagName('script')[i].remove();
            }
            i = htmlDoc.getElementsByClassName("post-tools").length;
            while (i--) {
                htmlDoc.getElementsByClassName("post-tools")[i].remove();
            }

            /*************************** Adding the content of the original Question or Idea *****************  */
            // Content of the Question or Idea:
            content = htmlDoc.getElementsByClassName("post-body")[0].innerHTML;
            //alert(content);
            MyDiv1.innerHTML = content;

            /*************************** Adding the comments of the main Question or Idea *****************  */
            content = htmlDoc.getElementById("comments-container-" + _ThreadID);
            //alert(content.innerHTML); // ok
            MyDiv1.innerHTML += "<hr style='clear: both;' /><div style = 'width:70px; float:left;'>&nbsp;&nbsp;&nbsp;</div><div style = 'width: calc(100% - 70px); float:left;'>" + content.outerHTML + "</div>";

            /*************************** Adding the answers to Question *****************  */
            content = htmlDoc.getElementsByClassName("post-container answer-container");
            for (i = 0; i < content.length; i++) {
                MyDiv1.innerHTML += "<hr style='clear: both;' />" + content[i].innerHTML;
            }

            /*************************** Adding the Responds to Idea *****************  */
            content = htmlDoc.getElementsByClassName("post-container reply-container");
            for (i = 0; i < content.length; i++) {
                MyDiv1.innerHTML += "<hr style='clear: both;' />" + content[i].innerHTML;
            }
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




// // This function not working on the important content
// // therefore, Code is not formatted
// function FromChild () {

//     //Pretty print code blocks, some of them might be escaped, we need to unescape in order to pretty print them.
//     //TODO: Find a better place to this code.
//     var evaluateLineNum = function() {
//       let $codeBlocks = $(".answer-body, .node-body, .question-body, .reply-body, .comment-text, .wmd-previewer");
//       $.each($codeBlocks, function(indexI, elementI) {
//           $.each($(elementI).find('pre'), function(indexJ, elementJ) {
//               $(elementJ).addClass("prettyprint").addClass("linenums");

//               if(!pageContext.currentEditor.enableLineNum) {
//                 $(elementJ).addClass('no-num');
//               }

//               if($(elementI).attr('data-markup-language') === 'wmd') {
//                   $(elementJ).text(commandUtils.unescapeHtml($(elementJ).text()));
//               }
//           });
//       });
//     }

//     evaluateLineNum();
//     prettyPrint();

// }
