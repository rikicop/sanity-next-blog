## About Enviroment Variables

- Van en el frontend

- Hiciste un BackUp en pcloud en Documents en enviromental_vars
  bajo el nombre de "sanity-project-comments"

## Chronology

Chronology according to yt video:

https://www.youtube.com/watch?v=NzUNMUHxvZ4

- 9:18 - [Schema](#comment-schema)

- 17:26 - [Reference](#reference)

Puedo tratar al post como un tipo más, por que ya lo había creado en el schema anteriomente.

- 18:06 - [Schema](#import-schema)
  Import de comment.js en schema.js
- [Logo](#estético)

  Puedes cambiar el brand-logo de tu proyecto. (styling sanity studio)

- [Token](#create-token)

  - Para insertar datos de Sanity.io por medio del cliente de sanity, necesitas un token.
    - Para crear un token, necesitas ir sanity manager a la pestana de Api y después a token para crear un token(con write permitions por que vas a insertar datos).

- [Env](#env-variables)

      - Env variables para configurar tu proyecto.

      - NEXT_PUBLIC_SANITY_PROJECT_ID
      - SANITY_API_TOKEN
      - SANITY_PREVIEW_SECRET

      Hiciste un BackUp en pcloud en Documents en enviromental_vars
      bajo el nombre de "sanity-project-comments"

- 17:26 - [Sanity.js](#sanity-js)

  - Crear en el frontend lib/sanity.js

  - Instala el cliente de sanity.js -> @sanity/client

- 36:00 - [Form](#form)

  - 49:48 Creación del submit del formulario
  - 53:20 Create comment function
  - 1:00:00 Traer los datos del formulario a la Api de Next.js
  - Create createComment.js

## About The Architecture

- lib/api.js -> Aquí están los queries para manejar los datos.

- pages/api/createComment.js -> Aquí se crea el comentario, enviando datos a sanity.io, incluyendo el token de la API.

- lib/sanity.js -> Aquí se realiza la configuración necesaria para la conexión con la Api de sanity.io. a través del cliente sanity/client.
