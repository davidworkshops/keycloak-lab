# Angular + Keycloak Lab

Aplicacion Angular standalone que usa `keycloak-angular` y `keycloak-js` con
Authorization Code Flow y PKCE (`S256`).

## Requisitos

- Node.js 20.19 o superior.
- Docker.
- Puertos `4200` y `8080` disponibles.

## 1. Ejecutar Keycloak

```bash
docker run --name keycloak-angular-lab --rm -p 8080:8080 \
  -e KC_BOOTSTRAP_ADMIN_USERNAME=admin \
  -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:26.2.4 start-dev
```

Abre `http://localhost:8080` y entra en la consola de administracion con
`admin` / `admin`.

## 2. Configurar el realm y el cliente

1. Crea el realm `angular-lab`.
2. En **Clients**, crea un cliente OpenID Connect con Client ID `angular-client`.
3. Activa **Standard flow**.
4. Desactiva **Client authentication**. Es un cliente publico y no usa secretos.
5. Configura **Valid redirect URIs** como `http://localhost:4200/*`.
6. Configura **Valid post logout redirect URIs** como `http://localhost:4200/*`.
7. Configura **Web origins** como `http://localhost:4200`.
8. En la configuracion avanzada del cliente, establece **PKCE method** en `S256`.

## 3. Crear roles y usuarios

1. Crea un realm role llamado `admin`, o un client role `admin` dentro de
   `angular-client`. El guard admite ambas opciones.
2. Crea al menos un usuario de prueba y asignale una contrasena no temporal.
3. Asigna el rol `admin` al usuario que deba acceder a `/admin`.
4. Asegurate de informar `username` y `email` para visualizarlos en `/profile`.

## 4. Ejecutar Angular

```bash
npm install
npm start
```

Abre `http://localhost:4200`.

## Rutas

- `/public`: acceso anonimo.
- `/profile`: requiere autenticacion y muestra username, email, roles y una
  version parcial del access token.
- `/admin`: requiere autenticacion y el rol `admin`.

La configuracion de Keycloak esta en `src/app/app.config.ts`:

```text
url: http://localhost:8080
realm: angular-lab
clientId: angular-client
```

No existe ningun secreto de cliente en la aplicacion. El navegador realiza el
Authorization Code Flow con PKCE y el cliente de Keycloak debe permanecer
configurado como publico.
