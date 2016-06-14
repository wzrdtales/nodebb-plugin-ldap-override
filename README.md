# NodeBB LDAP Overrider

NodeBB Plugin that allows users to login/register via their LDAP account and replaces the default login.

## Installation

1. Move into your nodebb root directory.
2. Execute the commands below:

```
git clone https://github.com/wzrdtales/nodebb-plugin-ldap-override.git node_modules/nodebb-plugin-ldap
cd node_modules/nodebb-plugin-ldap
npm install
cd -
```

3. Activate the plugin within the admin menu.
4. Restart NodeBB
5. Navigate to http://yournodebburl.com/admin/plugins/ldap
6. Set your settings (you can leave out the last two options they are not needed at all)
7. You should be done, test if you can login via LDAP now

**Note**: As soon as you activate this plugin the default login does not work anymore. Thus make
sure to not logout before you actually made the account that gets newly registered through your
first ldap login an admin. Otherwise you wont be able to log into this account anymore until you
deactivate the plugin.

## Configuration

1. Login in nodebb as admin, activate the plugin
2. Configure the plugin thought url  admin/plugins/ldap
   Example:
     * ldap://some.server.url.com:9999  #LDAP server
     * cn='admin' #bindDn
     * o=users,o=example.com  #searchBase
     * uid #searchFilter
    
