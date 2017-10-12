<img src="https://github.com/Ark-IoT/ark-box/blob/master/ark_box_logo.png" width="350">  

![Version](https://img.shields.io/badge/version-0.9.0--beta-orange.svg?style=flat-square&&colorA=494949) 
[![License](https://img.shields.io/badge/license-MIT-BE90D4.svg?style=flat-square&&colorA=494949)](http://creativecommons.org/licenses/by-sa/4.0/) 

## What is ***Ark: Box***

ArkBox is an network box for communicating and sharing files.  
Designed for security, it is inspired by the spirit of pirate radio,  
early hackers (Stallman, Draper, Gosper, Woz, etc),  
and--(per [*levy*](http://www.stevenlevy.com/))--the  **Hacker Ethic**  
1. Access to computers—and anything which might teach you something about the way the world works—should be unlimited and total. Always yield to the Hands-on Imperative!
2. All information should be free.
3. Mistrust authority—promote decentralization.
4. Hackers should be judged by their hacking, not bogus criteria such as degrees, age, race or position.
5. You can create art and beauty on a computer.
6. Computers can change your life for the better.  

Based on [**PirateBox**](https://piratebox.cc/) by [**David Darts**](https://daviddarts.com/) and [**FreedomBox**](https://freedombox.org/).
 
ArkBox is a FOSS project, GPL3 compatible and MIT Licensed.

-----

## Screenshot  

Address: **arkbox.lan**  

<img src="https://github.com/Ark-IoT/ark-box/blob/master/screenshot.png" width="350">  

**Welcome Aboard!**  

-----  

## Requirements
- Raspberry Pi 1/2/3/Zero/ZeroW
- Class 10/U10 MicroSD-Card
- Micro-USB Cable
- Host Computer (Window, Linux, macOS)

#

- requirement notes:  
  - For non-Zero W's & Pi 3's, 
    you will need a [**compatible**](http://elinux.org/RPi_USB_Wi-Fi_Adapters) USB-WiFi adapter.
  - If installing from Raspbian or another RPi distro, 
    you'll need ```Git``` to clone this repo.  
  ```sudo apt-get install git```

-----

# Preparation

### Image Preparation 

- See [**How to Raspbian**](https://github.com/Ark-IoT/ark-box/blob/master/docs/HOW_to_RASPBIAN.md) for instructions on how to download and flash Raspbian;
or how to flash the ark-box image.

#

### OTG-Mode

- See [**How to OTG**](https://github.com/Ark-IoT/ark-box/blob/master/docs/HOW_to_OTG.md) for instructions on how to install Raspbian and access your Pi over USB.

#

#### Preparation Notes:
- Make sure you are sharing/bridging your internet connection via usb-cable with your RPi.
- Installation will take about 10-minutes.

-----

# Installation from your own distro:   

**1.** Connect to your RPi.   

- if using Raspbian Stretch Lite: 
    SSH via usb [**headless-mode**]  
    ``` ssh pi@raspberrypi.local```  
  - default password: ```raspberry```  
  - **Be sure to change this afterwards.**  

#

**2.** Expand your filesystem 
- Expand your filesystem to use your whole microSD-card:  
    ```sudo raspi-config```  
- **Option 7: Advanced Options**  
- **Option A1: Expand Filesystem**  
- Reboot when prompted,  
    or manually via ```sudo reboot```

#

**3.** Clone this repo & 'cd' into it:  
- ```git clone https://github.com/Ark-IoT/ark-box```  
- ```cd ark-box```

#

**4.** Change permissions of the "arkbox" folder:  
- ```sudo chmod -R 775 arkbox```  

#

**5.** 'cd' to 'arkbox' and run the install.sh file:  
- ```cd arkbox```  
- ```sudo bash install.sh```  

#

**6.** Wait about 1-minute after the install script finishes, then:   
- ```sudo shutdown now```

#

**7.** Plug your RPi into a power source (ex: micro-usb power port).
- **Your ArkBox will power on,  
    and the WiFi network** ```ArkBox: Welcome Aboard!``` **will be visible.**  
- First boot can take a few minutes depending on hardware(microSD speed, Pi-model, etc).

#

**8.** Using a web-browser, navigate to:  
- ```arkbox.lan```  
**Welcome Aboard!**  

-----

## Troubleshooting:

- See [**Troubleshooting.md**](https://github.com/Ark-IoT/ark-box/blob/master/docs/TROUBLESHOOTING.md)

-----

## ToDo:

- [ ] Make a better todo
- [ ] Documention!

-----

### Tip Jar   
**ѦRK [Ѧ]:** ```AZreeHxX23s4jttL3ML8n6A2aLrwHPfVGZ```  
**DѦRK [DѦ]:** ```DHQ4Fjsyiop3qBR4otAjAu6cBHkgRELqGA```  
