<h1><i class="fa fa-user"></i> LDAP Account Authentication</h1>
<hr />

<form class="ldap-settings">
	<div class="alert alert-warning">
		<p>
			Please refer to LDAP Account client settings for appropriate values. All fields are mandatory.
		</p>
		<br />
		<div class="form-group">
			<input type="text" name="server" title="LDAP server" class="form-control input-lg" placeholder="ldap://some.server.url.com:9999">
		</div>
		<div class="form-group">
			<input type="text" name="username" title="LDAP Usernamet" class="form-control" placeholder="Username">
		</div>
		<div class="form-group">
			<input type="password" name="secret" title="LDAP Secret" class="form-control" placeholder="LDAP Secret">
		</div>
		<div class="form-group">
			<input type="text" name="base" title="Base DN" class="form-control" placeholder="ou=group,dc=company,dc=ltd">
		</div>
		<div class="form-group">
			<input type="text" name="filter" title="Filter" class="form-control" placeholder="(sAMAccountName)">
		</div>

		<div class="form-group">
			<input type="text" name="attributes" title="attributes" class="form-control" placeholder="list,of,user,attributes,you,want,returned">
		</div>
		<div class="form-group">
			<input type="text" name="earchAttributes" title="Search Attributes" class="form-control" placeholder="displayName">
		</div>
	</div>
</form>

<button class="btn btn-lg btn-primary" type="button" id="save">Save</button>

<script>
	require(['settings'], function(Settings) {
		Settings.load('ldap', $('.ldap-settings'));

		$('#save').on('click', function() {
			Settings.save('ldap', $('.ldap-settings'));
		});
	});
</script>
