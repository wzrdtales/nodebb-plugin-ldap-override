(function(module) {
	"use strict";

	var User = module.parent.require('./user'),
		meta = module.parent.require('./meta'),
		db = module.parent.require('./database'),
		passport = module.parent.require('passport'),
		PassportLocal = module.parent.require('passport-local').Strategy,
  		passportLDAP = require('passport-ldapauth'),
  		fs = module.parent.require('fs'),
  		path = module.parent.require('path'),
  		nconf = module.parent.require('nconf'),
        async = module.parent.require('async');


	var constants = Object.freeze({
		'name': "LDAP Account",
		'admin': {
			'route': '/plugins/ldap',
			'icon': 'fa-user'
		}
	});

	var Ldap = {};

	Ldap.init = function(data, callback) {
		function render(req, res, next) {
			res.render('admin/plugins/ldap', {});
		}

		data.router.get('/admin/plugins/ldap', data.middleware.admin.buildHeader, render);
		data.router.get('/api/admin/plugins/ldap', render);

		callback();
	}

	Ldap.overrideAuth = function() {
		meta.settings.get('ldap', function(err, settings) {
			if (!err && settings['server']
                && settings['filter']) {
		var passportLD = new passportLDAP({
                    server: {
                        url: settings['server'],
                        bindDn: settings['username'],
                        bindCredentials: settings['secret'],
                        searchBase: settings['base'],
                        searchFilter: "(sAMAccountName={{username}})",
                    }
				}, function( userData, done) {
                    Ldap.login(userData.uid, userData, function(err, user) {
				       	if (err) {
					    	return done(err);
					    }
					    return done(null, user);
				    });
				});

                passportLD.name = 'local';
                passport.use(passportLD);
	        };
	    });
	};

	Ldap.login = function(ldapid, userData, callback) {
		Ldap.getUidByLdapId(ldapid, function(err, uid) {
			if(err) {
				return callback(err);
			}

			var success = function(uid) {
				User.setUserField(uid, 'ldapid', ldapid);
				db.setObjectField('ldapid:uid', ldapid, uid);

				callback(null, {
					uid: uid
				});
            };

			if (uid !== null) {
				// Existing User
                return success(uid);
			} else {
				// New User

                /* Add to own database */
				User.create({username: userData.cn, email: userData.mail}, function(err, uid) {
					if(err) {
						return callback(err);
					}
					return success(uid);
				});
			}
		});
	};

	Ldap.getUidByLdapId = function(ldapid, callback) {
		db.getObjectField('ldapid:uid', ldapid, function(err, uid) {
			if (err) {
				return callback(err);
			}
			callback(null, uid);
		});
	};

	Ldap.addMenuItem = function(custom_header, callback) {
		custom_header.authentication.push({
			"route": constants.admin.route,
			"icon": constants.admin.icon,
			"name": constants.name
		});

		callback(null, custom_header);
	}

	module.exports = Ldap;
}(module));
