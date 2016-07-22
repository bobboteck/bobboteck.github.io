#Appunti Installazione e configurazione PINE64

##Cos'è la PINE64
...

##Prima di cominciare
Il case ...
L'alimentatore ...
La microSD ...
Per completare cavo di rete, tastiera e mouse

##La ISO
Per cominciare serve scaricare la ISO da montare sulla microSD, faccio una piccola premessa, ad ora nel momento in cui scrivo non c'è una distribzione ufficiale per la PINE64, quelle che sono disponibili sono realizzate da utenti che tulizzano la scheda, in particolare la distribuzione di ubuntu è realizzata da "longsleep". Detto questo aggiungo che io non ho utilizzato la ISO riportata sul wiki ufficiale, ma direttamente una di quelle messe a disposizione da longsleep sul sito [https://www.stdin.xyz/downloads/people/longsleep/pine64-images/ubuntu/]. Al momento in cui scrivo è disponbile una versione del 16 luglio 2016, ma io ho utilizzato la versione del 7 maggio 2016, probabilmente prenderò una seconda SD per testare questa nuova versione in futuro.
Passiamo alla parte più importante, portare la ISO sulla microSD, io l'ho fatto dal mio PC con ubuntu ed è stato semplicissimo basta collegare la microSD al PC, poi fare doppio click sul file scaricato (xenial-pine64-bspkernel-20160507-1.img.xz) ed in automatico si aprirà una finestra che ci chiede dove voglio ripristinare l'immagine, basta selezionare la SD (bisogna fare attenzione solo qui a cosa selezioniamo) e attendere che l'operazione sia completata. Altermine smontare la SD ed il gioco è fatto. Se non avete un PC con linux sappiate che un mio amico ha fatto la setessa operazione usando la Live di Ubuntu.

##Il primo boot
Prima di collegare l'alimentazione alla scheda, inserite la microSD nell'apposito connettore, collegate il cavo di rete (io non ho il modulo WiFi), il cavo HDMI e la tastiera, il mouse al momento non serve perché la ISO non contiene tutta la parte relativa al server grafico, che potremo installare successivamente, ora collegate l'alimentatore prima alla presa di rete e poi alla PINE64.
Ricordatevi di selezionare sul televisore la giusta porta HDMI, ho detto televisore non a caso, perché su alcuni monitor non funziona corretamente in quanto usano internamente un adattore HDMI che al momento crea problemi, io non ho indagato ulteriormente su questo tema se scopro qualcosa di più aggiornerò l'articolo. Ora se tutte le componenti sono giuste e se tutti i collegamenti sono fatti bene, dovreste già vedere sullo schermo del testo che scorre. Potreste anche notare che il testo è in parte tagliato sui bordi dello schermo (questo potete notarlo se non siete al primo boot di un linux), bene nessun problema, provate ad armeggiare con il telecomando del televisore, esistono delle funzionalità di zoom o adattamento dell'immagine ed alcuni televisori scelgono in autonomia cosa è meglio per noi, anche se non sempre lo è. Per cercare di spiegare meglio questo fenomeno, ricordo che avevo un televisore che permetteva di selezione diversi formati di visualizzazione 4:3, 16:9, wide, senza barre (quelle nere tipiche dei film), quest'ultima in particolare è vero che non faceva vedere le barre nere sopra e sotto l'immagine, ma è anche vero che per adattarla tagliava un po' di immagine ai lati. E' la stessa cosa che accade con la PINE64, io ad esempio sul TV che ho usato ho impostato la modalità THX è si vede correttamente. Tornando al boot, ad un certo punto potrebbe sembrare che sia tutto fermo e potreste interprete in modo non corretto i massaggi a video (al mio primo tentativo non vedevo tutto il il testo e l'ultima cosa che leggevo era un errore, quindi ho spento pensando che non andava), aspettate con molta calma il primo boot è "mostruosamente lento". Quando sarà completato lo capirete perché vi chiederà di inserire la Login e successivamente la Password, dopo di che sarete collegati al prompt di Ubuntu installato sulla PINE, e potete cominciare a dare i primi comandi da tastiera.

##Installare e configurare il Desktop Environment
A qualcuno potrebbe bastare il prompt per lavorare con Linux, senza appesantire il sistema con l'interfaccia grafica, visto l'utilizzo che ne voglio fare anche per me poteva andar bene, ma volevo provare la scheda in tutto le sue funzionalità quindi vediamo come installare il Desktop Environment.
Io ho seguito questa guida [https://www.pine64.pro/desktop-environment-on-ubuntu/] che è fatta molto bene, ne riporto per semplicità i comandi eseguiti:

```
sudo -i
apt-get upgrade
apt-get upgrade
apt-get install dialog tasksel
```

Eseguendo il primo comando viene riechiesta la password dell'utente root, in modo che tutti i comandi a seguire siano eseguiti con le sue credenziali. Per chi non fosse addentrato ai comandi da terminale di Linu, con le altre righe si aggiorna il sistema e poi si installa la utility tasksel, che verrà usata per installare il desktop environment. Avviamo quindi questa utility con il comando

```
tasksel
```

Si aprirà un'iterfaccia "grafica" nel terminale in cui si può sceglire cosa installare, al momento i DE supportati sono solo MATE e XFCE, a voi la scelta se avete preferenze, io ho optato per MATE, quindi ho selezionato nell'interfaccia "Ubuntu MATE minimal installation" e dato OK. Tutto il processo dura un'ora o più, i tempi dipendono dalla bontà della microSD e della rete che state utilizzando, quindi avviate il processo e dedicatevi ad altro. Consiglio, se possibile, di eseguire queste operazioni direttamente dalla scheda e non collegati in SSH, visti i tempi di esecuzione potrebbero verificarsi problemi di qualsiasi tipo e perdere la connessione senza sapere a che punto sia arrivata l'installazione o se si sono verificati problemi.

Terminata questa installazione, possiamo eseguire i comandi riportati nello step 3 della pagina indicata in precedenza, per l'installazione di alcune librerie e la creazione del file xorg.conf. Personalmente non ho controllato se questo file esisteva già prima di eseguire i comandi, cercherò di ricordarmene quando farò una nuova SD, comunque garantisco che così funziona se scrivete correttamente tutti i comandi. La prima riga serve ad installare le librerie aggiuntive:

```
apt-get install libump libvdpau-sunxi1 libcedrus1 sunxi-disp-tool xserver-xorg-video-fbturbo
```

Le altre a creare il file

```
echo 'Section "Device"' > /etc/X11/xorg.conf
echo 'Identifier "Allwinner A10/A13 FBDEV"' >> /etc/X11/xorg.conf
echo 'Driver "fbturbo"' >> /etc/X11/xorg.conf
echo 'Option "fbdev" "/dev/fb0"' >> /etc/X11/xorg.conf
echo 'Option "SwapbuffersWait" "true"' >> /etc/X11/xorg.conf
echo 'EndSection' >> /etc/X11/xorg.conf
```

Al termine di questi comandi potete eseguire anche:

```
cat /etc/X11/xorg.conf
```

per verificare che il file sia stato scritto correttamente, se tutto è ok si può effettuare un riavvio, come? Semplice basta digitare:

```
reboot
```

Al riavvio questa volta non vedrete il propt di login in formato testo, ma la finestra per inserire le credenziali del Desktop Environment.

##Software aggiuntivi

###Nano
```
sudo apt-get install nano
```

###Python
```
ubuntu@pine64:~$ apt-cache search python | egrep "^python2.[0-9] " --color
python2.7 - Interactive high-level object-oriented language (version 2.7)
ubuntu@pine64:~$ sudo apt-get install python2.7
```

###NodeJS
```
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
```

###Git
```
sudo apt-get install git-all
```

###Midori
```
apt-get install midori
```
