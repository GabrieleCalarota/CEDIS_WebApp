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
            "codeCopy": "Send and copy the selected codes"
        },
        "toast": {
            "diagnosi-not-found": "The diagnosis did not produce results, try again with other words",
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
            "help-user": "Search for ICD codes using the search bar, here is a short tutorial",
            "help-enter": "Press the ENTER key to search",
            "help-codes": "Here are all the results of the research",
            "help-select": "Now you can select the most relevant codes, then send the selection using the button at the bottom"
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
            "codeCopy": "Invia e copia i codici selezionati"
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
        for (var code in objects) {
            var description = objects[code]['Description'];
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

/*
function getCodes(ric, sF, flag) {
    var data = new Object();
    data.request = ric;
    data.topK = 50;
    data.startingFrom = sF;
    data = JSON.stringify(data);
    $.ajax({
        url: "//130.136.143.12:8010/api/getList",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        start_time: new Date().getTime(),
        data: data,
        success: function (result) {
            refreshVar();
            flagA = 1;
            if (flag) {
                aiuto(1);
            }
            setRequestID(result.requestID);
            $("#preloader").fadeOut(function () {
                setResult(result.result);
            });
            var totalTime = new Date().getTime() - this.start_time;
            var classTime = totalTime - result.handledIn;
            console.log("Tempo totale: " + (new Date().getTime() - this.start_time) + "ms");
            console.log("Tempo ritorno richiesta: " + result.handledIn + "ms");
            console.log("Tempo latenza: " + (new Date().getTime() - this.start_time - result.handledIn + "ms"));
            sendTime(totalTime, result.handledIn);
        }
    });
    console.log(ric);
}*/

/*function sendTime(totalTime, classTime) {
    var data = new Object();
    data.totalTime = totalTime;
    data.classTime = classTime;
    data.userID = getUserID();
    data = JSON.stringify(data);
    $.ajax({
        url: "//130.136.143.12:8010/admin/addTime",
        type: "POST",
        contentType: "application/json",
        data: data,
        success: function () {
            console.log("successo");
        }
    })
}*/

function createDictionary(result){
    level0 = {} //DIZIONARIO PRESUNTI PADRI-ROOT
    //var level1 = {} //DIZIONARIO PRESUNTI FIGLI
    //var level2 = {} //DIZIONARIO PRESUNTI NIPOTI
    for (var class_name in result) {
        level0[class_name] = {};
        var level1 = {};
        var result2 = result[class_name];
        for (var code in result2) {
            var temp = {}
            temp.count = 1;
            temp.code = code;
            temp.class = class_name;
            temp.name = result2[code]['Description'];
            temp.code_int = parseInt(code);
            level1[code] = temp;
        }
        level0[class_name].figli = level1;
    }

    /*
    //CICLO SUI LEVEL1, QUINDI POSSIBILI FIGLI
    $.each(level1, function (key, value) {
        var padre = key.substring(0, 3);
        if (padre in level0) { //SE ESISTE IL PADRE, INSERISCO QUESTO COME FIGLIO
            level0[padre].figli = level0[padre].figli || {};
            level0[padre].figli[key] = {}
            level0[padre].figli[key].code = key;
            level0[padre].figli[key].name = level1[key].name;
            level0[padre].figli[key].score = level1[key].score;
            level0[padre].sum += level1[key].score;
            level0[padre].count += 1;
        } else {
            level0[key] = {}; //ALTRIMENTI LO INSERISCO COME PADRE-ROOT
            level0[key].code = key;
            level0[key].sum = level1[key].score;
            level0[key].name = level1[key].name;
            level0[key].score = level1[key].score;
            level0[key].count = 1;
        }
    })
    //for (var l2 in level2) { //CICLO SUI LEVEL2, QUINDI POSSIBILI NIPOTI
    $.each(level2, function (key, value) {
        var nonno = key.substring(0, 3);
        var padre = key.substring(0, 4);
        if (nonno in level0) { //SE ESISTE IL NONNO
            level0[nonno].sum += level2[key].score;
            level0[nonno].count += 1;
            level0[nonno].figli = level0[nonno].figli || {}
            if (padre in level0[nonno].figli) { //SE ESISTE IL PADRE LO APPENDO COME NIPOTE
                level0[nonno].figli[padre].figli = level0[nonno].figli[padre].figli || {};
                level0[nonno].figli[padre].figli[key] = {};
                level0[nonno].figli[padre].figli[key].code = key;
                level0[nonno].figli[padre].figli[key].name = level2[key].name;
                level0[nonno].figli[padre].figli[key].score = level2[key].score;
            } else { //SE NON ESISTE IL PADRE DENTRO AL NONNO LO INSERISCO ALLO STESSO LIVELLO DEGLI "ZII"
                level0[nonno].figli[key] = {};
                level0[nonno].figli[key].code = key;
                level0[nonno].figli[key].name = level2[key].name;
                level0[nonno].figli[key].score = level2[key].score;
            }
        } else if (padre in level0) { //SE ESISTE IL PADRE MA NON IL NONNO LO APPENDO COME FIGLIO
            level0[padre].sum += level2[key].score;
            level0[padre].count += 1;
            level0[padre].figli = level0[padre].figli || {};
            level0[padre].figli[key] = {};
            level0[padre].figli[key].code = key;
            level0[padre].figli[key].name = level2[key].name;
            level0[padre].figli[key].score = level2[key].score;
        } else { //SE NON ESISTONO NE IL PADRE NE IL NONNO LO APPENDO COME FRATELLO DEI NONNI
            level0[key] = {};
            level0[key].sum = level2[key].score;
            level0[key].count = 1;
            level0[key].code = key;
            level0[key].name = level2[key].name;
            level0[key].score = level2[key].score;
        }
    })*/

    /*$.each(level0, function (key, value) {
        level0[key].avg = level0[key].sum / level0[key].count;
    })*/

    //setResult(result);
    //console.log(level0);
    //console.log(order);
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
        var $label = $("<label class='collapsible-header grey-text text-darken-3' for='" + obj.code + "' score=" + obj.score + "><b>" + obj.name + "</b>" +
            "<i class='right material-icons'>content_copy</i>  <span class='right'>" + obj.code + "</span> </label>");
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
            "><b>" + name + "</b></label>");
        var $span = $("<span class='right'>"+range_num+"</span>");
        $li.append($checkbox);
        $li.append($label);
    }
    if (!("figli" in obj)) {
        return $li;
    } else {
        var $i = $("<i class='circle material-icons right closed white grey-text tooltipped' data-position='left' " +
            "data-delay='1000' data-tooltip='Espandi / riduci menu'>keyboard_arrow_down</i>");
        var $body = $("<div class='collapsible-body'></div>");
        var $ul = $("<ul class='collapsible popout' data-collapsible='expandable'></ul>");
        var nFigli = 0;
        //$li.append($i);
        $label.append($i);
        $label.append($span);
        $body.append($ul);
        $li.append($body);
        $.each(obj.figli, function (key, value) {
            $ul.append(annidate(obj.figli[key], level+1));
            nFigli++;
        })
        //var $span = $("<span class='right grey-text nAnnidamento'>" + nFigli + "</span>");
        //$label.append($span);
    }
    return $li;
}

/*
function sendSelection(res) {
    console.log(getRicerca());
    var data = new Object();
    data.requestID = getRequestID();
    data.request = getRicerca();
    data.res1 = res[0];
    data.res2 = res[1];
    data.res3 = [];
    for (i = 2; i < res.length; i++)
        data.res3.push(res[i]);
    if (checkUser(0))
        data.level = "Training";
    else
        data.level = "Demo";
    data = JSON.stringify(data);
    $.ajax({
        url: "//130.136.143.12:8010/api/result",
        type: "POST",
        contentType: "application/json",
        data: data,
        success: function () {
            Materialize.toast(language[UsedLang]["toast"]["send-success"], 3000, "green darken-2");
            $("#codes").blur();
            $('body').animate({
                scrollTop: 0
            }, 300, function () {
                $("#code-wrapper").addClass("scale-out");
                $("#codeCopy").addClass("disabled");
                $("#codes").addClass("scale-out");
                $("#codesForm").slideUp(500, "swing", function () {
                    $("#home").fadeIn(300, "swing");
                });
                $("#search").val("");
            });
        },
        error: function (jqXHR) {
            if (jqXHR.status == "401")
                Materialize.toast(language[UsedLang]["toast"]["sender-not-logged"], 5000, "lime");
            else
                Materialize.toast(language[UsedLang]["toast"]["send-error"], 3000, "red darken-2");
        }
    });
}*/

/*
function loginAjax(n, p) {
    var data = new Object();
    data.username = n;
    data.password = p;
    data = JSON.stringify(data);
    $.ajax({
        type: "POST",
        url: "//130.136.143.12:8010/api/login",
        data: data,
        contentType: "application/json; charset=UTF-8",
        success: function (result) {
            Materialize.toast(language[UsedLang]["toast"]["login-success"], 3000, "green darken-2");
            refreshUser();
            restoreLogin();
            logged(n);
        },
        error: function (result) {
            Materialize.toast(language[UsedLang]["toast"]["login-wrong"], 3000, "red darken-2");
            restoreLogin();

        }
    });
}*/


/*
function logoutAjax() {
    $.ajax({
        type: "GET",
        url: "//130.136.143.12:8010/api/logout",
        success: function (result) {
            Materialize.toast(language[UsedLang]["toast"]["logout-success"], 3000, "green darken-2");
            refreshUser();
            restoreLogin();
            setUserID("");
            logout();
        },
        error: function (result) {
            Materialize.toast(language[UsedLang]["toast"]["logout-wrong"] + result.responseText, 3000, "red darken-2");
        }
    });
}

function changePasswd(o, n) {
    var data = new Object();
    data.password = o;
    data.newPassword = n;
    data = JSON.stringify(data);
    $.ajax({
        type: "POST",
        url: "//130.136.143.12:8010/api/changePassword",
        data: data,
        contentType: "application/json; charset=UTF-8",
        success: function (result) {
            Materialize.toast(language[UsedLang]["toast"]["changePass-success"], 3000, "green darken-2");
            restoreChangePwd()
            $('#changePsw').modal('close');
        },
        error: function (result) {
            Materialize.toast(language[UsedLang]["toast"]["changePass-wrong"], 3000, "red darken-2");
            restoreChangePwd();
        }
    });
}*/

/*
function sendIssue(text, email, name) {
    var data = new Object();
    data.text = text;
    data.email = email;
    data.name = name;
    data = JSON.stringify(data);
    $.ajax({
        type: "POST",
        url: "//130.136.143.12:8010/admin/contactUs",
        data: data,
        contentType: "application/json",
        success: function () {
            Materialize.toast(language[UsedLang]["toast"]["email-success"], 3000, "green darken-2");
            $('#contattaci').modal('close');
            $("#f-contattaci textarea, #f-contattaci input").val("");
        },
        error: function (result) {
            Materialize.toast(language[UsedLang]["toast"]["email-error"] + result.responseText, 3000, "red darken-2");
        }
    })
}*/

/*
function restoreLogin() {
    $("#nome_utente").val("");
    $("#password").val("");
}

function restoreChangePwd() {
    $("#old-psw").val("");
    $("#new-psw").val("");
    $("#new-psw2").val("");
}*/



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

/*
function logout() {
    $("#nUtente").removeClass("scale-in").addClass("scale-out");
    $("#user-id").empty();
    $("#col").removeClass("scale-in").addClass("scale-out").slideUp(300, "swing");
    $("#logButton").show().removeClass("scale-out").addClass("scale-in");
    $("#page-title").click();
    $("#codesForm").slideUp(100, "swing", function () {
        $("#codesForm").html("");
    });
    $("#home").fadeIn(300, "swing");
    $("#search").val("");
    $("#codeCopy").addClass("disabled");
    $("#code-wrapper, #codes").addClass("scale-out");
    flagA = 0;
    Cookies.remove("userWA");
}*/

function setResult(result) {
    var level0 = createDictionary(result);
    var order = level0;
    //var order = sort(level0);
    var $res = $("<ul class='collapsible class-description' data-collapsible='expandable'></ul>");
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

function viewResult(res) {
    if (res.length <= 10) {
        for (var i = 0; i < res.length; i++)
            $(res[i]).slideDown(500, "swing");
    } else {
        for (var i = 0; i < 10; i++)
            $(res[i]).slideDown(500, "swing");
        setResHide(res.slice(10, res.length));
    }
}

function search(elem, array, remove) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].cod === elem) {
            if (remove)
                delete array[i];
            return true;
        }
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

/*
function checkUser(flag) {
    var cookie = Cookies.get('userWA');
    if (cookie != undefined) {
        if (flag)
            logged(cookie);
        else
            return true;
    }
    return false;
}*/

/*
function aiuto(flag) {
    if (!flag) {
        setTimeout(function () {
            Materialize.toast(language[UsedLang]["toast"]["help-user"], 4000, 'green darken-4');
        }, 1000);
        setTimeout(function () {
            $("#search").focus();
        }, 6000);
        setTimeout(function () {
            $("#search").val("F");
        }, 8300);
        setTimeout(function () {
            $("#search").val("Fa");
        }, 8500);
        setTimeout(function () {
            $("#search").val("Far");
        }, 8700);
        setTimeout(function () {
            $("#search").val("Fari");
        }, 8800);
        setTimeout(function () {
            $("#search").val("Farin");
        }, 8900);
        setTimeout(function () {
            $("#search").val("Faring");
        }, 9000);
        setTimeout(function () {
            $("#search").val("Faringi");
        }, 9300);
        setTimeout(function () {
            $("#search").val("Faringit");
        }, 9500);
        setTimeout(function () {
            $("#search").val("Faringite");
        }, 9600);
        setTimeout(function () {
            Materialize.toast(language[UsedLang]["toast"]["help-enter"], 2000, 'green darken-4');
        }, 9700);
        flagA = 2;
    } else {
        setTimeout(function () {
            Materialize.toast(language[UsedLang]["toast"]["help-codes"], 2000, 'green darken-4');
        }, 1000);
        setTimeout(function () {
            Materialize.toast(language[UsedLang]["toast"]["help-select"], 4000, 'green darken-4');
            $("#codeCopy").addClass("pulse");
        }, 3500);
        setTimeout(function () {
            $("#codeCopy").removeClass("pulse");
        }, 7500);
        flagA = 1
    }
}*/

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

        navigator.clipboard.writeText(code).then(function() {
            //console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    $("#codeCopy").on("click", function () {
        copyCode();
        //sendSelection(getSelectionData());
        //flagA = 0;
    });

    logged(undefined);

    // Login

    /*$("#accedi").on("click", function () {
        var user = $("#nome_utente").val();
        var pass = $("#password").val();
        loginAjax(user, pass);
    });

    $("#login #password").keypress(function (e) {
        if (e.keyCode == 13)
            $("#accedi").click();
    });

    $("#logout").click(function () {
        logoutAjax();
    });*/

    /*$(document).on("submit", "#cPswForm", function () {
        var old = $("#old-psw").val();
        var new1 = $("#new-psw").val();
        var new2 = $("#new-psw2").val();
        if (new1 === new2)
            changePasswd(old, new1);
        else {
            Materialize.toast(language[UsedLang]["toast"]["changePass-error"], 3000, 'red darken-2');
            restoreChangePwd();
        }
        return false;
    });

    $(document).on("submit", "#f-contattaci", function () {
        var text = $("#c-area").val();
        var email = $("#email").val();
        var name = $("#nome").val();
        sendIssue(text, email, name);
        return false;
    });

    $("#help-btn").on("click", function () {
        if (!flagA)
            aiuto(0);
        else
            aiuto(1);
    });*/
});
