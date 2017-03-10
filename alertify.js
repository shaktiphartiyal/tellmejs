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
 * ------------------alertify.error(message, timeout)---------------------
 * ------------------alertify.info(message, timeout)----------------------
 * ------------------alertify.success(message, timeout)-------------------
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
var alertify = alertify || {};
alertify = {
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
            alertify.errorDisplayTimeout = timeout;
        }
        alertify.makeAlert(alertify.errorClass, alertify.errorSymbol, message);
        alertify.displayAlert(alertify.errorDisplayTimeout);
    },
    success:function(message,timeout){
        if(!message)
        {
            message = "Success";
        }
        if(typeof(timeout) == "number")
        {
            alertify.successDisplayTimeout = timeout;
        }
        alertify.makeAlert(alertify.successClass, alertify.successSymbol, message);
        alertify.displayAlert(alertify.successDisplayTimeout);
    },
    info:function(message,timeout){
        if(!message)
        {
            message = "Info";
        }
        if(typeof(timeout) == "number")
        {
            alertify.infoDisplayTimeout = timeout;
        }
        alertify.makeAlert(alertify.infoClass, alertify.infoSymbol, message);
        alertify.displayAlert(alertify.infoDisplayTimeout);
    },
    warn:function(message,timeout){
        if(!message)
        {
            message = "Warning";
        }
        if(typeof(timeout) == "number")
        {
            alertify.infoDisplayTimeout = timeout;
        }
        alertify.makeAlert(alertify.warnClass, alertify.warnSymbol, message);
        alertify.displayAlert(alertify.infoDisplayTimeout);
    },
    makeAlert:function(cssClass, symbol, message){
        alertify.alertDiv = '<div class="alx_alert '+cssClass+'"> <i class="'+symbol+'">&nbsp;</i>'+message+'<span class="alx_alert_progress"></span></div>';
    },
    displayAlert:function(timeout){
        alertify.removePrevious();
        var alertx = document.createElement('div');
        alertx.className = alertify.alertClass+" alx_alertMsg";
        alertx.innerHTML = alertify.alertDiv;
        alertx.style.top = "0px";
        document.body.appendChild(alertx);
        alertx.addEventListener('click',function(){
            alertify.fadeOut(this);
        });
        if(timeout != 0)
        {
            alertify.runOut(timeout);
        }
    },
    removePrevious:function(){
        for(var i=0;i<document.getElementsByClassName(alertify.alertClass).length;i++)
        {
            document.getElementsByClassName(alertify.alertClass)[i].parentNode.removeChild(document.getElementsByClassName(alertify.alertClass)[i]);
        }
    },
    runOut:function(timeout){
        alertify.fadeTimer = setTimeout(function () {
            alertify.progress =  alertify.progress - ((10000)/(timeout * 1000));
            if(document.getElementsByClassName('alx_alert_progress').length > 0)
            {
                document.getElementsByClassName('alx_alert_progress')[0].style.width = alertify.progress + "%";
            }
            else
            {
                alertify.clearFadeTimeout();
            }
            if(alertify.progress > -1)
            {
                alertify.runOut(timeout);
            }
            else
            {
                alertify.clearFadeTimeout();
                alertify.closeAlert();
            }
        }, 100);
    },
    closeAlert:function(){
        var elems = document.getElementsByClassName('alertifyX');
        for(var i=0; i<elems.length; i++)
        {
            alertify.fadeOut(elems[i]);
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
        window.clearTimeout(alertify.fadeTimer);
        alertify.fadeTimer = null;
        alertify.progress = 100;
    }
};