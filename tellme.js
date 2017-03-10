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
 * -------------timeout -> seconds OPTINAL 0 for fxed alert---------------
 * -----------------------------------------------------------------------
 * -----------------------------------------------------------------------
 * -----------------------------------------------------------------------
 */
'use strict';
(function(δ){
    δ = {
        options:{
            errorClass: "tm_alert-danger",
            successClass: "tm_alert-success",
            infoClass: "tm_alert-info",
            warnClass: "tm_alert-warn",
            errorSymbol: "tm_tm-error",
            successSymbol: "tm_tm-success",
            infoSymbol: "tm_tm-info",
            warnSymbol: "tm_tm-warn",
            errorDisplayTimeout:5,
            successDisplayTimeout:5,
            infoDisplayTimeout:5,
            warnDisplayTimeout:5,
            alertClass:"tm_alertMsg",
            subAlertClass:"tm_alert",
            progressClass:"tm_alert_progress"
        },
        __proto__:{
            alertDiv:null,
            progress:100,
            fadeTimer:null,
            config:function (options) {
                for (var key in options)
                {
                    this.options[key] = options[key];
                }
            },
            error:function(message,timeout){
                if(!message)
                {
                    message = "Error";
                }
                if(typeof(timeout) == "number")
                {
                    δ.options.errorDisplayTimeout = timeout;
                }
                δ.makeAlert(δ.options.errorClass, δ.options.errorSymbol, message);
                δ.displayAlert(δ.options.errorDisplayTimeout);
            },
            success:function(message,timeout){
                if(!message)
                {
                    message = "Success";
                }
                if(typeof(timeout) == "number")
                {
                    δ.options.successDisplayTimeout = timeout;
                }
                δ.makeAlert(δ.options.successClass, δ.options.successSymbol, message);
                δ.displayAlert(δ.options.successDisplayTimeout);
            },
            info:function(message,timeout){
                if(!message)
                {
                    message = "Info";
                }
                if(typeof(timeout) == "number")
                {
                    δ.options.infoDisplayTimeout = timeout;
                }
                δ.makeAlert(δ.options.infoClass, δ.options.infoSymbol, message);
                δ.displayAlert(δ.options.infoDisplayTimeout);
            },
            warn:function(message,timeout){
                if(!message)
                {
                    message = "Warning";
                }
                if(typeof(timeout) == "number")
                {
                    δ.options.infoDisplayTimeout = timeout;
                }
                δ.makeAlert(δ.options.warnClass, δ.options.warnSymbol, message);
                δ.displayAlert(δ.options.infoDisplayTimeout);
            },
            makeAlert:function(cssClass, symbol, message){
                δ.alertDiv = '<div class=" '+δ.options.subAlertClass+" "+cssClass+'"> <i class="'+symbol+'">&nbsp;</i>'+message+'<span class="'+δ.options.progressClass+'"></span></div>';
            },
            displayAlert:function(timeout){
                δ.removePrevious();
                var alertx = document.createElement('div');
                alertx.className = δ.options.alertClass;
                alertx.innerHTML = δ.alertDiv;
                alertx.style.top = "0px";
                document.body.appendChild(alertx);
                alertx.addEventListener('click',function(){
                    δ.fadeOut(this);
                });
                if(timeout != 0)
                {
                    δ.runOut(timeout);
                }
            },
            removePrevious:function(){
                for(var i=0;i<document.getElementsByClassName(δ.options.alertClass).length;i++)
                {
                    document.getElementsByClassName(δ.options.alertClass)[i].parentNode.removeChild(document.getElementsByClassName(δ.options.alertClass)[i]);
                }
            },
            runOut:function(timeout){
                δ.fadeTimer = setTimeout(function () {
                    δ.progress =  δ.progress - ((10000)/(timeout * 1000));
                    if(document.getElementsByClassName(δ.options.progressClass).length > 0)
                    {
                        document.getElementsByClassName(δ.options.progressClass)[0].style.width = δ.progress + "%";
                    }
                    else
                    {
                        δ.clearFadeTimeout();
                    }
                    if(δ.progress > -1)
                    {
                        δ.runOut(timeout);
                    }
                    else
                    {
                        δ.clearFadeTimeout();
                        δ.closeAlert();
                    }
                }, 100);
            },
            closeAlert:function(){
                var elems = document.getElementsByClassName(δ.options.alertClass);
                for(var i=0; i<elems.length; i++)
                {
                    δ.fadeOut(elems[i]);
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
                window.clearTimeout(δ.fadeTimer);
                δ.fadeTimer = null;
                δ.progress = 100;
            },
        }
    };
    window.tellme = δ;
})();