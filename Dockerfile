# Imgen de linos que ya tiene node instalado
FROM node:18-alpine3.15

# Set working directory
# comando de linux para crear un directorio en ese patch.
RUN mkdir -p /var/www/pokedex
#aqui le digo con WORKDIR  es ese el  directorio
WORKDIR /var/www/pokedex

# Copiar el directorio y su contenido, excepto los foders dist, mongo, node_modules
# y  el foder .git que esta oculta: estos se declaran en un archivo 
#   creado en la raiz del proy. llamdo .dockeignore . 
#en la ruta indicada
COPY . ./var/www/pokedex
#copio los json y build en ese patch. nota el ultimo es el patch de destino
COPY package.json tsconfig.json tsconfig.build.json /var/www/pokedex/
#instale todas las depedencia de producción
RUN yarn install --prod
# Ahora se manda a ejecutar la instrucción que está definino enel package.json
#que es el que construye  el folder dist de mi aplicación, 
# ahi está mi archivo main.js
RUN yarn build


# Dar permiso para ejecutar la applicación
# Y se crea un nuevo usuario, se desbilta el password  pokeruser
# o cualquier otro nombre.
RUN adduser --disabled-password pokeuser
# se l da acceso a ese usuario "pokeuser" unicamente a ese directorio
RUN chown -R pokeuser:pokeuser /var/www/pokedex
# usamos el usuario que creamos.
USER pokeuser

# Limpiar el caché
RUN yarn cache clean --force

# Se expone el puerto 3000 por defecto
EXPOSE 3000


#cuando termone todo el proceso anterio ejecute el comando yarn start 
# para mi aolicacion de node.
CMD [ "yarn","start" ]s

# quiero que mi aplicacio tenga la base de datos y mi aplicacion de nest 
#, manteinedola jintas para que sea  parte de la imagen,
# cuando esta se dockarice ("cundo se einicio").
# Cunstruyamos la imagen.
 
 