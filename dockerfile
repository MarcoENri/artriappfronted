# Etapa de construcción
FROM node:18 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Genera la aplicación frontend
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Establece el directorio de trabajo en la carpeta de Nginx donde se sirven los archivos
WORKDIR /usr/share/nginx/html

# Elimina los archivos por defecto de Nginx
RUN rm -rf ./*

# Copia los archivos generados en la etapa de construcción
COPY --from=build /app/dist ./ 

# Copia el archivo de configuración principal de Nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copia configuraciones adicionales si las tienes
COPY nginx/conf.d/ /etc/nginx/conf.d/

# Expone el puerto 80
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
