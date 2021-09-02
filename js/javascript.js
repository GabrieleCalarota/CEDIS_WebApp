var pushObj, setRicerca, getRicerca, getRequestID, setRequestID, getResHide, setResHide, getUserID, setUserID,
    setSelection, getSelection, flagA = 0;
var timerSearch;
var timerCopy;
var UsedLang;
var language = {
    "en": {
        "string": {
            "page-title": "<nobr>Search Engine</nobr>",
            "logButton-content": "Login",
            "change": "Change Password",
            "confirmChangeButton": "Confirm",
            "exit": "Logout",
            "contactButton": "Contact",
            "contactLabel": "Contact us",
            "help": "Help",
            "user-title": "User: ",
            "psw-actually": "Current password",
            "psw-new": "New password",
            "psw-new2": "Confirm new password",
            "psw-change": "Change",
            "login-user": "User Name",
            "login-psw": "Password",
            "login-btn": "Login",
            "welcome-body": "To search for one or more codes, please write in the searchbar above",
            "welcome-title": "Welcome to the CEDIS CODE search engine",
            "problem-label": "Enter the presentation  here",
            "problem-name": "Name",
            "problem-info": "The message will be sent to the address <a href='mailto:icdcodeit_validation@smartdata.cs.unibo.it'> <b> icdcodeit_validation@smartdata.cs.unibo.it</b></a>, otherwise it's possible to call the number <a href='tel:+393409736839'> <b>340 9736839</b>.</a>",
            "contatta": "Send",
            "languageButton": "Language"

        },
        "tooltip": {
            "codeCopy": "Copy the selected code"
        },
        "toast": {
            "diagnosi-not-found": "The keywords did not show results, try again with other words",
            "send-success": "Sending data successfully!",
            "send-error": "Sending error!",
            "sender-not-logged": "To be able to send data it is necessary to authenticate,&nbsp; <b><i><a href='#login' class='modal-trigger white-text'> click here to log in </a></i></b>",
            "login-success": "Login successful!",
            "login-wrong": "Wrong username/password",
            "logout-success": "Logout successful!",
            "logout-wrong": "Logout unsuccessful!",
            "changePass-success": "Password change made successfully!",
            "changePass-wrong": "Current password is wrong",
            "changePass-error": "The two passwords don't match",
            "email-success": "Email successfully sent!",
            "email-error": "Error sending mail, try again!",
            "help-user": "Search for CEDIS codes using the search bar, here is a short tutorial",
            "help-enter": "Press the ENTER key to search",
            "help-codes": "Here are all the results of the research",
            "help-select": "Now you can select the most relevant code"
        },
        "placeholder": {
            "search": "Example: Nose trauma"
        }
    },
    "it": {
        "string": {
            "page-title": "<nobr>Ricerca codici CEDIS</nobr>",
            "logButton-content": "Accedi",
            "change": "Cambio Password",
            "confirmChangeButton": "Conferma",
            "exit": "Esci",
            "contactButton": "Contattaci",
            "contactLabel": "Contattaci",
            "help": "Aiuto",
            "user-title": "Utente: ",
            "psw-actually": "Password attuale",
            "psw-new": "Nuova password",
            "psw-new2": "Conferma nuova password",
            "psw-change": "Cambia",
            "login-user": "Nome utente",
            "login-psw": "Password",
            "login-btn": "Accedi",
            "welcome-body": "Per cercare uno o più codici, ti preghiamo di scrivere le parole chiave dell'orientamento all'interno della barra di ricerca sovrastante",
            "welcome-title": "Qui troverai i codici CEDIS e le definizioni ufficiali tradotte dal ministero della salute",
            "problem-label": "Inserisci qui l'orientamento",
            "problem-name": "Nome",
            "problem-info": "Il messaggio verrà inviato all'indirizzo <a href='mailto:icdcodeit_validation@smartdata.cs.unibo.it'> <b> icdcodeit_validation@smartdata.cs.unibo.it </b></a>, altrimenti è possibile chiamare il numero <a href='tel:+393409736839'> <b> 340 9736839 </b>.</a>",
            "contatta": "Invia",
            "languageButton": "Lingua"
        },
        "tooltip": {
            "codeCopy": "Copia il codice selezionato"
        },
        "toast": {
            "diagnosi-not-found": "L'orientamento non ha prodotto risultati, riprova con altre parole",
            "send-success": "Invio dati avvenuto con successo!",
            "send-error": "Errore di invio!",
            "sender-not-logged": "Per poter inviare i dati è necessario autenticarsi,&nbsp; <b><i><a href='#login' class='modal-trigger white-text'> clicca qui per autenticarti </a></i></b>",
            "login-success": "Login effettuato con successo!",
            "login-wrong": "Username/password errati",
            "logout-success": "Logout effettuato con successo!",
            "logout-wrong": "Logout non evvenuto!",
            "changePass-success": "Cambio password effettuato con successo!",
            "changePass-wrong": "La password attuale è sbagliata",
            "changePass-error": "Le password non corrispondono",
            "email-success": "Email inviata con successo!",
            "email-error": "Errore invio mail, riprova!",
            "help-user": "Cerca i codici CEDIS utilizzando la barra di ricerca, ecco un breve tutorial",
            "help-enter": "Premi il tasto INVIO per cercare",
            "help-codes": "Ecco tutti i risultati della ricerca",
            "help-select": "Ora è possibile selezionare il codice più pertinente",
        },
        "placeholder": {
            "codes": "Esempio: Trauma nasale"
        }
    }
}

var filepath = "NACRSv5.1_ITA.json"

function filterCodes(data, filter){
    if (!filter){
        return data;
    }
    const regexStr = '(?=.*' + filter.split(/\,|\s/).join(')(?=.*') + ')';
    const searchRegEx = new RegExp(regexStr, 'gi');
    result = {}
    //console.log(filter);
    $("#codesForm").show();
    $("#codesForm li.list-0").hide();
    for (var class_name in data) {
        var objects = data[class_name]
        for (var index in objects) {
            var object_code = objects[index]
            let [code] = Object.keys(object_code)
            var description = object_code[code]['Description'];
            //console.log(description);
            //console.log(words);
            var $li = $("li[code='" + code + "']");
            var $li_parent = $li.parents("li");
            //console.log($li);
            if (description.toLowerCase().match(searchRegEx)) {
                //console.log("Description "+description+" Code "+code);
                //$label = $("label[for='" + code + "']");
                //$li = $label.parent("li");
                //console.log($li)
                //$li.hide();
                result[code] = {'Description': description};
                //console.log(description);
                $li.show();
                $li_parent.show();
                //console.log($li);
            } else {
                $li.hide();
                //var $children = $li_parent.find("li");
                //console.log($children.css('display')=='none');
                //$li_parent.hide();
                /*$children.each(function(i, obj){
                   if (obj.style['display']){
                       $li_parent.show();
                   }
                });*/
            }
        }
    }
    //$("#codesForm").show();
    //console.log(filter);
    //console.log(result);
    //expandAllCollapsible()
    return result;
}

function getCodes(filter){
    $("#home").hide();
    $("#preloader").fadeIn();
    //var ric = $("#search").val();
    $("#codesForm").slideUp(100, "swing");
    //$("#codes").val("");
    $.getJSON( filepath, function( data ) {
        /*for (var key in data) {
            data.sort(function (a, b) {
                return b[1].Description - a[1].Description
            })
        }
        console.log(data)*/
        refreshVar();
        $("#preloader").fadeOut(function () {
            if (filter){
                data = filterCodes(data, filter);
            } else {
                setResult(data);
            }
        });
        if (filter){
            expandAllCollapsible();
        }
    });
}

function createDictionary(result){
    level0 = {} //DIZIONARIO PRESUNTI PADRI-ROOT
    //var level1 = {} //DIZIONARIO PRESUNTI FIGLI
    //var level2 = {} //DIZIONARIO PRESUNTI NIPOTI
    for (var class_name in result) {
        level0[class_name] = {};
        var level1 = [];
        var result2 = result[class_name];
        for (var index in result2) {
            var object_code = result2[index]
            let [code] = Object.keys(object_code)
            var temp = {}
            temp.count = 1;
            temp.code = code;
            temp.class = class_name;
            temp.name = object_code[code]['Description'];
            temp.code_int = parseInt(code);
            level1.push(temp);
        }
        level0[class_name].figli = level1;
    }
    return level0;
}

function sort(level0){
    var order = Object.keys(level0).sort(function (a, b) {
        return level0[a].code_int - level0[b].code_int;
    });
    return order;
}

/*
function sort(level0) {
    var order = Object.keys(level0).sort(function (a, b) {
        return level0[b].score - level0[a].score;
    });
    return order;
}*/

function expandAllCollapsible(){

    //var instance = M.Collapsible.getInstance($('.collapsible'));
    //instance.open();

    $(".collapsible-header.class-description").addClass("active");
    $(".collapsible.class-description").collapsible({accordion: false});
}

function collapseAllCollapsible(){
    $(".collapsible.class-description").removeClass(function(){
        return "active";
    });
    $(".collapsible.class-description").collapsible({accordion: true});
    $(".collapsible.class-description").collapsible({accordion: false});
}

function annidate(obj, level, description) {
    if (level > 0) {
        var $li = $("<li class='list-" + level + "' code='" + obj.code + "'></li>");
        var $checkbox = $("<input type='checkbox' id='" + obj.code + "' name='" + obj.name + "' />");
        var $label = $("<label class='collapsible-header grey-text text-darken-3' for='" + obj.code + "' score=" + obj.score + "><span class='l9 m8 s8 col'><b>" + obj.name + "</b></span>" +
            "<i class='col l1 m1 s1 right material-icons hide-on-small-only'>content_copy</i>  <span class='col l2 m3 s3 right code'>" + obj.code + "</span> </label>");
        //var $body = $("<div class='collapsible-body'></div>");
        $li.append($checkbox);
        $li.append($label);
        //$li.append($body);
    } else{
        var $li = $("<li class='list-"+ level + "' id='"+description+"'>");
        var $checkbox = $("<input type='checkbox' />");
        var name = description.replace(/\([0-9]{3}-[0-9]{3}\)/g, '');
        //console.log(description);
        //console.log(name);
        var range_num = description.replace(name, '').replace("(", "[").replace(")", "]");
        var $label = $("<label class='collapsible-header class-description grey-text text-darken-3' for='" + description + "' " +
            "><span class='col l9 m8 s8'><b>" + name + "</b></span></label>");
        var $span = $("<span class='col l2 m3 s3 right hide-on-small-only'>"+range_num+"</span>");
        $li.append($checkbox);
        $li.append($label);
    }
    if (!("figli" in obj)) {
        return $li;
    } else {
        var $i = $("<i class='col l1 m1 s1 circle material-icons right closed white grey-text tooltipped' data-position='left' " +
            "data-delay='1000' data-tooltip='Espandi / riduci menu'>keyboard_arrow_down</i>");
        var $body = $("<div class='collapsible-body'></div>");
        var $ul = $("<ul class='collapsible popout row' data-collapsible='expandable'></ul>");
        var nFigli = 0;
        //$li.append($i);
        $label.append($i);
        $label.append($span);
        $body.append($ul);
        $li.append($body);
        $.each(obj.figli, function (index, value) {
            $ul.append(annidate(obj.figli[index], level+1));
            nFigli++;
        })
        //var $span = $("<span class='right grey-text nAnnidamento'>" + nFigli + "</span>");
        //$label.append($span);
    }
    return $li;
}





function logged(user) {
    setUserID(user);
    Cookies.set('userWA', user);
    $("#logButton").removeClass("scale-in").addClass("scale-out").hide();
    $("#col").show()
        .removeClass("scale-out")
        .addClass("scale-in");
    $("#nUtente").show()
        .removeClass("scale-out")
        .addClass("scale-in");
    $("#user-id").html(user);
    $('#col').collapsible('close', 0);
    $('#login').modal('close');
    getCodes();
}



function setResult(result) {
    var level0 = createDictionary(result);
    var order = level0;
    //var order = sort(level0);
    var $res = $("<ul class='collapsible class-description row' data-collapsible='expandable'></ul>");
    //console.log(result);
    if (result.length == 0) {
        Materialize.toast(language[UsedLang]["toast"]["diagnosi-not-found"], 4000, "lime");
        $("#code-wrapper").addClass("scale-out");
    } else {
        for (var key in order) {
            var obj = level0[key];
            var li = annidate(obj, 0, key);
            $res.append(li);
        }
        $("#codesForm").html($res);
        $("#codesForm").slideDown(500, "swing");
        $("#code-wrapper").removeClass("scale-out");
        //$("#search").blur();
        $('.collapsible').collapsible({
            onOpen: function (el) {
                //console.log("opened");
                //console.log(el.children("label").children("i.tooltipped").length);
                if (el.children("label").children("i.tooltipped").length > 0) {
                    expand_or_collapse.call(el.children("label").children("i.tooltipped"))
                }
            },
            onClose: function (el) {
                //console.log("closed");
                //console.log(el.children("label").children("i.tooltipped"));
                //console.log(el.children("label").children("i.tooltipped").length);
                if (el.children("label").children("i.tooltipped").length > 0) {
                    expand_or_collapse.call(el.children("label").children("i.tooltipped"))
                }
            }
        });
        setRicerca();
    }
}

async function stampa() {
    var codeListTemp = getSelectionData();
    var val = "";
    for (var i = 0; i < codeListTemp.length - 1; i++) {
        if (codeListTemp[i] != undefined)
            val += sugarCode(codeListTemp[i].cod) + ", ";
    }
    if (codeListTemp[i] != undefined)
        val += sugarCode(codeListTemp[i].cod);
    $("#codes").val(val);
}


function refreshUser() {
    var userID = "";

    getUserID = function () {
        return userID;
    }
    setUserID = function (id) {
        userID = id;
    }
}

function refreshVar() {
    var requestID = "";
    var ricerca = "";
    var resHide = [];
    var select = "";
    $("#codes").html("");

    getRequestID = function () {
        return requestID;
    }
    setRequestID = function (id) {
        requestID = id;
    }
    getResHide = function () {
        return resHide;
    }
    setResHide = function (res) {
        resHide = [];
        for (i = 0; i < res.length; i++)
            resHide.push(res[i]);
    }
    setRicerca = function () {
        ricerca = $("#search").val();
        //console.log(ricerca);
    }
    getRicerca = function () {
        return ricerca;
    }

    setSelection = function(res) {
        select = res;
    }

    getSelection = function(){
        return select;
    }
}

function getSelectionData() {
    var list = [];
    $("#codesForm input:checkbox:checked").each(function () {
        var obj = new Object();
        var $label = $("label[for='" + $(this).attr("id") + "']");
        obj.cod = $label.attr("for");
        obj.name = $(this).attr("name");
        obj.score = parseInt($label.attr("score"));
        list.push(obj);
    });
    return list;
}

function setLanguage(Lang) {
    UsedLang = Lang
    for (var key in language[Lang]["string"]) {
        $("#" + key).html(language[Lang]["string"][key]);
    }
    for (var key in language[Lang]["tooltip"]) {
        $("#" + key).attr("data-tooltip", language[Lang]["tooltip"][key]);
    }
    $('.tooltipped').tooltip();
    for (var key in language[Lang]["placeholder"]) {
        $("#" + key).attr("placeholder", language[Lang]["placeholder"][key]);
    }
}

function expand_or_collapse() {
    //console.log($(this));
    if (!$(this).hasClass("closed")) {
        $(this).html("keyboard_arrow_down");
        $(this).parent().siblings("div").slideUp(300, "swing");
    } else if (!$(this).hasClass("open")) {
        $(this).html("keyboard_arrow_up");
        $(this).parent().siblings("div").slideDown(300, "swing");
    } else{
        console.error("this has no class closed or open");
        return false;
    }
    $(this).toggleClass("closed open");
    if (!$(this).parent().parent().hasClass("active")) {
        $(this).parent().parent().addClass("active");
        $(this).parent().addClass("active");
    } else {
        $(this).parent().parent().removeClass("active");
        $(this).parent().removeClass("active");
    }
    return false;
}

function sugarCode(code){
    return "#"+code+"#";
}

$(document).ready(function () {

    /*$(".button-collapse").sideNav({
        closeOnClick: true,
        draggable: true
    });*/
    var lang = navigator.language || navigator.userLanguage
    cookieLang = Cookies.get("language");
    if (cookieLang != undefined) {
        setLanguage(cookieLang);
    } else {
        if (lang == "it-IT") {
            setLanguage("it");
        } else {
            setLanguage("en");
        }
    }
    $('.tooltipped').tooltip();
    $('.scrollspy').scrollSpy();
    refreshUser();
    //checkUser(1);
    $("#search").on("keypress", function(e){
        if (e.keyCode == 13){
            e.preventDefault();
            return false;
        }
    })

    $("#close-search").on("click", function(e){
        $('#search').val('');
        getCodes();
    });

    $("#search").on("keyup", function (e) {
        clearTimeout(timerSearch);
        timerSearch = setTimeout(function() {
            var string = $("#search").val();
            getCodes(string);
        }, 250);
    });
    if ($(window).width() <= 600) {
        $('#search-bar').pushpin({
            top: $("#search-bar").offset().top - 55,
            offset: 0
        });
    }

    $(document).on("click", ".langSelector", function () {
        var lang = $(this).attr("id").substring(0, 2);
        setLanguage(lang);
        Cookies.set("language", lang);
        //$(".collapsible").collapsible("close", 0);
    })

    // Result

    function deSelectLabel($label, level) {
        $label.removeClass("selected");
        $label.removeClass("active");
        $label.parent().removeClass("active");
        $label.children("span").removeClass("white-text");
        let $span_code = $label.find("span.code")
        $span_code.removeClass("flow-text");
        $span_code.css("font-weight", "");
        $span_code.css("font-size", "");
        $label.find("i.tooltipped")
            .html("keyboard_arrow_down")
            .removeClass("open")
            .addClass("closed");
        for (var l = level; l >= 2; l--) {
            if (!$label.closest(".list-" + l).parent().find("label").hasClass("selected")) {
                $label.parents(".list-" + (l - 1)).find("i")
                    .removeClass("light-green darken-2 white-text z-depth-1")
                    .addClass("grey-text");
            }
        }
        //console.log($label.parent().children("input"));
        $label.parent().children("input").prop("checked", false)
        if (!$("#codesForm label").hasClass("selected")) {
            $("#codeCopy").addClass("disabled");
            $("#codes").addClass("scale-out");
        }
    }

    function getLevelFromLabel($label) {
        var level = $label.parent().attr("class").split("-")[1].split("")[0];
        return level;
    }

    $(document).on("click tap", "#codesForm input:checkbox", function (e) {
        var code = $(this).attr("id");
        var $label = $("label[for='" + code + "']");
        var level = getLevelFromLabel($label);
        if (level === 0){
            return;
        }
        if ($label.hasClass("active")) {
            if (getSelection()){
                deSelectLabel(getSelection(), getLevelFromLabel(getSelection()));
            }
            setSelection($label);
            $label.addClass("selected");
            $label.children("span").addClass("white-text");
            let $span_code = $label.find("span.code")
            //console.log($span_code);
            $span_code.addClass("flow-text");
            $span_code.css("font-weight", "bold");
            $span_code.css("font-size", "2.5em");
            $label.find("i.tooltipped")
                .html("keyboard_arrow_up")
                .removeClass("closed")
                .addClass("open");
            for (var l = level - 1; l >= 1; l--) {
                $label.closest(".list-" + l).find("i:first")
                    .addClass("light-green darken-2 white-text z-depth-1")
                    .removeClass("grey-text");
            }

            $("#codeCopy").removeClass("disabled");
            $("#codes").removeClass("scale-out");
        } else {
            deSelectLabel($label, level);
        }
        clearTimeout(timerCopy);
        timerCopy = setTimeout(function() {
            stampa();
            copyCode(code);
        }, 500);
    });

    /*$(document).on("click", "label i", function (e) {
        expand_or_collapse.call(this);
        e.stopPropagation();
        return false;
    });*/

    async function copyCode(code) {
        if (!code){
            code = $("#codes").val();
        }
        //var codes = $("#codes").val();
        //$codes.select();
        //document.execCommand('copy');

        code = sugarCode(code);

        /*navigator.clipboard.writeText(code).then(function() {
            //console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });*/
        $("#codes").select();
        document.execCommand('copy');
        //$("#codes").focus();
        $("#codes").blur();
    }

    $("#codeCopy").on("click", function () {
        copyCode();
        //sendSelection(getSelectionData());
        //flagA = 0;
    });

    logged(undefined);

});
