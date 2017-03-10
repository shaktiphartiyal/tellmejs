/**
 * @Author Shakti Phartiyal
 * @Created 03/08/2017
 * @Desc Alert Notifications for web pages
 */
/**
 * -----------------------------------------------------------------------
 * -----------------------------USAGE-------------------------------------
 * -----------------------------------------------------------------------
 * -----------------------------------------------------------------------
 * ------------------tellme.error(message, timeout)-----------------------
 * ------------------tellme.info(message, timeout)------------------------
 * ------------------tellme.success(message, timeout)---------------------
 * ------------------tellme.warn(message, timeout)------------------------
 * -----------------------------------------------------------------------
 *  * --------------------------------------------------------------------
 * --------------------message -> OPTIONAL--------------------------------
 * --------------------timeout -> seconds OPTINAL-------------------------
 * --------------------timeout ->  PASS 0 FOR FIXED ALERT-----------------
 * -----------------------------------------------------------------------
 * -----------------------------------------------------------------------
 * -----------------------------------------------------------------------
 */
'use strict';
var tellme = tellme || {};
tellme= {
    errorClass: "alx_alert-danger",
    successClass: "alx_alert-success",
    infoClass: "alx_alert-info",
    warnClass: "alx_alert-warn",
    errorSymbol: "alx_alx-error",
    successSymbol: "alx_alx-success",
    infoSymbol: "alx_alx-info",
    warnSymbol: "alx_alx-warn",
    alertDiv:null,
    errorDisplayTimeout:5, //seconds
    successDisplayTimeout:5, //seconds
    infoDisplayTimeout:5, //seconds
    warnDisplayTimeout:5, //seconds
    alertClass:"alertifyX",
    progress:100,
    fadeTimer:null,
    error:function(message,timeout){
        if(!message)
        {
            message = "Error";
        }
        if(typeof(timeout) == "number")
        {
            tellme.errorDisplayTimeout = timeout;
        }
        tellme.makeAlert(tellme.errorClass, tellme.errorSymbol, message);
        tellme.displayAlert(tellme.errorDisplayTimeout);
    },
    success:function(message,timeout){
        if(!message)
        {
            message = "Success";
        }
        if(typeof(timeout) == "number")
        {
            tellme.successDisplayTimeout = timeout;
        }
        tellme.makeAlert(tellme.successClass, tellme.successSymbol, message);
        tellme.displayAlert(tellme.successDisplayTimeout);
    },
    info:function(message,timeout){
        if(!message)
        {
            message = "Info";
        }
        if(typeof(timeout) == "number")
        {
            tellme.infoDisplayTimeout = timeout;
        }
        tellme.makeAlert(tellme.infoClass, tellme.infoSymbol, message);
        tellme.displayAlert(tellme.infoDisplayTimeout);
    },
    warn:function(message,timeout){
        if(!message)
        {
            message = "Warning";
        }
        if(typeof(timeout) == "number")
        {
            tellme.infoDisplayTimeout = timeout;
        }
        tellme.makeAlert(tellme.warnClass, tellme.warnSymbol, message);
        tellme.displayAlert(tellme.infoDisplayTimeout);
    },
    makeAlert:function(cssClass, symbol, message){
        tellme.alertDiv = '<div class="alx_alert '+cssClass+'"> <i class="'+symbol+'">&nbsp;</i>'+message+'<span class="alx_alert_progress"></span></div>';
    },
    displayAlert:function(timeout){
        tellme.removePrevious();
        var alertx = document.createElement('div');
        alertx.className = tellme.alertClass+" alx_alertMsg";
        alertx.innerHTML = tellme.alertDiv;
        alertx.style.top = "0px";
        document.body.appendChild(alertx);
        alertx.addEventListener('click',function(){
            tellme.fadeOut(this);
        });
        if(timeout != 0)
        {
            tellme.runOut(timeout);
        }
    },
    removePrevious:function(){
        for(var i=0;i<document.getElementsByClassName(tellme.alertClass).length;i++)
        {
            document.getElementsByClassName(tellme.alertClass)[i].parentNode.removeChild(document.getElementsByClassName(tellme.alertClass)[i]);
        }
    },
    runOut:function(timeout){
        tellme.fadeTimer = setTimeout(function () {
            tellme.progress =  tellme.progress - ((10000)/(timeout * 1000));
            if(document.getElementsByClassName('alx_alert_progress').length > 0)
            {
                document.getElementsByClassName('alx_alert_progress')[0].style.width = tellme.progress + "%";
            }
            else
            {
                tellme.clearFadeTimeout();
            }
            if(tellme.progress > -1)
            {
                tellme.runOut(timeout);
            }
            else
            {
                tellme.clearFadeTimeout();
                tellme.closeAlert();
            }
        }, 100);
    },
    closeAlert:function(){
        var elems = document.getElementsByClassName('alertifyX');
        for(var i=0; i<elems.length; i++)
        {
            tellme.fadeOut(elems[i]);
        }
    },
    fadeOut:function(element){
        var op = 1;
        var timer = setInterval(function () {
            if (op <= 0.1){
                clearInterval(timer);
                element.style.display = 'none';
                element.remove()
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 20);
    },
    clearFadeTimeout:function () {
        window.clearTimeout(tellme.fadeTimer);
        tellme.fadeTimer = null;
        tellme.progress = 100;
    }
};