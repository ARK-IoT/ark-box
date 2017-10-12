#!/bin/sh
## ArkBox installer script
##  created by Matthias Strubel   (c)2011-2014 GPL-3
##	adapted by sleepdeficit (simon@sleepdev.sh) 2017
##

create_content_folder(){

   echo "Creating 'content' folder on USB stick and move over stuff"
   mkdir -p $WWW_CONTENT
   cp -r     $ARKBOX_FOLDER/www_content/*   $WWW_CONTENT

   [ ! -L $ARKBOX_FOLDER/www/content  ] && \
		ln -s $WWW_CONTENT  $WWW_FOLDER/content
   [ ! -e $WWW_FOLDER/favicon.ico ] && \
		ln -s $WWW_CONTENT/favicon.ico $WWW_FOLDER

   chown $LIGHTTPD_USER:$LIGHTTPD_GROUP  $WWW_CONTENT -R
   chmod  u+rw $WWW_CONTENT
   return 0
}

# Load configfile

if [ -z  $1 ] || [ -z $2 ]; then
  echo "Usage install_arkbox my_config <part>"
  echo "   Parts: "
  echo "       part2          : sets Permissions and links correctly"
  echo "       flush_dns_reg      : Installs crontask to flush dnsmasq regulary"
  echo "       hostname  'name'   : Exchanges the Hostname displayed in browser"
  exit 1
fi

if [ !  -f $1 ] ; then
  echo "Config-File $1 not found..."
  exit 1
fi

#Load config
ARKBOX_CONFIG=$1
. $1

if [ $2 = 'part2' ] ; then
   echo "Starting initialize ArkBox Part2.."
#Create directories
#   mkdir -p $ARKBOX_FOLDER/share/Shared
   mkdir -p $UPLOADFOLDER
   mkdir -p $ARKBOX_FOLDER/tmp

   #Distribute the Directory Listing files
   $ARKBOX_FOLDER/bin/distribute_files.sh $SHARE_FOLDER/Shared true
   #Set permissions
   chown $LIGHTTPD_USER:$LIGHTTPD_GROUP  $ARKBOX_FOLDER/www -R
   chown $LIGHTTPD_USER:$LIGHTTPD_GROUP  $ARKBOX_FOLDER/tmp
   chown $LIGHTTPD_USER:$LIGHTTPD_GROUP  $ARKBOX_FOLDER/tmp -R

#Install a small script, that the link on the main page still works
   [ ! -L $ARKBOX_FOLDER/www/content  ] && \
       ln -s $WWW_CONTENT  $WWW_FOLDER/content
fi

if [ $2 = "flush_dns_reg" ] ; then
    crontab -l   >  $ARKBOX_FOLDER/tmp/crontab 2> /dev/null
    echo "#--- Crontab for dnsmasq flush" >>  $ARKBOX_FOLDER/tmp/crontab
    echo " */2 * * * *    $ARKBOX_FOLDER/bin/flush_dnsmasq.sh >  $ARKBOX_FOLDER/tmp/dnsmasq_flush.log "  >> $ARKBOX_FOLDER/tmp/crontab
    crontab $ARKBOX_FOLDER/tmp/crontab
    [ "$?" != "0" ] && echo "an error occured" && exit 254
    echo "Installed crontab for flushing dnsmasq requlary"
fi

set_hostname() {
	local name=$1 ; shift;

	sed  "s|#####HOST#####|$name|g"  $ARKBOX_FOLDER/src/redirect.html.schema >  $WWW_FOLDER/redirect.html
        sed "s|HOST=\"$HOST\"|HOST=\"$name\"|" -i  $ARKBOX_CONFIG
}

if [ $2 = "hostname" ] ; then
	echo "Switching hostname to $3"
	set_hostname "$3"
	echo "..done"
fi

if [ $2 = "content" ] ; then
	create_content_folder
fi
