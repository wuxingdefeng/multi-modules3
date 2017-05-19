

var zephyr = zephyr || {};
 
zephyr.functionComment = function (fn) {
	return fn.toString().replace(/^.*\r?\n?.*\/\*|\*\/([.\r\n]*).+?$/gm, '');
};

zephyr.dialog = function (opts) {
	var query = parent.$, fnClose = opts.onClose;
	opts = query.extend({
		title: 'My Dialog',
		width: 400,
		height: 220,
		closed: false,
		cache: false,
		modal: true,
		html: '',
		url: ''
	}, opts);

	opts.onClose = function () {
		if (query.isFunction(fnClose)) fnClose();
		query(this).dialog('destroy');
	};

	if (query.isFunction(opts.html))
		opts.html = zephyr.functionComment(opts.html);
	else if (/^\#.*\-template$/.test(opts.html))
		opts.html = $(opts.html).html();

	var win = query('<div></div>').appendTo('body').html(opts.html);
	if (opts.url)
		query.ajax({ async: false, url: opts.url, success: function (d) { win.empty().html(d); } });

	win.dialog(opts);
	query.parser.onComplete = function () {
		query.parser.onComplete = query.noop;
	};

	query.parser.parse(win);
	return win;
};