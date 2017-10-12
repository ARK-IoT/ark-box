#!/bin/sh

## Library for some kind of avahi-node name resolution
##  over a mesh network
NODE_IP=""

## This function takes an address like
#    gjgtjtjt.arkbox.lan
#  hostname converts it to: arkbox.local
#  makes an avahi resolution and gives back the IP in NODE_IP
resolve_node_hostname() {
   local in_nodename=$1

   local AVAHI_HOST=$( echo $in_nodename | sed 's|\.|_|g' )
   local bonjour_hostname="$AVAHI_HOST"".local"
   local output=$( avahi-resolve-host-name -6 $bonjour_hostname )

   if [ ! -z "$output" ] ; then
	echo "Found host: $output"
	#Sorry for that worse splitup of name and IP
	NODE_IP=$( echo $output | sed "s|$bonjour_hostname||" )
	return 0
   else
	return 1
   fi

}
