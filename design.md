# Diseño Visual - Reality App Clone

## Identidad Visual

### Paleta de Colores
- **Color Principal**: Deep Purple (#6B46C1) - Inspirado en el universo gaming/streaming
- **Color Secundario**: Electric Blue (#3B82F6) - Para acentos y elementos interactivos
- **Color de Fondo**: Dark Slate (#0F172A) - Fondo principal oscuro
- **Color de Superficie**: Slate-800 (#1E293B) - Tarjetas y elementos elevados
- **Texto Principal**: White (#FFFFFF)
- **Texto Secundario**: Slate-300 (#CBD5E1)

### Tipografía
- **Fuente Principal**: 'Inter' - Sans-serif moderna para títulos y texto principal
- **Fuente Secundaria**: 'JetBrains Mono' - Monospace para datos técnicos y estadísticas
- **Jerarquía**: 
  - H1: 2.5rem, bold, tracking-tight
  - H2: 2rem, semibold
  - H3: 1.5rem, medium
  - Body: 1rem, regular
  - Small: 0.875rem, medium

### Sistema de Sombras
- **Sombra Ligera**: shadow-lg (0 10px 15px -3px rgba(0, 0, 0, 0.1))
- **Sombra Media**: shadow-xl (0 20px 25px -5px rgba(0, 0, 0, 0.1))
- **Sombra Pesada**: shadow-2xl (0 25px 50px -12px rgba(0, 0, 0, 0.25))

## Elementos de UI

### Tarjetas de Contenido
- **Border Radius**: 1rem (16px)
- **Padding**: 1.5rem (24px)
- **Background**: Slate-800 con gradiente sutil
- **Hover State**: Escala 1.02x, sombra aumentada, borde luminoso

### Badges y Etiquetas
- **Rarity Common**: Gray-500 badge
- **Rarity Rare**: Blue-500 badge  
- **Rarity Epic**: Purple-500 badge
- **Rarity Legendary**: Yellow-500 badge con brillo
- **Live Badge**: Red-500 con pulso animado
- **New Badge**: Green-500 con brillo

### Botones
- **Primary**: Gradient purple-to-blue, hover:scale-105
- **Secondary**: Transparent con borde, hover:bg-slate-700
- **Icon Button**: Circular, hover:bg-slate-700, active:scale-95

## Efectos Visuales

### Animaciones Core
- **Anime.js**: Para animaciones de entrada de tarjetas
- **Splitting.js**: Para efectos de texto en headers
- **ECharts.js**: Para visualizaciones de estadísticas
- **Pixi.js**: Para efectos de partículas en background

### Efectos de Fondo
- **Gradiente Animado**: CSS gradient que se mueve lentamente
- **Partículas**: Sistema de partículas sutiles con Pixi.js
- **Aurora Effect**: Efecto de aurora en el header

### Micro-interacciones
- **Botones**: Scale + glow effect
- **Tarjetas**: Lift + shadow expand
- **Badges**: Color pulse para elementos "Live"
- **Iconos**: Rotate/scale en hover

## Layout y Espaciado

### Grid System
- **Desktop**: 12-column grid con sidebar fijo
- **Tablet**: 8-column grid, sidebar colapsable
- **Mobile**: Single column, bottom navigation

### Espaciado Consistente
- **XS**: 0.5rem (8px)
- **SM**: 1rem (16px)
- **MD**: 1.5rem (24px)
- **LG**: 2rem (32px)
- **XL**: 3rem (48px)

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## Componentes Específicos

### Header
- **Height**: 80px
- **Background**: Glassmorphism con backdrop-blur
- **Logo**: Custom SVG con animación de brillo
- **Search Bar**: Expandible con focus states

### Sidebar
- **Width**: 280px (desktop), 100% (mobile overlay)
- **Background**: Slate-900 con borde derecho
- **Items**: Padding 12px 24px, hover:bg-slate-800

### Cards
- **Aspect Ratio**: 16:9 para thumbnails
- **Image Overlay**: Gradient bottom-to-top para legibilidad
- **Content Layout**: Flexbox con espaciado consistente

## Responsive Design

### Mobile-First
- **Prioridad**: Funcionalidad sobre decoración
- **Touch Targets**: Mínimo 44px
- **Gestures**: Swipe para navegación lateral

### Adaptación Progresiva
- **Core**: Funcionalidad básica en todos los dispositivos
- **Enhancement**: Efectos visuales en dispositivos más potentes
- **Performance**: Lazy loading de imágenes y efectos

## Accesibilidad

### Contraste
- **Texto normal**: 4.5:1 mínimo
- **Texto grande**: 3:1 mínimo
- **Estados interactivos**: Siempre visibles

### Focus States
- **Outline**: 2px solid blue-400
- **Offset**: 2px del elemento
- **Todos los elementos interactivos**: Focus visible