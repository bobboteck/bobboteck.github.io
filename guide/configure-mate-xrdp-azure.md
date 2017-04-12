Abilitare la regola per la porta 3389

Installazioni da fare dopo la creazione di una VM Linux su Azure per potersi connettere in RDP (xrdp) con desktop Mate.



```
sudo apt-get update
sudo apt-add-repository ppa:ubuntu-mate-dev/ppa
sudo apt-add-repository ppa:ubuntu-mate-dev/xenial-mate
sudo apt-get update
sudo apt-get install --no-install-recommends ubuntu-mate-core ubuntu-mate-desktop
sudo apt-get install xrdp
[[http://c-nergy.be/blog/?p=8952]]
{
sudo sed -i.bak '/fi/a #xrdp multiple users configuration \n mate-session \n' /etc/xrdp/startwm.sh
setxkbmap -layout it
sudo cp km-0409.ini km-0409.bak
sudo xrdp-genkeymap km-0409.ini
}

Connettersi
```


Per installare il DE classico di Ubuntu
```
sudo apt-get update
sudo apt-get install ubuntu-desktop
sudo apt-get install xrdp

```
