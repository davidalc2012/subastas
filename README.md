# Manual de Subastas
En este documento veremos como correr y ocupar el programa de subastas para profesores y alumnos del Instituto Tecnológico Autónomo de México (ITAM). 

## Instalación


### Requerimientos
La máquina puede ocupar cualquier sistema operativo, sin embargo es de gran importancia que tenga el programa Mongo instalado. Al igual que la librería express instalada, para esto solamente deberemos correr el comando *npm install express* en nuestra terminal ( para MAC y Linux ).

### Descargar el proyecto
Una vez seguro que cuentas con todo lo necesario, es importante tener el proyecto dentro de la misma computadora. El único repositorio creado por nosotros es : https://github.com/davidalc2012/subastas . Una vez dentro del link descargar el proyecto y colocarlos en una ubicación que podamos recordar (En nuestro caso es : /Documents/Trabajo/Subastas).

### Configuración del proyecto
En su editor de texto favorito - en nuestro caso recomendamos Visual Studio Code - es necesario abrir el proyecto que recientemente descargamos. Y buscamos alguna opción de buscar y remplazar. 
Una vez encontrada esta función de nuestro editor de texto, buscaremos " http://148.205.36.16 " y lo tendremos que remplazar por nuestra dirección IP de la computadora principal, en la que se tiene todo instalado. En nuestro caso pegaremos " http://148.205.36.126". 
Con esta configuración ya podemos guardar el proyecto y cerrar nuestro editor de texto. 

### Correr el proyecto
Es necesario abrir 2 terminales difentes. En la primera ventana, vamos a correr el comando "mongod" y dejar que termine el proceso. Para la segunda ventana, nos ubicaremos dentro de la carpeta Subastas y escribiremos el código "nodemon main.js". Con estos dos pasos será más que suficiente para poder tener corriento el programa.

Es necesario tener las dos ventanas abiertas en todo momento y en caso de que llegara a cerrar alguna de las dos terminales veremos como deja de funcionar el programa.

## Uso


### Vista de control
Para entrar a la vista de la persona que llevará el control de la aplicación es necesario entrar al link: http://148.205.36.16:4000/control 

#### Añadir bloques
Este es el primer paso que debemos de realizar, una vez dado clic en el botón de añadir entraremos a una nueva sección en la cuál deberemos de escribir el nombre de un bloque, el precio y darle añadir. Tenemos que repetir estos pasos tantas veces sea el número de bloques deseado. Al registrar todos los bloques solamente regresaremos al menú principal.

#### Iniciar y pausar una ronda
El usuario que manejará la página principal control tiene la desición en que momento iniciar o pausar una ronda. Es necesario que se establezca una buena comunicación para que todos los jugadores conozcan el tiempo que tienen en cada ronda para ofertar.


### Vista de login
Para entrar a la vista de la persona que llevará el control de la aplicación es necesario entrar al link: http://148.205.36.16:4000/login .


#### Registro
 EL usuario deberá de poner un usuario que se le proporcione en la práctica,darle al botón de "Registrar compañia" y esperar a que control inicie la simulación.
 
#### Ofertar
 En el momento que control inicie una ronda, nosotros veremos todos los bloques que existen durante este juego para poder hacer ofertas
 
#### 

## Limpiar la base de datos
Una vez terminada la simulación es recomendable que en una nueva terminal ejecute los siguientes comandos desde la máquina principal, ya que en caso contrario para la siguiente simulación la base de datos ya tendrá información.
* mongo *
* show dbs *
* use bidding *
* db.dropDatabase() *

## Errores en la versión V.1.0.1

Registrar primero bloques y después empresas.
Elegibilidad se queda en 1, cuando debería de pasar a 0. 



