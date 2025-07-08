## Instalaciones 
* Modulos node para la utilizacion de un proyecto : ___npm install__
* Iconos : ___npm install react-icons --save___
* Zustand ' Gestor de estado ' : ___npm install zustand__
* Toast : ___npm install react-hot-toast__
* TailWind Estilos condicionales : ___npm install clsx___
* Slide : ___npm install swiper___
* Auth.Js : __npm install next-auth@beta__
* Popup - Tooltip - Modal : ___ npm install reactjs-popup --save-_
* Node "para ejecutar Seed " : ___npm install -D ts-node__
* ts-config "Para isntalar el archivo tsconfig.json en el directorio del seed  para poder ejecutar el Seed ": ___npx tsc --init__
* Prisma Client : ___npx prisma generate__
* Zod de next-auth se utiliza para definir y validar esquemas de datos : __npm i zod__
* Para la encriptación de contraseñas usaremos : __npm i bcryptjs__ esta no tiene archivo de typeScritp entonces para el archivo de definicion usamos : __npm i -D @types/bcryptjs__
* Manejo de formularios : __npm install react-hook-form__
* Cloudinary "Servidor para imagenes " : ___npm install cloudinary__
* Pusher "Actualizaciones en tiempo real " :

# Run dev

1. Clonar el directorio 
2. Crear una copia del ```.env.tamplate``` y renonbralo a  ```.env``` y cambiar las variables de entorno
3. Instalar dependencias ```npm install```
4. Levantar la base de datos ```docker compose up -d```
5. Correr las migraciones de prisma ```npx prisma migrate dev --name init```
6. Ejecutar seed ```npm run seed``
7. Correr el proyecto ``` npm run dev ```

# Run Production

1. 