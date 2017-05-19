//只能输入数字
function keyPress() {    
     var keyCode = event.keyCode;    
     if ((keyCode >= 48 && keyCode <= 57))    
    {    
         event.returnValue = true;    
     } else {    
           event.returnValue = false;    
    }    
 }
function clearNoNum(obj)
{
	//先把非数字的都替换掉，除了数字和.
	obj.value = obj.value.replace(/[^\d.]/g,"");
	//必须保证第一个为数字而不是.
	obj.value = obj.value.replace(/^\./g,"");
	//保证只有出现一个.而没有多个.
	obj.value = obj.value.replace(/\.{2,}/g,".");
	//保证.只出现一次，而不能出现两次以上
	obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
	//小数点后面只能两位  /^\d*\.(\d{2})$/g
	var str =obj.value.split(".");
	var num ='';
	if(str.length > 1){
		num = str[1];
		num = num.replace(/[^\d]/g,"");
		if(num.length > 2){
			num = num.substring(0, 2);
		}
		obj.value = str[0]+'.'+num;
	}
}
$(function(){
	$.ajaxSetup({     
	    contentType:"application/x-www-form-urlencoded;charset=utf-8",     
	    complete:function(XMLHttpRequest,textStatus){   
	      var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus");   
	      var url=XMLHttpRequest.getResponseHeader("url");
	             if(sessionstatus=="timeout"){   
	               window.location.replace(url);     
	             }     
	       }     
	  }); 
});
