// ==UserScript==
// @name         RonenAriely_QnA_SubContent
// @description  This script Improving the looks & feel of the new Microsoft QnA, and it add several practical functionalities.
// @author       Ronen Ariely
// @namespace    https://ariely.info/
// @copyright    2019, Ronen Ariely
// @homepage     https://github.com/pituach/RonenArielyQaN/
// @downloadURL  https://github.com/pituach/RonenArielyQaN/blob/master/ShowHideContent/RonenAriely_QnA_SubContent.user.js
// @updateURL    https://github.com/pituach/RonenArielyQaN/blob/master/ShowHideContent/RonenAriely_QnA_SubContent.user.js
// @version      3.6
// @icon         http://ariely.info/favicon.ico
// @match        https://docs.microsoft.com/en-us/answers/*
// @include
// @exclude      https://docs.microsoft.com/en-us/answers/idea/*
// @exclude      https://docs.microsoft.com/en-us/answers/questions/*
// @resource     RonenArielyicon https://github.com/pituach/RonenArielyQaN/raw/master/RonenArielyKey.gif
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @grant        GM_addStyle
// @grant        GM.xmlHttpRequest
// @grant        GM.getResourceUrl
// @grant GM_log
//
// ==/UserScript==

/**********************************************************************/
/**********************************************************************/
/******************************************** More Information ********/

// --------------------------------------------------- Introduction
// 💥This script is part of open source and free script's package named RonenArielyQaN , which was originally written by Ronen Ariely.
//
// The package includes scripts for Microsoft QnA forums: https://docs.microsoft.com/answers/
// The scripts are managed under a GitHub repository at https://github.com/pituach/RonenArielyQaN

// --------------------------------------------------- How can you help?
// ✅ If you are familiar with JavaScript then you are welcome to join the project as contributor - get full excess to edit the code.
// ✅ If have any request for a new feature or a suggestion to improve existing script or if you found a bug, then you can open a new "issue" at the project's repository.
//
// project's repository: https://github.com/pituach/RonenArielyQaN

/************** History and future ******************
// 1.4 : adding support for feedback and not just for questions
// 1.6 : fix bug
// 1.7 : add option to select tag/category (forum) using drop down list (I added 100 forums to the list out of about 300.
//       More work is needed to add all the tags and splut them into groups
// 1.8 : (1) Moving the Ronen Ariely Scripts location and remove my name
// 1.9 : Adding option to store setting in cookies
// 2.0 : Update the code to fit the latest UI of the site which was changed
// 2.1 : Add new option! Advance Search
//
// 3.0 : Remove the ifram with the feedback request
// 3.1 : Adjast the code to a change in page's DOM which make this extension not work
//       I addition I re organize the script a bit
// 3.2 :
// 3.3 : adding supprt for "Show more comments" for long threads
// 3.4 : (1) Update the cookie Expires time (exists in several places in the code - should replace with variable)
//       "RonenArielyInput2=true; Expires=Wed, 27 Feb 2022 07:28:00 GMT; path=/"
//       "RonenArielyInput1=true; Expires=Wed, 27 Feb 2022 07:28:00 GMT; path=/"
//       (2) The DOM was changed so we need to update the code to fit the new DOM
//       The issue is that someone change the name of the class "col-xs-1" into "col-xs-2"
//       I found no reason for this changhe which blocked the script for no reason
//
// 3.5 : small fix since the code was changed.
//       the search form used to have a role property in the form tag which I used it to find the location but the property was removed
//
/**********************************************************************/
/**********************************************************************/
/************************** Style our newly added elements using CSS. */
GM_addStyle ( RonenAriely ( function () {/*!
    body { color: white; background-color: black; } img { border: 0; }"
    #ArielyButtonID {
         width: 100%;
    }
*/} ) );

/**********************************************************************/
/**********************************************************************/
var $ = window.jQuery;
var i;

/**********************************************************************/
/**********************************************************************/
function RonenAriely (zEvent) {
    window.onload = RonenArielyOnLoad();
}

/**********************************************************************/
/**********************************************************************/
function RonenArielyOnLoad () {

    /*------------------------------------------------------------------------------  */
    /*------------------------------------------------------------------------------  */
    /*------------------------------------------------------- Remove Feedback Request */
    // If the forum popup a request to fill a feedback then you can un-comment the following line.
    // This function will disable the feedback request.
    // document.body.addEventListener('DOMSubtreeModified', OnSubtreeModified, false);
    // Another option is to install a sepearet script from the GitHub: https://github.com/pituach/RonenArielyQaN/tree/master/RemoveFeedbackRequest

    /*------------------------------------------------------------------------------  */
    /*------------------------------------------------------------------------------  */
    /*----------------------------------------------------- Add Advance Search Button */

    // Create new buttons
    var RonenArielyAdvanceSearchButton = document.createElement("button");
    RonenArielyAdvanceSearchButton.setAttribute("id", "RonenArielyAdvanceSearch");
    RonenArielyAdvanceSearchButton.innerHTML = "Advance";
    RonenArielyAdvanceSearchButton.style.backgroundColor = "#66AAFF";
    RonenArielyAdvanceSearchButton.style.color = "#ffffff";
    RonenArielyAdvanceSearchButton.addEventListener ("click", function() {
        RonenArielyAdvanceSearch();
    });
    // Add the new button
    let $ = window.jQuery;
    // $( "form[role='search']" )[0].style.width="calc(100% - 100px)";
    // $( "form[role='search']" )[0].after(RonenArielyAdvanceSearchButton);
    // the search form used to have a role property in the form tag which was removed
    // We can find the form using: document.getElementsByClassName("navbar-search")
    //document.getElementsByClassName("navbar-search")[0].after(RonenArielyAdvanceSearchButton);
    // or we can go directly to the "input" tag
    $( "input[role='combobox']" )[0].style.width="calc(100% - 100px)";
    $( "input[role='combobox']" )[0].after(RonenArielyAdvanceSearchButton);

    /*------------------------------------------------------------------------------  */
    /*------------------------------------------------------------------------------  */
    /*-------------------------------------- Add "RonenArielyDiv" div for the buttons */

    var RonenArielyDiv = document.createElement("div");
    RonenArielyDiv.setAttribute("id", "RonenArielyDiv");
    RonenArielyDiv.style.margin = "auto";
    RonenArielyDiv.style.float = "right";
    document.getElementsByClassName("nav-bar-spacer")[0].after(RonenArielyDiv);

    /*------------------------------------------------------------------------------  */
    /*------------------------------------------------------------------------------  */
    /*------------------------------------------ Adding the content to RonenArielyDiv */

    /*___________________________________________________________________________*/
    // Add link to Ronen Ariely site (credit on script, please do not remove this)
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

    RonenArielyDiv.appendChild(RonenArielyiconS);
    RonenArielyiconS.appendChild(RonenArielyiconA);
    (async function() {
        var RonenArielyiconImg = document.createElement("img");
        RonenArielyiconImg.src = await GM.getResourceUrl("RonenArielyicon");
        RonenArielyiconA.appendChild(RonenArielyiconImg);
    })();

    /*___________________________________________________________________________*/
    // Add Setting button
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

    /*___________________________________________________________________________*/
    // Adding the new cleaning Button
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

    /*___________________________________________________________________________*/
    // Adding the buttom to show the sub-content
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

    /*___________________________________________________________________________*/
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

    /*___________________________________________________________________________*/
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
        document.cookie = "RonenArielyInput1=" + document.getElementById("input01").checked + "; Expires=Wed, 27 Feb 2022 07:28:00 GMT; path=/";
        document.cookie = "RonenArielyInput2=" + document.getElementById("input02").checked + "; Expires=Wed, 27 Feb 2022 07:28:00 GMT; path=/";
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





    //------------------------------------------------------- My Favourite
    MyGroup = document.createElement("optgroup");
    MyGroup.label = "My Favourite";
    MyGroup.style.fontSize = "large";
    MyGroup.style.color = "#ffff00";
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



    /*

    (1) Import the data to table from excel

CREATE TABLE [dbo].[QnA_Forum](
	[PARENT] [varchar](100) NULL,
	[CHILD] [varchar](100) NULL
) ON [PRIMARY]
GO


    (2) Get the JSON using

;With MyCTE AS (
	SELECT c = ('{"' + parent + '":[' + STRING_AGG('"' + CHILD + '"' , ',') WITHIN GROUP (ORDER BY parent) + ']}')
	FROM QnA_Forum
	GROUP BY parent
)
SELECT '[' + STRING_AGG(CONVERT(VARCHAR(MAX),c) , ',') + ']'
FROM MyCTE
GO




    */

    var Tags = [
        {"azure-ai-machine-learning":["azure-anomaly-detector","azure-bing-autosuggest","azure-bing-custom","azure-bing-entity","azure-bing-image","azure-bing-news","azure-bing-spellcheck","azure-bing-video","azure-bing-visual",
                                      "azure-bing-web","azure-bot-service","azure-cognitive-services","azure-computer-vision","azure-content-moderator","azure-custom-vision","azure-data-science-vm","azure-face","azure-farmbeats",
                                      "azure-form-recognizer","azure-genomics","azure-immersive-reader","azure-ink-recognizer","azure-language-understanding","azure-machine-learning","azure-machine-learning-inference","ronen",
                                      "azure-machine-learning-studio-classic","azure-open-datasets","azure-personalizer","azure-qna-maker","azure-speech","azure-text-analytics","azure-translator"]
        }
        ,{"azure-analytics":["azure-analysis-services","azure-databricks","azure-data-catalog","azure-data-explorer","azure-data-factory","azure-data-lake-analytics","azure-data-lake-storage","azure-data-share","azure-event-hubs",
                             "azure-hdinsight","azure-hdinsight-rserver","azure-stream-analytics","azure-synapse-analytics"]
         }
        ,{"azure-blockchain":["azure-blockchain-service","azure-blockchain-workbench"]
         }
        ,{"azure-compute":["azure-batch","azure-cloud-services","azure-cyclecloud","azure-dedicated-host","azure-functions","azure-kubernetes-service","azure-sap","azure-service-fabric","azure-service-fabric-mesh",
                           "service-fabric-standalone","azure-spring-cloud","azure-sql-virtual-machines","azure-virtual-machines","azure-spot","azure-virtual-machines-backup","azure-virtual-machines-extension",
                           "azure-virtual-machines-images","azure-virtual-machines-migration","azure-virtual-machines-monitoring","azure-virtual-machines-networking","azure-virtual-machines-scale-set","azure-virtual-machines-sql",
                           "azure-virtual-machines-storage","azure-vmware-solution","windows-virtual-desktop"]
         }
        ,{"azure-containers":["azure-container-instances","azure-container-registry","azure-redhat-openshift"]}
        ,{"azure-databases":["azure-api-fhir","azure-cache-redis","azure-cosmos-db","azure-database-mariadb","azure-database-migration","azure-database-mysql","azure-database-postgresql","azure-sql-database","azure-sqldatabase-edge","azure-table-storage"]}
        ,{"azure-developer-tools":["azure-app-configuration","azure-devtestlabs","azure-dtl-arm-enviorments","azure-dtl-artifacts","azure-dtl-automation","azure-dtl-base-images","azure-dtl-networks","azure-dtl-schedules","azure-dtl-virtual-machines","azure-dev-tool-integrations","azure-labservices","azure-classroom-labs","azure-lab-services-accounts","azure-lab-services-automation","azure-lab-services-base-images","azure-lab-services-pricing","azure-lab-services-schedules","azure-lab-services-templates-virtual-machines"]}
        ,{"azure-hybrid":["azure-arc","azure-stack","azure-stack-hci","azure-stack-hub","windows-azure-pack"]}
        ,{"azure-identity":["azure-active-directory","azure-ad-access-reviews","azure-ad-app-development","azure-ad-application-proxy","azure-ad-app-management","azure-ad-app-registration","azure-ad-audit-logs","azure-ad-authentication","azure-ad-authentication-protocols","azure-ad-b2b","azure-ad-conditional-access","azure-ad-connect","azure-ad-connect-health","azure-ad-device-management","azure-ad-fs","azure-ad-graph","azure-ad-group-management","azure-ad-hybrid-identity","azure-ad-identity-governance","azure-ad-libraries","azure-ad-licensing","azure-ad-microsoft-account","azure-ad-multi-factor-authentication","azure-ad-pass-through-authentication","azure-ad-password-hash-sync","azure-ad-passwordless-authentication","azure-ad-password-protection","azure-ad-privileged-identity-management","azure-ad-rbac","azure-ad-sign-in-logs","azure-ad-single-sign-on","azure-ad-sspr","azure-ad-tenant","azure-ad-user-management","azure-ad-user-provisioning","azure-ad-b2c","azure-ad-domain-services","azure-information-protection"]}
        ,{"azure-integration":["azure-api-management","azure-event-grid","azure-logic-apps","azure-service-bus"]}
        ,{"azure-iot":["azure-digital-twins","azure-iot","azure-iot-central","azure-iot-dps","azure-iot-edge","azure-iot-hub","azure-iot-pnp","azure-iot-sdk","azure-maps","azure-rtos","azure-sphere","azure-time-series-insights"]}
        ,{"azure-management-governance":["azure-automation","azure-backup","azure-blueprints","azure-cost-management","azure-lighthouse","azure-managed-applications","azure-monitor","azure-policy","azure-scheduler","azure-site-recovery"]}
        ,{"azure-media":["azure-media-services"]}
        ,{"azure-migration":["azure-migrate"]}
        ,{"azure-mixed-reality":["azure-kinect-dk","azure-remote-rendering","azure-spatial-anchors"]}
        ,{"azure-mobile":["azure-notification-hubs"]}
        ,{"azure-networking":["azure-application-gateway","azure-bastion","azure-cdn","azure-ddos-protection","azure-dns","azure-expressroute","azure-firewall","azure-firewall-manager","azure-front-door","azure-internet-analyzer","azure-load-balancer","azure-network-watcher","azure-private-link","azure-traffic-manager","azure-virtual-network","azure-virtual-wan","azure-vpn-gateway","azure-web-application-firewall"]}
        ,{"azure-security":["azure-dedicated-hsm","azure-key-vault","azure-security-center","azure-sentinel"]}
        ,{"azure-storage":["azure-archive-storage","azure-avere-vfxt","azure-blob-storage","azure-data-box-family","azure-disk-encryption","azure-disk-storage","azure-files","azure-file-storage","azure-fxt-edge-filer","azure-hpc-cache","azure-managed-disks","azure-netapp-files","azure-queue-storage","azure-storage-accounts","azure-storage-explorer","azure-storsimple"]}
        ,{"azure-web":["azure-cognitive-search","azure-signalr-service","azure-webapps","azure-webapps-apis","azure-webapps-authentication","azure-webapps-auto-heal","azure-webapps-availability","azure-webapps-backup","azure-webapps-compliance-reports","azure-webapps-content-deployment","azure-webapps-custom-domains","azure-webapps-development","azure-webapps-hybrid-connection","azure-webapps-ip-addresses","azure-webapps-migration","azure-webapps-monitoring","azure-webapps-performance","azure-webapps-scaling","azure-webapps-security","azure-webapps-ssh","azure-webapps-ssl-certifcates","azure-webapps-vnet","azure-webapps-webjobs"]}
        ,{"dotnet":["dotnet-ad-docker","dotnet-ad-enterprise","dotnet-ad-installer","dotnet-ad-linux","dotnet-adonet","dotnet-ad-vs","dotnet-android","dotnet-apache-spark","dotnet-aspnet-ajax","dotnet-aspnetcore-blazor","dotnet-aspnetcore-general","dotnet-aspnetcore-mvc","dotnet-aspnetcore-razor","dotnet-aspnetcore-realtime","dotnet-aspnetcore-webapi","dotnet-aspnet-general","dotnet-aspnet-iisnet","dotnet-aspnet-mvc","dotnet-aspnet-spa","dotnet-aspnet-webapi","dotnet-aspnet-webforms","dotnet-aspnet-webpages","dotnet-cli","dotnet-console","dotnet-crossplatform-general","dotnet-csharp","dotnet-entity-framework","dotnet-entity-framework-core","dotnet-fsharp","dotnet-gamedev","dotnet-ios","dotnet-iot","dotnet-macos","dotnet-mlnet","dotnet-mobile-general","dotnet-package-management","dotnet-runtime","dotnet-runtime-core","dotnet-runtime-framework","dotnet-sqlclient","dotnet-sqlite","dotnet-standard","dotnet-tvos","dotnet-visual-basic","dotnet-watchos","dotnet-xamarinessentials"]}
        ,{"m365-ems":["ems-advanced-threat-analytics"]}
        ,{"microsoft-endpoint-manager":["microsoft-identity-manager","intune-all","intune-admin-center","intune-application-management","intune-conditional-access","intune-device-configurations","intune-enrollment","intune-general","mem-analytics-reporting","mem-autopilot","mem-intune-graph","mem-mdt","m365-ems-all"]}
        ,{"microsoft-robotics":["microsoft-robotics-general"]}
        ,{"ms-edge":["ms-edge"]}
        ,{"msc-configuration-manager":["me-cm-analytics","me-cm-application","me-cm-cmpivot","me-cm-co-management","me-cm-general","me-cm-osd","me-cm-sdk","me-cm-site-deployment","me-cm-updates"]}
        ,{"msc-essentials":["msc-essentials-2010","msc-essentials-deployment","msc-essentials-general","msc-essentials-inventory","msc-essentials-monitoring","msc-essentials-rom","msc-essentials-software","msc-essentials-updates"]}
        ,{"msc-operations-manager":["msc-operations-manager-apm","msc-operations-manager-authoring","msc-operations-manager-deployment","msc-operations-manager-extensibility","msc-operations-manager-general","msc-operations-manager-linux","msc-operations-manager-mp","msc-operations-manager-reporting"]}
        ,{"msc-orchestrator":["msc-orchestrator-deployment","msc-orchestrator-general","msc-orchestrator-sc-integration","msc-orchestrator-sdk","msc-orchestrator-spf","msc-orchestrator-third-party-integration"]}
        ,{"msc-service-manager":["msc-service-manager-administration","msc-service-manager-authoring","msc-service-manager-connector","msc-service-manager-data-warehouse","msc-service-manager-general","msc-service-manager-itil","msc-service-manager-portal","msc-service-manager-setup"]}
        ,{"msc-virtual-machine-manager":["msc-virtual-machine-manager-clustering","msc-virtual-machine-manager-extension-handler","msc-virtual-machine-manager-general","msc-virtual-machine-manager-hyper-v","msc-virtual-machine-manager-sc-integration","msc-virtual-machine-manager-self-service-portal","msc-virtual-machine-manager-setup","msc-virtual-machine-manager-v2v"]}
        ,{"office":["office-addins-dev","m365-apps-publishing-dev","microsoft-graph-analytics","microsoft-graph-azure-ad","microsoft-graph-calendar","microsoft-graph-calendar-places","microsoft-graph-change-notifications","microsoft-graph-cloud-communications","microsoft-graph-corporate-mgmt","microsoft-graph-cross-device","microsoft-graph-customer-booking","microsoft-graph-data","microsoft-graph-data-connect","microsoft-graph-education","microsoft-graph-explorer","microsoft-graph-extensions","microsoft-graph-files","microsoft-graph-financials","microsoft-graph-general","microsoft-graph-groups","microsoft-graph-insights","microsoft-graph-mail","microsoft-graph-notifications","microsoft-graph-onenote","microsoft-graph-people","microsoft-graph-print","microsoft-graph-profile","microsoft-graph-reports","microsoft-graph-sdk","microsoft-graph-search","microsoft-graph-security","microsoft-graph-sites-lists","microsoft-graph-tasks-plans","microsoft-graph-teams","microsoft-graph-teamwork","microsoft-graph-todo","microsoft-graph-toolkit","microsoft-graph-user-notifications","microsoft-graph-users","microsoft-graph-workbooks","office-deployment","office-excel-itpro","office-for-mac-itpro","office-itpro","office-onedrive-client-itpro","office-onenote-client-itpro","office-outlook-itpro","office-powerpoint-itpro","office-visio-itpro","office-word-itpro","office-exchange-hybrid-itpro","office-exchange-online-itpro","office-exchange-server-administration","office-exchange-server-connectivity","office-exchange-server-deployment","office-exchange-server-ha","office-exchange-server-itpro","office-exchange-server-mailflow","office-js-dev","office-lync-server-administration","office-lync-server-conferencing","office-lync-server-deployment","office-lync-server-edge-servers","office-lync-server-enterprise-voice","office-lync-server-itpro-general","office-lync-server-sign-in","office-online-server-deployment","office-online-server-exchange","office-online-server-general","office-online-server-sfb","office-online-server-sharepoint","office-online-server-view-edit","office-scriptlab-dev","office-sharepoint-online","office-sharepoint-server-administration","office-sharepoint-server-customization","office-sharepoint-server-development","office-sharepoint-server-itpro","office-sharepoint-server-search-itpro","office-skype-business-online-itpro","office-skype-business-server-itpro-all","office-skype-business-server-administration","office-skype-business-server-conferencing","office-skype-business-server-deployment","office-skype-business-server-edge-servers","office-skype-business-server-enterprise-voice","office-skype-business-server-itpro-general","office-skype-business-server-sign-in","office-teams-linux-itpro","office-teams-windows-itpro","office-vba-dev","office-vsto-com-dev","sharepoint-apps-general-dev","sharepoint-workflow-dev"]}
        ,{"openspecs":["openspecs-all","openspecs-office","openspecs-office-exchange","openspecs-office-fileformats","openspecs-office-sharepoint","openspecs-questions","openspecs-sqlserver","openspecs-windows","openspecs-windows-filesharing"]}
        ,{"power-query":["power-query-connectors","power-query-dataflows","power-query-desktop","power-query-m","power-query-online"]}
        ,{"small-basic":["small-basic-community-challenges","small-basic-discussion","small-basic-featured-program","small-basic-general"]}
        ,{"sql-server":["sql-server-migration","sql-server-migration-assistant","sql-server-windows","sql-server-analysis-services","sql-server-general","sql-server-integration-services","sql-server-reporting-services","sql-server-transact-sql"]}
        ,{"vs":["vs-debugging","vs-extensions","vs-general","vs-msbuild","vs-setup","vs-testing"]}
        ,{"windows":["windows-10-application-compatibility","windows-10-general","windows-10-hardware-performance","windows-10-network","windows-10-security","windows-10-setup","windows-10-virtualization","windows-7-application-hardware-compatibility","windows-7-general","windows-7-network","windows-7-setup","windows-7-virtual-pc-xp-mode","windows-8-application-hardware-compatibility","windows-8-general","windows-8-network","windows-8-setup","windows-8-virtualization","winapi-all","winapi-audio-video","winapi-compatibility","winapi-general","winapi-sdk","winapi-security","winapi-ui","windows-forms","windows-iot-10-core","windows-partner-center-api","windows-partner-center-general","windows-partner-center-submission","windows-10-universal","windows-desktop-bridge","windows-runtime","windows-uwp","windows-uwp-feedback","windows-uwp-runtime","windows-uwp-xaml","win-universal-app","windows-wcf","windows-wpf","windows-embedded-all","windows-hardware-certification","windows-hardware-code-audio","windows-hardware-code-camera","windows-hardware-code-general","windows-hardware-code-ndis","windows-hardware-code-storage","windows-hardware-ewdk","windows-hardware-wdk","windows-hardware-wdk-general","windows-active-directory","windows-dhcp-dns","windows-group-policy","windows-home-server-2011","windows-network-access-protection","windows-platform-network","windows-remote-desktop-client","windows-remote-desktop-services","windows-server","windows-server-2012","windows-server-2016","windows-server-2019","windows-server-applicationcompatibility-certification","windows-server-backup","windows-server-branch-office","windows-server-clustering","windows-server-core","windows-server-essentials","windows-server-fslogix","windows-server-hyper-v","windows-server-infrastructure","windows-server-ipv6","windows-server-management","windows-server-manager","windows-server-migration","windows-server-nano","windows-server-powershell","windows-server-print","windows-server-security","windows-server-setup","windows-server-storage","windows-server-update-services","windows-server-virtualization","windows-small-business-server"]}
        ,{"windows-sysinternals":["windows-sysinternals-autoruns","windows-sysinternals-bginfo","windows-sysinternals-general","windows-sysinternals-misc-utilities","windows-sysinternals-procexp","windows-sysinternals-procmon","windows-sysinternals-pstools","windows-sysinternals-sysmon"]}
    ];
    //alert(Object.values(Tags).length);


    for (var x = 0; x < Object.values(Tags).length; x++) {
    //for (var x = 0; x < 5; x++) {

        MyGroup = document.createElement("optgroup");
        MyGroup.label = Object.keys(Object.values(Tags)[x])[0];
        MyGroup.style.fontSize = "large";
        MyGroup.style.color = "#ffff00";
        ListOfForums.add(MyGroup);
        //alert(Object.values(Object.values(Tags)[x])[0].length);
        //alert(Object.values(RonenList)[0].length);
        for (var i = 0; i < Object.values(Object.values(Tags)[x])[0].length; i++) {
            let NewOption = document.createElement("option");
            NewOption.text = Object.values(Object.values(Tags)[x])[0][i];
            NewOption.value = Object.values(Object.values(Tags)[x])[0][i];
            ListOfForums.add(NewOption);
        }


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

    document.cookie = "RonenArielyInput1=true; Expires=Wed, 27 Feb 2022 07:28:00 GMT; path=/";
}




/**********************************************************************/
/**********************************************************************/
/****************************** RonenArielySubContent Function ********/
function RonenArielySubContent () {

    document.getElementById("Add_Show_Hide").disabled = true;
    document.getElementById("Add_Show_Hide").style.background = "gray";
    document.getElementById("Add_Show_Hide").innerHTML = "Disabled";

    /*_______________________________________________________________________________*/

    // Array of all the threads
    //_old_// var ListOfMainQuestions
    //_old_// var ListOfMainIdeas
    var ListOfMainThreads

    // Note! Each time the forum team change the DOM of the page, we need to fix this in order to find the threads!
    //---------------------------------------------------------------------------
    //_old_// ListOfMainThreads = document.getElementsByClassName("node-list-item og-poster-list-item");

    //_old_// ListOfMainQuestions = document.getElementsByClassName("node-list-item question-list-item");
    //_old_// console.log("ListOfMainQuestions: " + ListOfMainQuestions.length);
    //_old_// ListOfMainIdeas = document.getElementsByClassName("node-list-item idea-list-item");
    //_old_// console.log("ListOfMainIdeas: " + ListOfMainIdeas.length);

    ListOfMainThreads = document.getElementsByClassName("node-list-item");
    console.log("ListOfMainThreads: " + ListOfMainThreads.length);

    //---------------------------------------------------------------------------
    var ThreadID;
    var URL;

    for (i = 0; i < ListOfMainThreads.length; i++) {

        // Find the URL to the thread page
        //URL = ListOfMainQuestions[i].getElementsByTagName("a")[3].getAttribute("href");
        URL = ListOfMainThreads[i].getElementsByTagName("h2")[0].getElementsByTagName("a")[0].getAttribute("href");
        // https://docs.microsoft.com/answers/questions/114927/secondary-replica-not-synchronising-in-basic-avail.html
        // https://docs.microsoft.com/answers/idea/116122/tag-list-should-be-alpha.html

        ThreadID = URL.match(/\d+/)

        console.log("Thread Num: " + i + "; URL: " + URL + "; ThreadID: " + ThreadID);

        let RonenArielySubContentLoadButton = document.createElement("button");
        RonenArielySubContentLoadButton.setAttribute("id", "RonenArielySubContentLoadButton_" + ThreadID);
        RonenArielySubContentLoadButton.style.margin = "0px 5px 0px 10px";
        RonenArielySubContentLoadButton.innerHTML = "➡";

        //document.getElementsByClassName("col-xs-1 col-sm-2 col-md-1 icon-wrapper")[i].style.width = "100px";
        //document.getElementsByClassName("col-xs-1 col-sm-2 col-md-1 icon-wrapper")[i].appendChild(RonenArielySubContentLoadButton);

        // col-xs-2 col-sm-2 col-md-1 icon-wrapper
        document.getElementsByClassName("col-xs-2 col-sm-2 col-md-1 icon-wrapper")[i].style.width = "100px";
        document.getElementsByClassName("col-xs-2 col-sm-2 col-md-1 icon-wrapper")[i].appendChild(RonenArielySubContentLoadButton);

        MyaddEventListener (i, ThreadID, URL);

    }

    document.cookie = "RonenArielyInput2=true; Expires=Wed, 27 Feb 2022 07:28:00 GMT; path=/";
}

function MyaddEventListener (_ThreadContent, _ThreadID, _URL){
        document.getElementById("RonenArielySubContentLoadButton_" + _ThreadID).addEventListener ("click", function() {
            //alert("_ThreadContent: " + _ThreadContent + "; _ThreadID: " + _ThreadID + "; _URL: " + _URL);
            RonenArielySubContentLoad (_ThreadContent, _ThreadID, _URL);
        });
}

/**********************************************************************/
/**********************************************************************/
/********************* Loading the external page of the thread itself */
function RonenArielySubContentLoad (_ThreadContent, _ThreadID, _URL) {
    //alert("ThreadNum: " + _ThreadContent + "; URL: " + _URL + "; ThreadID: " + _ThreadID);

    //alert(document.getElementById("RonenArielySubContentLoadButton_" + _ThreadID).id);
    document.getElementById("RonenArielySubContentLoadButton_" + _ThreadID).style.display = 'none';



    // Show/Hide Button
    var ShowHidContentButton = document.createElement("button");
    ShowHidContentButton.setAttribute("id", "ShowHidContentButton_" + _ThreadID);
    ShowHidContentButton.style.margin = "0px 5px 0px 10px";
    ShowHidContentButton.innerHTML = "❎";
    document.getElementsByClassName("col-xs-2 col-sm-2 col-md-1 icon-wrapper")[_ThreadContent].appendChild(ShowHidContentButton);
    ShowHidContentButton.addEventListener ("click", function() {ShowHidContent("ContentDiv_" + _ThreadContent, "ShowHidContentButton_" + _ThreadID);});


    /*********************************** Create the div for the content and add them to the page *******************/
    var MyDiv = document.createElement("div");
    MyDiv.setAttribute("id", "ContentDiv_" + _ThreadContent);
    MyDiv.style.width = "100%";
    MyDiv.style.clear = "both";

    var MyDiv0 = document.createElement("div");
    MyDiv0.setAttribute("id", "ContentDiv0_" + _ThreadContent);
    MyDiv0.style.width = "115px";
    MyDiv0.style.float = "left";
    MyDiv0.innerHTML = "&nbsp;&nbsp;&nbsp;";
    MyDiv.append(MyDiv0);

    var MyDiv1 = document.createElement("div");
    MyDiv1.setAttribute("id", "ContentDiv1_" + _ThreadContent);
    MyDiv1.style.border = "1px solid #A0AAEE";
    MyDiv1.style.backgroundColor = "#DDDDFF";
//     MyDiv1.style.border = "1px solid rgb(129, 175, 245);";
//     MyDiv1.style.backgroundColor = "rgb(244, 244, 255, 1);";
    MyDiv1.style.width = "calc(100% - 115px)";
    MyDiv1.style.float = "left";
    MyDiv1.innerHTML = "Loading...";
    MyDiv.append(MyDiv1);

    //_old_// document.getElementsByClassName("node-list-item question-list-item")[_ThreadContent].after(MyDiv);
    document.getElementsByClassName("node-list-item")[_ThreadContent].after(MyDiv);

    /*********************************** Load External Page of the thread *******************/
    // Note! If we will have a well formatted RSS then we should replace this part and load the RSS,
    // instead of loading the full HTML+CSS+Scripos of the client page

    var xdsfa = GM.xmlHttpRequest({
        method: "GET",
        //url: _URL,
        url: "https://docs.microsoft.com/en-us/" + _URL,
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


            for (i = 0; i < htmlDoc.getElementsByClassName("comments-expand").length; i++) {
                //htmlDoc.getElementsByClassName("comments-expand")[i].style.display = "none";
                htmlDoc.getElementsByClassName("comments-expand")[i].href = "https://docs.microsoft.com/en-us/" + _URL;
                //htmlDoc.getElementsByClassName("comments-expand")[i].setAttribute('target', '_blank');
                htmlDoc.getElementsByClassName("comments-expand")[i].innerHTML = "In order to load more comments, click here to open the thread in separate page";
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


/**********************************************************************/
/**********************************************************************/
/***************************************************** ShowHidContent */
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


/**********************************************************************/
/**********************************************************************/
/*****************************************************  */
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


/**********************************************************************/
/**********************************************************************/
/***************************************************** ShowHidContent */
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


/**********************************************************************/
/**********************************************************************/
/******************************************** Remove Feedback Request */
function OnSubtreeModified(){
    console.log('DOM Changed at ' + new Date());
    if(document.querySelector("[title='Usabilla Feedback Form']")){
        document.querySelector("[title='Usabilla Feedback Form']").remove();
        alert("Feedback was removed!");
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
