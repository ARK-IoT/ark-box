#!/bin/bash

echo
echo
echo "#########################################################"
echo "    _____         __            __________               "
echo "   /  _  \_______|  | __        \______   \ _______  ___ "
echo "  /  /_\  \_  __ \  |/ /  ______ |    |  _//  _ \  \/  / "
echo " /    |    \  | \/    <  /_____/ |    |   (  <_> >    <  "
echo " \____|__  /__|  |__|_ \         |______  /\____/__/\_ \ "
echo "         \/           \/                \/            \/ "
echo "#########################################################"
echo ""
echo "Website: https://ark.io | https://github.com/Ark-IoT"
echo "		Ark: Box Version: 0.9.0"
echo
echo

# Import ArkBox conf
CURRENT_CONF=arkbox/conf/arkbox.conf
scriptfile="$(readlink -f $0)"
CURRENT_DIR="$(dirname ${scriptfile})"

# Must be root
if [[ $EUID -ne 0 ]]; then
    echo "This script must be run as root" #1>&2
    exit 0
fi

# Update system
sudo apt-get update

# Checks if ArkBox files are correctly placed relative to the install.sh script
if [[ -f  "$CURRENT_DIR"/$CURRENT_CONF ]]; then
	. $CURRENT_CONF 2> /dev/null
else
	echo "ArkBox config is not in its normal directory."
	echo "Expecting it in \"$CURRENT_DIR/$CURRENT_DIR\"."
	exit 0
fi

# Begin setting up arkbox's home dir
if [[ ! -d /opt ]]; then
	mkdir -p /opt
fi

# If arkbox already exists, remove it
if [[ -d /opt/arkbox ]]; then
	rm -rf /opt/arkbox &> /dev/null
fi

# Copies arkbox files to working directories
cp -rv "$CURRENT_DIR"/arkbox /opt &> /dev/null
echo "Finished copying files to /opt/arkbox..."

if ! grep "$NET.$IP_SHORT arkbox.lan$" /etc/hosts > /dev/null; then 
	echo "\"$NET.$IP_SHORT arkbox.lan\" found in /etc/hosts"
else
	echo "Adding $NET.$IP_SHORT arkbox.lan to /etc/hosts"
	echo "$NET.$IP_SHORT arkbox.lan">>/etc/hosts
fi

if ! grep "$NET.$IP_SHORT arkbox$" /etc/hosts > /dev/null ; then 
	echo "\"$NET.$IP_SHORT arkbox\" found in /etc/hosts"
else
	echo "Adding $NET.$IP_SHORT arkbox to /etc/hosts"
	echo "$NET.$IP_SHORT arkbox">>/etc/hosts
fi

ln -s /opt/arkbox/init.d/arkbox /etc/init.d/arkbox

# Install dependencies
apt-get install -y hostapd lighttpd dnsmasq

# ArkBox auto-configuration
/opt/arkbox/bin/install_arkbox.sh /opt/arkbox/conf/arkbox.conf part2

# Configure and start ArkBox.service
echo "stopping hostapd, dnsmasq, and lighttpd.."
sudo pkill hostapd
sudo pkill dnsmasq
sudo pkill lighttpd
echo "pkill'd"
echo
echo "enabling arkbox"
sudo systemctl enable arkbox
echo

# Configure ArkBox for start at boot
sudo update-rc.d -f arkbox defaults

# Make SD-Card Read-Only
# more info: https://learn.adafruit.com/read-only-raspberry-pi/
#	FIXME: AP & SSH will work; Redirect & HTML will not
#sudo bash arkbox/bin/read-only-fs.sh

echo
echo
echo "	####################################"
echo "	#    ArkBox has been installed     #"
echo "	####################################"
echo
echo
echo
echo "	      Please 'sudo reboot' now."
echo
echo "	  First-boot will take several minutes"
echo
echo

exit 0
