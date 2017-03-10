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
 * ------------------tellme.error(message, options)-----------------------
 * ------------------tellme.info(message, options)------------------------
 * ------------------tellme.success(message, options)---------------------
 * ------------------tellme.warn(message, options)------------------------
 * -----------------------------------------------------------------------
 *  * --------------------------------------------------------------------
 * --------------------message -> OPTIONAL--------------------------------
 * -------------options -> seconds OPTINAL 0 for fxed alert---------------
 * --------------------options -> configs---------------------------------
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
            progressClass:"tm_alert_progress",
            position:"top-right"
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
            error:function(message,options){
                if(!message)
                {
                    message = "Error";
                }
                if(typeof(options) == "number")
                {
                    δ.options.errorDisplayTimeout = options;
                }
                else if(typeof(options) == "object")
                {
                    δ.config(options);
                }
                δ.makeAlert(δ.options.errorClass, δ.options.errorSymbol, message);
                δ.displayAlert(δ.options.errorDisplayTimeout);
            },
            success:function(message,options){
                if(!message)
                {
                    message = "Success";
                }
                if(typeof(options) == "number")
                {
                    δ.options.successDisplayTimeout = options;
                }
                else if(typeof(options) == "object")
                {
                    δ.config(options);
                }
                δ.makeAlert(δ.options.successClass, δ.options.successSymbol, message);
                δ.displayAlert(δ.options.successDisplayTimeout);
            },
            info:function(message,options){
                if(!message)
                {
                    message = "Info";
                }
                if(typeof(options) == "number")
                {
                    δ.options.infoDisplayTimeout = options;
                }
                else if(typeof(options) == "object")
                {
                    δ.config(options);
                }
                δ.makeAlert(δ.options.infoClass, δ.options.infoSymbol, message);
                δ.displayAlert(δ.options.infoDisplayTimeout);
            },
            warn:function(message,options){
                if(!message)
                {
                    message = "Warning";
                }
                if(typeof(options) == "number")
                {
                    δ.options.infoDisplayTimeout = options;
                }
                else if(typeof(options) == "object")
                {
                    δ.config(options);
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
                δ.setPosition(alertx);
                document.body.appendChild(alertx);
                alertx.style.width = δ.computeMinWidth();
                alertx.addEventListener('click',function(){
                    δ.fadeOut(this);
                });
                if(timeout != 0)
                {
                    δ.runOut(timeout);
                }
            },
            setPosition:function(alertx){
                switch(δ.options.position) {
                    case "top-center":
                        alertx.style.top = "0";
                        alertx.style.right = "0";
                        alertx.style.left = "0";
                        break;
                    case "top-right":
                        alertx.style.top = "0";
                        alertx.style.right = "2px";
                        break;
                    case "top-left":
                        alertx.style.top = "0";
                        alertx.style.left = "2px";
                        break;
                    case "bottom-center":
                        alertx.style.bottom = "0";
                        alertx.style.right = "0";
                        alertx.style.left = "0";
                        break;
                    case "bottom-left":
                        alertx.style.bottom = "0";
                        alertx.style.left = "2px";
                        break;
                    case "bottom-right":
                        alertx.style.bottom = "0";
                        alertx.style.right = "2px";
                        break;
                    default:
                        alertx.style.top = "0";
                        alertx.style.right = "0";
                        alertx.style.left = "0";
                }
            },
            computeMinWidth:function(){
                var width = document.getElementsByClassName(δ.options.subAlertClass)[0].clientWidth;
                if(width > window.innerWidth)
                {
                    width = "100%";
                }
                else
                {
                    width = width+"px";
                }
                return width;
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