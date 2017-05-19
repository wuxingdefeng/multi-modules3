/*!
 * Created By:james;
 * Created Time:2014-07-28;
 * Updated By:james;
 * Updated Time:2014-07-28;
 * http://www.diyou.cn
 */
var dd = dd || {};
dd.data = dd.data || {}; // 用于存放临时的数据或者对象

/**
 * 将form表单元素的值序列化成对象
 * 
 * @example dd.serializeObject($('#formId'))
 * 
 * @requires jQuery
 * 
 * @returns object
 */
dd.serializeObject = function(form) {
	var o = {};
	$.each(form.serializeArray(), function(index) {
		if (this['value'] != undefined && this['value'].length > 0) {// 如果表单项的值非空，才进行序列化操作
				if (o[this['name']]) {
					o[this['name']] = o[this['name']] + "," + this['value'];
				} else {
					o[this['name']] = this['value'];
				}
			}
		});
	return o;
};

/**
 * 将form表单元素的值转化为对应的状态显示在前台
 * 
 * @example dd.formatStatus(val,row,index)
 * 
 * @requires jQuery
 * 
 * @returns object
 */
dd.formaterSex = function(val, row, index) {
	return (val == "0") ? "女" : "男";
}
dd.formaterDate = function(val, row, index) {
	var val = parseInt(val);
	var newTime = new Date(val);
	return newTime.getFullYear() + '-' + (newTime.getMonth() + 1) + '-'
			+ newTime.getDay() + ' ' + newTime.getHours() + ':'
			+ newTime.getMinutes() + ':' + newTime.getSeconds()
}

jQuery.extend( {
	postEx : function(requestUrl, sendData, successCallback, errorCallback) {
		if (typeof errorCallback === 'undefined') {
			errorCallback = ajaxErrorEx;
		}
		$.ajax( {
			url : requestUrl,
			data : sendData,
			type : "post",
			cache : false,
			dataType : 'json',
			timeout : 30000,
			success : successCallback,
			error : function (XMLHttpRequest, textStatus, errorThrown) {
   				$.messager.alert('错误',XMLHttpRequest.responseText.errorMsg); 
			}
		});
	}
});


function initUploadUtil(url,$div,$uploadfilesBtn,pickfiles,$fileList,$input){
var uploader = new plupload.Uploader({
	runtimes : 'html5,flash,silverlight,html4',
	browse_button : pickfiles, // you can pass an id...
	container: $div, // ... or DOM Element itself
	url : url  ,
	flash_swf_url : '../js/Moxie.swf',
	silverlight_xap_url : '../js/Moxie.xap',
	multpart:true,
	filters : {
		max_file_size : '10mb',
		mime_types: [
			{title : "Image files", extensions : "jpg,gif,png"},
			{title : "Zip files", extensions : "zip"}
		]
	},

	init: {
		PostInit: function() {
				$uploadfilesBtn.onclick = function() {
				uploader.start();
				return false;
			};
		},

		FilesAdded: function(up, files) {
			if($fileList!=null){
				plupload.each(files, function(file) {
					$fileList.append('<div id="' + file.id + '">' + file.name + '(' + plupload.formatSize(file.size) + ')<strong></strong>' + '<span onclick="uploader.removeFile(uploader.getFile($(this).parent().attr(\'id\')));$(this).parent().remove();$(\'#photo\').attr(\'src\',\'\')" style="cursor:pointer;" class="ext-icon-cross" title="删除">&nbsp;&nbsp;&nbsp;&nbsp;</span> <b></b></div>');	
				});
			}
		},

		UploadProgress: function(up, file) {
			document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
		},

		Error: function(up, err) {
			alert("\nError #" + err.code + ": " + err.message);
		},
		FileUploaded:function(up, file, info){
			var response = $.parseJSON(info.response);
			if($input!=null){
				if (response.status) {
					$input.val(response.fileUrl);
					$('#filelist').empty();
					$('#filelist').append('<div id="' + file.id + '"><a title="查看图片" style="text-decoration: underline; color: blue;" class="easyui-tooltip" href="'+response.fileUrl+'" target="_blank"> ' + response.fileRealName + '</a>(' + plupload.formatSize(file.size) + ')<strong></strong>' + '<span onclick="uploader.removeFile(uploader.getFile($(this).parent().attr(\'id\')));$(this).parent().remove();$(\'#photo\').attr(\'src\',\'\')" style="cursor:pointer;" class="ext-icon-cross" title="删除">&nbsp;&nbsp;&nbsp;&nbsp;</span> <b></b></div></a>');	
		
				}
			}
		}
	}
});
	uploader.init();
		if($input!=null){
			if($input.val()!=null&&$input.val()!=""){
		    	var  args = $input.val().split("/");
		    	var  fileName=args[args.length-1];
		    				$fileList.append('<div id="1"><a title="查看图片" style="text-decoration: underline; color: blue;" class="easyui-tooltip" href="'+$(':input[name="fstreamName"]').val()+'" target="_blank"> ' + fileName + '</a><strong></strong>' + '<span onclick="$(this).parent().remove();$(\'#photo\').attr(\'src\',\'\')" style="cursor:pointer;" class="ext-icon-cross" title="删除">&nbsp;&nbsp;&nbsp;&nbsp;</span> <b></b></div></a>');	
			
		    }
		}
	
}
