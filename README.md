# TestMercantilAndina

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

###### DESCRIPCION DEL PROYECTO.

Esta aplicacion consiste en un simulador de registros para usuarios. Donde mediante una serie
de pasos, podremos cargar nuestros datos personales, datos del vehiculo, y seleccionar una cobertura.
Finalmente podremos visualizar toda la informacion cargada anteriormente.

###### ESTRUCTURA DE ARCHIVOS.

Podremos encontrar dentro de la carpeta `src/app` una sub carpeta llamada `components`.
Dicha carpeta se estructura:
-> models : Continene los modelos de datos utilizados.
-> pages : Contiene la pantalla visualizada.
-> services : Contiene los servicios utilizados.
-> shared : Contiene los componentes reutilizables.

###### COMANDOS UTILES.

## INSTALAR DEPENDENCIAS ( instalara el paquete node_modules con todas las dependencias utilizadas en el proyecto).

npm install

## CORRER APLICACION ( ejecutara la aplicacion automaticamente en `http://localhost:4200/`).

npm start

## CORRER TESTING CYPRESS ( es necesario mantener ejecutando app (npm start) al momento de ejecutar cypress ).

npm test

## Build ( nos compilara nuestra aplicacion para el ambiente de produccion, en la carpeta dist ).

ng build --prod

## SUBIR SERVIDOR ( nos permitira desplegar la app en el servidor de Netlify ).

netlify deploy --prod
