# MAOR - Centro de Belleza

Sistema de gestión para el Centro de Belleza MAOR en Sincelejo.

## Características

- Panel administrativo completo
- Gestión de clientes
- Gestión de citas
- Gestión de empleados
- Control de ventas
- Inventario de productos
- Servicios ofrecidos
- Reportes y estadísticas
- Chat interno

## Requisitos previos

- Node.js (v14 o superior)
- npm o yarn
- PostgreSQL (v12 o superior)

## Configuración del entorno

1. Clonar el repositorio:
```bash
git clone https://github.com/your-username/maor-app.git
cd maor-app
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
```

3. Crear archivo de variables de entorno:
```bash
cp .env.example .env
```

4. Configurar las variables de entorno en el archivo `.env`:
```env
REACT_APP_API_URL=http://localhost:3001
```

## Ejecución del proyecto

### Desarrollo

```bash
npm start
# o
yarn start
```

La aplicación estará disponible en `http://localhost:3000`

### Producción

1. Construir la aplicación:
```bash
npm run build
# o
yarn build
```

2. Los archivos de producción estarán en la carpeta `build`

## Estructura del proyecto

```
src/
├── assets/
│   └── styles/
│       └── global.css
├── components/
│   └── admin/
│       ├── base/
│       │   └── BasePage.tsx
│       ├── customers/
│       │   └── CustomerModal.tsx
│       ├── dashboard/
│       │   └── Dashboard.tsx
│       ├── layout/
│       │   └── AdminLayout.tsx
│       └── menu/
│           └── menu.tsx
├── config/
│   └── toastConfig.ts
├── pages/
│   └── admin/
│       ├── AdminPage.tsx
│       ├── CustomersPage.tsx
│       └── ...
├── services/
│   ├── customerService.ts
│   └── dashboardService.ts
└── App.tsx
```

## Base de datos

El sistema utiliza PostgreSQL con la siguiente estructura:

### Tablas principales:
- customers (Clientes)
- employees (Empleados)
- appointments (Citas)
- products (Productos)
- services (Servicios)
- invoices (Facturas)

### Estados:
- product_status: active, deleted, discontinued, out_of_stock
- invoice_status: draft, pending, paid, cancelled, refunded
- appointment_status: scheduled, completed, cancelled, no_show

## Contribución

1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Contacto

Tu Nombre - [@tutwitter](https://twitter.com/tutwitter) - email@example.com

Link del proyecto: [https://github.com/your-username/maor-app](https://github.com/your-username/maor-app)
#   M a o r A p p  
 