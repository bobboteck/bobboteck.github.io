---
title: "Jetson Nano personal installation notes"
categories:
  #- Blog
  - Notes
tags:
  - nvidia
  - jetson
  - nano
  - install
---

Hi, I pulled the second Jetson Nano I had out of the drawer, and it had always given me problems with the power supply.
It seems that the problems remain, but strangely it would seem that they only occur during the finalization phases of the installation of the operating system. If you can get through this stage unscathed, then it seems to work, right now as of this writing it has an uptime of 250 minutes.

So let's see the steps taken.

1. Downloaded the latest version of the Jetpack for the Jetson Nano (4.5.1)
2. Created the SD following the instructions on the [official web site](https://developer.nvidia.com/embedded/learn/get-started-jetson-nano-devkit#write)
3. Updated the operating system
4. Installed pip3 following the following commands

    ```shell
    sudo apt update
    sudo apt install python3-pip
    ```

5. Installed jtop

    ```shell
    sudo -H pip3 install -U jetson-stats
    ```

6. Reboot
7. Install cUrl

    ```shell
    sudo apt install curl
    ```
