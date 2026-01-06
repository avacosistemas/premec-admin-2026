import { WelcomeSection } from './welcome.types';

export const WELCOME_DATA: WelcomeSection[] = [
    {
        title: 'Gestión de Contenidos',
        items: [
            {
                title: 'Contenidos',
                description: 'Administra artículos, noticias y páginas institucionales.',
                icon: 'heroicons_outline:document-text',
                route: '/contenido',
                color: 'primary'
            },
            {
                title: 'Revistas Digitales',
                description: 'Gestión de ediciones de revistas y sus artículos.',
                icon: 'heroicons_outline:book-open',
                route: '/Revistas',
                color: 'primary'
            },
            {
                title: 'Noticias Carrousel',
                description: 'Configura las noticias destacadas del home.',
                icon: 'heroicons_outline:document',
                route: '/noticiaCarrousel',
                color: 'indigo'
            },
            {
                title: 'Secciones',
                description: 'Estructura del sitio y agrupación de contenidos.',
                icon: 'heroicons_outline:squares-2x2',
                route: '/seccion',
                color: 'indigo'
            },
            {
                title: 'Banners',
                description: 'Publicidad y banners rotativos.',
                icon: 'heroicons_outline:photo',
                route: '/banner',
                color: 'purple'
            },
            {
                title: 'Modal Home',
                description: 'Ventanas emergentes para avisos importantes.',
                icon: 'heroicons_outline:window',
                route: '/modalHome',
                color: 'purple'
            }
        ]
    },
    {
        title: 'Matrículas y Personas',
        items: [
            {
                title: 'Búsqueda de Contactos',
                description: 'Gestión centralizada de personas y matriculados.',
                icon: 'heroicons_outline:identification',
                route: '/identificacionBusqueda',
                color: 'teal'
            },
            {
                title: 'Prematriculación',
                description: 'Bandeja de entrada de trámites de prematriculación.',
                icon: 'heroicons_outline:clipboard-document-check', // Icono sugerido
                route: '/prematriculacion',
                color: 'teal'
            },
            {
                title: 'Solicitudes de Fotos',
                description: 'Aprobación de nuevas fotos de perfil.',
                icon: 'heroicons_outline:camera', // Icono basado en el contexto
                route: '/contactImageTemp',
                color: 'cyan'
            },
            {
                title: 'Certificados',
                description: 'Historial y emisión de certificados.',
                icon: 'heroicons_outline:document-check', // Icono sugerido
                route: '/CertificadoMatriculado',
                color: 'cyan'
            }
        ]
    },
    {
        title: 'Comunicación',
        items: [
            {
                title: 'Campañas de Mailing',
                description: 'Envíos masivos y seguimiento.',
                icon: 'heroicons_outline:at-symbol',
                route: '/mailing',
                color: 'sky'
            },
            {
                title: 'Boletines',
                description: 'Armado y distribución de newsletters.',
                icon: 'heroicons_outline:envelope',
                route: '/boletin',
                color: 'sky'
            },
            {
                title: 'Listas de Contactos',
                description: 'Segmentación de audiencias.',
                icon: 'heroicons_outline:users',
                route: '/ContactList',
                color: 'blue'
            },
            {
                title: 'Plantillas de Mensajes',
                description: 'Configuración de templates de email del sistema.',
                icon: 'heroicons_outline:envelope-open',
                route: '/messageTemplate',
                color: 'blue'
            }
        ]
    },
    {
        title: 'Ventas y Finanzas',
        items: [
            {
                title: 'Operaciones',
                description: 'Listado general de ventas y transacciones.',
                icon: 'heroicons_outline:ticket',
                route: '/ventas',
                color: 'green'
            },
            {
                title: 'Productos',
                description: 'Catálogo de productos a la venta.',
                icon: 'heroicons_outline:archive-box',
                route: '/Producto',
                color: 'green'
            },
            {
                title: 'Cuotas Generales',
                description: 'Configuración de valores y periodos.',
                icon: 'heroicons_outline:receipt-percent',
                route: '/cuotasGeneral',
                color: 'emerald'
            },
            {
                title: 'Categorías Venta',
                description: 'Clasificación de productos.',
                icon: 'heroicons_outline:squares-2x2',
                route: '/Categoria',
                color: 'emerald'
            }
        ]
    },
    {
        title: 'Interacción y Herramientas',
        items: [
            {
                title: 'Formularios',
                description: 'Creador de formularios dinámicos.',
                icon: 'heroicons_outline:clipboard-document-list',
                route: '/formulario',
                color: 'orange'
            },
            {
                title: 'Inscriptos (Respuestas)',
                description: 'Ver inscriptos y respuestas de formularios.',
                icon: 'heroicons_outline:user-group', // Icono sugerido
                route: '/formResponse',
                color: 'orange'
            },
            {
                title: 'Carga Masiva',
                description: 'Herramienta para importación de archivos.',
                icon: 'heroicons_outline:cloud-arrow-up',
                route: '/upload-files',
                color: 'amber'
            },
            {
                title: 'Banco de Imágenes',
                description: 'Repositorio central de imágenes.',
                icon: 'heroicons_outline:photo',
                route: '/imagen',
                color: 'amber'
            }
        ]
    },
    {
        title: 'Análisis y Sistema',
        items: [
            {
                title: 'Estadísticas',
                description: 'Panel general de métricas (Matrículas, Contenidos).',
                icon: 'heroicons_outline:chart-pie',
                route: '/estadisticasMatriculas',
                color: 'rose'
            },
            {
                title: 'Usuarios Admin',
                description: 'Gestión de usuarios del sistema.',
                icon: 'heroicons_outline:user-group',
                route: '/userAdmin',
                color: 'slate'
            },
            {
                title: 'Roles y Permisos',
                description: 'Configuración de seguridad y accesos.',
                icon: 'heroicons_outline:lock-closed',
                route: '/permiso',
                color: 'slate'
            },
            {
                title: 'Cuentas de Correo',
                description: 'Configuración de remitentes SMTP.',
                icon: 'heroicons_outline:at-symbol',
                route: '/emailAccount',
                color: 'slate'
            }
        ]
    }
];