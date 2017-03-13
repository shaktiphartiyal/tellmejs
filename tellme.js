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
        curConfig:[],
        curConfigIndex:0,
        __proto__:{
            alertDiv:null,
            progress:100,
            fadeTimer:null,
            config:function (options) {
                for (var key in options)
                {
                    δ.options[key] = options[key];
                }
            },
            makeCurConfig:function(options,timeoutVar){
                δ.curConfig[δ.curConfigIndex] = δ.cloneObj(δ.options);
                δ.curConfigIndex = δ.curConfig.length - 1;
                if(typeof(options) == "object")
                {
                    for (var key in options)
                    {
                        δ.curConfig[δ.curConfigIndex][key] = options[key];
                    }
                }
                if(typeof(options) == "number")
                {
                    δ.curConfig[δ.curConfigIndex][timeoutVar] = options;
                }
            },
            error:function(message,options){
                if(!message)
                {
                    message = "Error";
                }
                δ.makeCurConfig(options,'errorDisplayTimeout');
                δ.makeAlert(δ.curConfig[δ.curConfigIndex].errorClass, δ.curConfig[δ.curConfigIndex].errorSymbol, message);
                δ.displayAlert(δ.curConfig[δ.curConfigIndex].errorDisplayTimeout);
            },
            success:function(message,options){
                if(!message)
                {
                    message = "Success";
                }
                δ.makeCurConfig(options,'successDisplayTimeout');
                δ.makeAlert(δ.curConfig[δ.curConfigIndex].successClass, δ.curConfig[δ.curConfigIndex].successSymbol, message);
                δ.displayAlert(δ.curConfig[δ.curConfigIndex].successDisplayTimeout);
            },
            info:function(message,options){
                if(!message)
                {
                    message = "Info";
                }
                δ.makeCurConfig(options,'infoDisplayTimeout');
                δ.makeAlert(δ.curConfig[δ.curConfigIndex].infoClass, δ.curConfig[δ.curConfigIndex].infoSymbol, message);
                δ.displayAlert(δ.curConfig[δ.curConfigIndex].infoDisplayTimeout);
            },
            warn:function(message,options){
                if(!message)
                {
                    message = "Warning";
                }
                δ.makeCurConfig(options,'warnDisplayTimeout');
                δ.makeAlert(δ.curConfig[δ.curConfigIndex].warnClass, δ.curConfig[δ.curConfigIndex].warnSymbol, message);
                δ.displayAlert(δ.curConfig[δ.curConfigIndex].warnDisplayTimeout);
            },
            makeAlert:function(cssClass, symbol, message){
                δ.alertDiv = '<div class=" '+δ.curConfig[δ.curConfigIndex].subAlertClass+" "+cssClass+'"> <i class="'+symbol+'">&nbsp;</i>'+message+'<span class="'+δ.curConfig[δ.curConfigIndex].progressClass+'"></span></div>';
            },
            displayAlert:function(timeout){
                δ.removePrevious();
                δ.clearFadeTimeout();
                var alertx = document.createElement('div');
                alertx.innerHTML = δ.alertDiv;
                alertx.className = δ.curConfig[δ.curConfigIndex].alertClass;
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
                switch(δ.curConfig[δ.curConfigIndex].position) {
                    case "top-center":
                        alertx.style.top = "10px";
                        alertx.style.right = "0";
                        alertx.style.left = "0";
                        break;
                    case "top-right":
                        alertx.style.top = "10px";
                        alertx.style.right = "5px";
                        break;
                    case "top-left":
                        alertx.style.top = "10px";
                        alertx.style.left = "5px";
                        break;
                    case "bottom-center":
                        alertx.style.bottom = "10px";
                        alertx.style.right = "0";
                        alertx.style.left = "0";
                        break;
                    case "bottom-left":
                        alertx.style.bottom = "10px";
                        alertx.style.left = "5px";
                        break;
                    case "bottom-right":
                        alertx.style.bottom = "10px";
                        alertx.style.right = "5px";
                        break;
                    default:
                        alertx.style.top = "10px";
                        alertx.style.right = "0";
                        alertx.style.left = "0";
                }
            },
            computeMinWidth:function(){
                var width = document.getElementsByClassName(δ.curConfig[δ.curConfigIndex].subAlertClass)[0].clientWidth;
                if(width > window.innerWidth)
                {
                    width = "100%";
                }
                else
                {
                    if(width < 200)
                    {
                        width = 200;
                    }
                    width = width+"px";
                }
                return width;
            },
            removePrevious:function(){
                for(var i=0;i<document.getElementsByClassName(δ.curConfig[δ.curConfigIndex].alertClass).length;i++)
                {
                    document.getElementsByClassName(δ.curConfig[δ.curConfigIndex].alertClass)[i].parentNode.removeChild(document.getElementsByClassName(δ.curConfig[δ.curConfigIndex].alertClass)[i]);
                }
            },
            runOut:function(timeout){
                δ.fadeTimer = setTimeout(function () {
                    δ.progress =  δ.progress - ((10000)/(timeout * 1000));
                    try
                    {
                        if (document.getElementsByClassName(δ.curConfig[δ.curConfigIndex].progressClass).length > 0) {
                            document.getElementsByClassName(δ.curConfig[δ.curConfigIndex].progressClass)[0].style.width = δ.progress + "%";
                        }
                        else {
                            δ.clearFadeTimeout();
                        }
                    }
                    catch(e)
                    {}
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
                try
                {
                    var elems = document.getElementsByClassName(δ.curConfig[δ.curConfigIndex].alertClass);
                    for (var i = 0; i < elems.length; i++) {
                        δ.fadeOut(elems[i]);
                    }
                }
                catch(e)
                {}
            },
            fadeOut:function(element){
                var op = 1;
                var timer = setInterval(function () {
                    if (op <= 0.1){
                        clearInterval(timer);
                        element.style.display = 'none';
                        element.remove();
                        δ.curConfig.splice(δ.curConfigIndex, 1);
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
            cloneObj:function(obj){
                if (null == obj || "object" != typeof obj) return obj;
                var copy = obj.constructor();
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
                }
                return copy;
            },
        }
    };
    window.tellme = δ;
})();