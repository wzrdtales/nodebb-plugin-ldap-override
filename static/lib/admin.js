define('admin/plugins/ldap', ['settings'], function(Settings) {
	'use strict';
	/* globals $, app, socket, require */

	var ACP = {};

	ACP.init = function() {
		Settings.load('ldap', $('.ldap-settings'));

		$('#save').on('click', function() {
			Settings.save('ldap', $('.ldap-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'ldap-saved',
					title: 'Settings Saved',
					message: 'Please reload your NodeBB to apply these settings',
					clickfn: function() {
						socket.emit('admin.reload');
					}
				});
			});
		});
	};

	return ACP;
});
