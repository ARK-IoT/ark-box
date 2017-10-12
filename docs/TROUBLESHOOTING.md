# Troubleshooting:

Quick tips for troubleshooting 

- [**Broken Pipe/dpkg Errors**](https://github.com/Ark-IoT/ark-box/new/master/docs#broken-pipe--timeout--disconnect-errors)
- [**WiFi Network not visible**](https://github.com/Ark-IoT/ark-box/new/master/docs#ark-paper-wallet-wifi-network-not-showing-up)
- [**WiFi Signal Drops**](https://github.com/Ark-IoT/ark-box/new/master/docs#the-wifi-signal-dropsdisappears-every-time-i-connect)

-----

### **'Broken Pipe' / Timeout / Disconnect Errors**  
If for any reason your RPi's connection fails/freezes during installation,  
Reconnect to your Pi, then run:  
```sudo dpkg --configure -a```  
You should then return to Step 5,  
'cd' into 'arkbox' then,  
 ```sudo bash install.sh```  
to finish installation.

#

### **'Ark: Paper Wallet' WiFi network not showing up.**  
There are many errors that can cause this.
Try running ```sudo bash install.sh``` again.  
Using another micro-usb cable or a 'class 10' microSD card can usually fix this as well.  

#

### The Wifi signal drops/disappears every time I connect!
This can be caused by not getting enough power(mAh/Ah).
Make sure to use a 5V >=1,000mAh/1Ah power supply. 2Ah or better if using NFC or additional hardware.
If your power source meets those requirements, try another power source or USB-cable.
