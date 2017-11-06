#NodeRed on RasperryPi (with Arduino)
Lo scopo di questa guida è raccogliere le informazioni utili che possono portare velocemente ad utilizzare **NodeRed**, su *Raspebrry PI* (ma non solo), per gestire informazioni ricevute dalla **Seriale** e visualizzarle in una console grafica.

https://nodered.org/docs/hardware/raspberrypi
###Aggiornamento
Sulla mia installazione di base della Raspberr PI, risultavano installati:
- Node-RED v0.15.3
- Node.js  v0.10.29
- npm      non installato

Con Node-RED già installato è possibile effettuare un aggioramento automatico semplicemente digitando nella shell il seguente comando
```
update-nodejs-and-nodered
```
Vengono aggiornati automaticamente NodeJS, Node-RED e npm, al termine dell'aggiornamento le versioni risultavano:
- Node-RED v0.17.5
- Node.js  v6.11.5
- npm      v3.10.10

###Priomo avvio
```
node-red-start
```
Nelle versioni precedenti era necessario premere CTRL+C per poter lavorare con la sheel, ora dopo aver avviato Node-RED, si ha nuovamente il controllo della stessa.
Per arrestare completamente **NodeRed** lanciare il comando:
```
node-red-stop
```
Se invece si vuole avere un Log delle operazioni in corso si può eseguire il comando
```
node-red-log
```
###
Tramite il menu, selezionare *Manage palette*, si apre una schermata dove si possono vedere nel Tab *Palette* tutti i nodi attualmente installati. Passando invece al Tab *Install*, è possibile installare nuovi Nodi direttamente dall'interfaccia Web. Un pratica funzione si search permette di trovare facilmente quello interessato.

http://developers.sensetecnic.com/article/a-node-red-dashboard-using-node-red-dashboard/

####Arduino(Da spostare)
https://www.arduino.cc/en/Reference/HomePage
https://www.arduino.cc/en/Reference/Serial
https://www.arduino.cc/en/Serial/ReadString
https://www.arduino.cc/en/Serial/Write


######Potrebbe servire
Se ci si collega alla *Raspberry* via **SSH** potrebbe risultare utile avere un terminale per la Seriale, leggero e a riga di comando. Il programma consigliato, che normamente non è installato, è **Minicom**.

```
sudo apt-get install minicom

minicom -b 9600 -o -D /dev/ttyAMA0 
```