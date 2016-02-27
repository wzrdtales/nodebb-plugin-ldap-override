# NodeBB Google SSO

NodeBB Plugin that allows users to login/register via their LDAP account.

## Installation

  Only for privite use now, copy to the nodebb node__modules directory

## Configuration

1. Login in nodebb as admin, activate the plugin
2. Configure the plugin thought url  admin/plugins/ldap
   Example:
     * ldap://some.server.url.com:9999  #LDAP server
     * cn='admin' #bindDn
     * o=users,o=example.com  #searchBase
     * (uid={{username}}) #searchFilter
    
