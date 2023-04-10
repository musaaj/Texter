function $(selector=document, parent=document) {
    let DOMElement;

    if (typeof (selector) == "object") {
        DOMElement = selector;
    } else if (typeof (selector) == "string") {
        if (selector.match(/^#/)) {
            DOMElement = parent.querySelector(selector);
        } else {
            DOMElement = parent.querySelectorAll(selector);
        }
    }

    DOMElement.$ = select=>{
        return $(select, DOMElement);
    }

    DOMElement.on = function(type,callBack){

        if (DOMElement.__proto__.forEach) {
            DOMElement.forEach(function(item){
                item.addEventListener(type, callBack, false);
            }
            )
        } else {
            DOMElement.addEventListener(type, callBack, false);
        }

    }

    DOMElement.load = (callBack)=>{
        DOMElement.on("DOMContentLoaded", callBack)
    }
    
    DOMElement.onTouchDown = (callBack)=>{
        let timer;
        DOMElement.on("touchstart", event=>{
            if(!timer){
                console.log(event);
                timer = setTimeout(()=>{callBack(event)}, 800);
            }
        });
        
        DOMElement.on("touchend", event=>{
        
            clearTimeout(timer);
            timer = null;
        });
    }

    DOMElement.hide = ()=>{
        if (DOMElement.__proto__.forEach) {
            DOMElement.forEach(item=>{
                item.style.display = "none";
            }
            )
        } else {
            DOMElement.style.display = "none";
        }
    }

    DOMElement.show = ()=>{
        if (DOMElement.__proto__.forEach) {
            DOMElement.forEach(item=>{
                item.style.display = "initial";
            }
            )
        } else {
            DOMElement.style.display = "initial";
        }
    }

    DOMElement.toggle = ()=>{
        if(DOMElement.style.display == "none"){
            DOMElement.show();
        }else{
            DOMElement.hide();
        }
    }

    DOMElement.addClass = className=>{
        if(DOMElement.__proto__.forEach){
            DOMElement.forEach(item=>{
                item.className = item.className + className;
            })
        }else{
            DOMElement.className = DOMElement.className + className;
        }
    }

    DOMElement.removeClass = className=>{
        if(DOMElement.__proto__.forEach){
            DOMElement.forEach(item=>{
                item.className = item.className.replace(className, "");
            })
        }else{
            DOMElement.className = DOMElement.className.replace(className, "");
        }
    }

    DOMElement.toggleClass = className=>{
        if(DOMElement.className.match(className)){
            DOMElement.removeClass(className);
        }else{
            DOMElement.addClass(className);
        }
    }

    return DOMElement;
}