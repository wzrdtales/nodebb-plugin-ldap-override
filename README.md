# NodeBB LDAP Overrider

NodeBB Plugin that allows users to login/register via their LDAP account and replaces the default login.

## Installation

    incoming

## Configuration

1. Login in nodebb as admin, activate the plugin
2. Configure the plugin thought url  admin/plugins/ldap
   Example:
     * ldap://some.server.url.com:9999  #LDAP server
     * cn='admin' #bindDn
     * o=users,o=example.com  #searchBase
     * (uid={{username}}) #searchFilter
    
