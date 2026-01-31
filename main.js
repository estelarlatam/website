// REALITY App Clone - Main JavaScript
class RealityApp {
    constructor() {
        this.currentFilter = 'all';
        this.currentSort = 'recent';
        this.isLoading = false;
        this.page = 1;
        this.mockData = [];
        this.filteredData = [];
        
        this.init();
    }
    
    init() {
        this.generateMockData();
        this.setupEventListeners();
        this.initializeAnimations();
        this.initializeParticles();
        this.renderContent();
        this.setupInfiniteScroll();
    }
    
    generateMockData() {
        const creators = [
            { name: 'CyberNinja', avatar: 'resources/avatar-collection.jpg', verified: true },
            { name: 'PixelQueen', avatar: 'resources/avatar-collection.jpg', verified: true },
            { name: 'StreamMaster', avatar: 'resources/avatar-collection.jpg', verified: false },
            { name: 'GameHunter', avatar: 'resources/avatar-collection.jpg', verified: true },
            { name: 'ArtCreator', avatar: 'resources/avatar-collection.jpg', verified: false },
            { name: 'TechGamer', avatar: 'resources/avatar-collection.jpg', verified: true }
        ];
        
        const categories = ['gaming', 'art', 'music', 'tech', 'lifestyle'];
        const types = ['live', 'video', 'image'];
        const badges = ['live', 'rare', 'new', 'trending', 'epic'];
        
        const titles = [
            'Epic Gaming Moments Compilation',
            'Digital Art Creation Process',
            'Live Coding Session - Building a Game',
            'VR Gaming Experience',
            'Anime Drawing Tutorial',
            'Esports Tournament Highlights',
            'Retro Gaming Review',
            '3D Modeling Timelapse',
            'Gaming Setup Tour',
            'Live Music Production',
            'Cyberpunk Art Showcase',
            'Game Development Insights',
            'Virtual Reality Chat',
            'Pixel Art Masterclass',
            'Gaming News Update'
        ];
        
        const descriptions = [
            'Check out these incredible gaming moments from the latest tournament!',
            'Watch me create stunning digital art from start to finish.',
            'Join me for a live coding session where we build an amazing game.',
            'Experience the future of gaming with immersive VR gameplay.',
            'Learn how to draw your favorite anime characters step by step.',
            'The best moments from this week\'s esports championship.',
            'Discover classic games and their impact on modern gaming.',
            'See how I create detailed 3D models in this timelapse video.',
            'Tour my ultimate gaming setup with all the latest tech.',
            'Live music production session - creating beats from scratch.',
            'Showcasing beautiful cyberpunk-inspired digital artwork.',
            'Insights and tips from professional game developers.',
            'Join our virtual reality chat room for fun conversations.',
            'Master the art of pixel art with these professional techniques.',
            'Latest news and updates from the gaming industry.'
        ];
        
        for (let i = 0; i < 50; i++) {
            const creator = creators[Math.floor(Math.random() * creators.length)];
            const type = types[Math.floor(Math.random() * types.length)];
            const category = categories[Math.floor(Math.random() * categories.length)];
            const badgeCount = Math.floor(Math.random() * 3) + 1;
            const itemBadges = [];
            
            for (let j = 0; j < badgeCount; j++) {
                const badge = badges[Math.floor(Math.random() * badges.length)];
                if (!itemBadges.includes(badge)) {
                    itemBadges.push(badge);
                }
            }
            
            this.mockData.push({
                id: `content-${i}`,
                type: type,
                title: titles[Math.floor(Math.random() * titles.length)],
                description: descriptions[Math.floor(Math.random() * descriptions.length)],
                thumbnail: 'resources/thumbnails-collection.jpg',
                author: creator,
                stats: {
                    views: Math.floor(Math.random() * 100000) + 1000,
                    likes: Math.floor(Math.random() * 50000) + 500,
                    comments: Math.floor(Math.random() * 5000) + 100
                },
                badges: itemBadges,
                timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
                category: category
            });
        }
        
        // Sort by timestamp (newest first)
        this.mockData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
    
    setupEventListeners() {
        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const mobileOverlay = document.getElementById('mobile-overlay');
        const sidebar = document.getElementById('sidebar');
        
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
                mobileOverlay.classList.toggle('hidden');
            });
        }
        
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', () => {
                sidebar.classList.remove('open');
                mobileOverlay.classList.add('hidden');
            });
        }
        
        // User menu toggle
        const userMenuToggle = document.getElementById('user-menu-toggle');
        const userDropdown = document.getElementById('user-dropdown');
        
        if (userMenuToggle) {
            userMenuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                userDropdown.classList.toggle('hidden');
            });
        }
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            if (userDropdown && !userDropdown.classList.contains('hidden')) {
                userDropdown.classList.add('hidden');
            }
        });
        
        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
        
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilter(e.target.textContent.toLowerCase());
                
                // Update active state
                filterButtons.forEach(b => b.classList.remove('active', 'bg-purple-600'));
                e.target.classList.add('active', 'bg-purple-600');
            });
        });
        
        // Modal functionality
        const closeModal = document.getElementById('close-modal');
        const contentModal = document.getElementById('content-modal');
        
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                this.closeModal();
            });
        }
        
        if (contentModal) {
            contentModal.addEventListener('click', (e) => {
                if (e.target === contentModal) {
                    this.closeModal();
                }
            });
        }
    }
    
    initializeAnimations() {
        // Initialize typed text animation
        const typedElement = document.getElementById('typed-text');
        if (typedElement) {
            new Typed('#typed-text', {
                strings: [
                    'Bienvenido a REALITY',
                    'Descubre Contenido Único',
                    'Conecta con Creadores',
                    'Comparte tu Pasión'
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
        
        // Animate navigation items on load
        const navItems = document.querySelectorAll('.nav-item');
        anime({
            targets: navItems,
            translateX: [-50, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            duration: 800,
            easing: 'easeOutExpo'
        });
        
        // Animate hero section
        anime({
            targets: '.hero-section h2',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1000,
            delay: 500,
            easing: 'easeOutExpo'
        });
    }
    
    initializeParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;
        
        const app = new PIXI.Application({
            view: canvas,
            width: window.innerWidth,
            height: window.innerHeight,
            transparent: true,
            antialias: true
        });
        
        const particles = [];
        const particleCount = 50;
        
        // Create particle container
        const particleContainer = new PIXI.Container();
        app.stage.addChild(particleContainer);
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            const particle = new PIXI.Graphics();
            particle.beginFill(0x6B46C1, 0.3);
            particle.drawCircle(0, 0, Math.random() * 3 + 1);
            particle.endFill();
            
            particle.x = Math.random() * app.screen.width;
            particle.y = Math.random() * app.screen.height;
            particle.vx = (Math.random() - 0.5) * 0.5;
            particle.vy = (Math.random() - 0.5) * 0.5;
            
            particles.push(particle);
            particleContainer.addChild(particle);
        }
        
        // Animate particles
        app.ticker.add(() => {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around screen
                if (particle.x < 0) particle.x = app.screen.width;
                if (particle.x > app.screen.width) particle.x = 0;
                if (particle.y < 0) particle.y = app.screen.height;
                if (particle.y > app.screen.height) particle.y = 0;
                
                // Fade effect
                particle.alpha = 0.3 + Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.2;
            });
        });
        
        // Handle resize
        window.addEventListener('resize', () => {
            app.renderer.resize(window.innerWidth, window.innerHeight);
        });
    }
    
    handleSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (searchTerm === '') {
            this.filteredData = [...this.mockData];
        } else {
            this.filteredData = this.mockData.filter(item => 
                item.title.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm) ||
                item.author.name.toLowerCase().includes(searchTerm) ||
                item.category.toLowerCase().includes(searchTerm)
            );
        }
        
        this.renderContent();
    }
    
    handleFilter(filterType) {
        this.currentFilter = filterType;
        
        if (filterType === 'todo') {
            this.filteredData = [...this.mockData];
        } else {
            const filterMap = {
                'en vivo': 'live',
                'videos': 'video',
                'arte': 'art',
                'juegos': 'gaming',
                'música': 'music'
            };
            
            const mappedFilter = filterMap[filterType] || filterType;
            
            this.filteredData = this.mockData.filter(item => {
                if (filterType === 'en vivo') return item.badges.includes('live');
                if (filterType === 'videos') return item.type === 'video';
                return item.category === mappedFilter || item.type === mappedFilter;
            });
        }
        
        this.renderContent();
    }
    
    renderContent() {
        const contentGrid = document.getElementById('content-grid');
        if (!contentGrid) return;
        
        // Clear existing content
        contentGrid.innerHTML = '';
        
        // Show loading skeleton briefly
        this.showLoadingSkeleton();
        
        setTimeout(() => {
            // Render content cards
            const cardsToShow = this.filteredData.slice(0, 20);
            
            cardsToShow.forEach((item, index) => {
                const card = this.createContentCard(item);
                contentGrid.appendChild(card);
                
                // Animate card entrance
                anime({
                    targets: card,
                    translateY: [50, 0],
                    opacity: [0, 1],
                    delay: index * 50,
                    duration: 600,
                    easing: 'easeOutExpo'
                });
            });
        }, 500);
    }
    
    showLoadingSkeleton() {
        const contentGrid = document.getElementById('content-grid');
        const skeletonCount = 6;
        
        for (let i = 0; i < skeletonCount; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'masonry-item';
            skeleton.innerHTML = `
                <div class="bg-slate-800 rounded-xl overflow-hidden">
                    <div class="skeleton h-48 w-full"></div>
                    <div class="p-4">
                        <div class="skeleton h-4 w-3/4 rounded mb-2"></div>
                        <div class="skeleton h-3 w-1/2 rounded mb-3"></div>
                        <div class="skeleton h-3 w-full rounded mb-2"></div>
                        <div class="skeleton h-3 w-2/3 rounded"></div>
                    </div>
                </div>
            `;
            contentGrid.appendChild(skeleton);
        }
    }
    
    createContentCard(item) {
        const card = document.createElement('div');
        card.className = 'masonry-item';
        
        const formattedViews = this.formatNumber(item.stats.views);
        const formattedLikes = this.formatNumber(item.stats.likes);
        const formattedComments = this.formatNumber(item.stats.comments);
        const timeAgo = this.getTimeAgo(item.timestamp);
        
        const badgeColors = {
            'live': 'bg-red-500',
            'rare': 'bg-blue-500',
            'new': 'bg-green-500',
            'trending': 'bg-orange-500',
            'epic': 'bg-purple-500'
        };
        
        const badgeIcons = {
            'live': '●',
            'rare': '◆',
            'new': '✨',
            'trending': '🔥',
            'epic': '👑'
        };
        
        card.innerHTML = `
            <div class="card-hover bg-slate-800 rounded-xl overflow-hidden cursor-pointer" data-content-id="${item.id}">
                <!-- Thumbnail -->
                <div class="relative">
                    <img src="${item.thumbnail}" alt="${item.title}" class="w-full h-48 object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    <!-- Badges -->
                    <div class="absolute top-3 left-3 flex flex-wrap gap-2">
                        ${item.badges.map(badge => `
                            <span class="${badgeColors[badge]} text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1 ${badge === 'live' ? 'live-badge' : ''}">
                                <span>${badgeIcons[badge]}</span>
                                <span class="capitalize">${badge}</span>
                            </span>
                        `).join('')}
                    </div>
                    
                    <!-- Type Indicator -->
                    <div class="absolute top-3 right-3">
                        ${item.type === 'video' ? `
                            <div class="bg-black/50 text-white p-2 rounded-full">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                        ` : ''}
                    </div>
                    
                    <!-- Duration (for videos) -->
                    ${item.type === 'video' ? `
                        <div class="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            ${Math.floor(Math.random() * 30) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}
                        </div>
                    ` : ''}
                </div>
                
                <!-- Content Info -->
                <div class="p-4">
                    <!-- Author -->
                    <div class="flex items-center space-x-3 mb-3">
                        <img src="${item.author.avatar}" alt="${item.author.name}" class="w-8 h-8 rounded-full object-cover">
                        <div class="flex-1">
                            <div class="flex items-center space-x-2">
                                <span class="text-white font-medium text-sm">${item.author.name}</span>
                                ${item.author.verified ? `
                                    <svg class="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                    </svg>
                                ` : ''}
                            </div>
                            <p class="text-slate-400 text-xs">${timeAgo}</p>
                        </div>
                    </div>
                    
                    <!-- Title -->
                    <h3 class="text-white font-semibold mb-2 line-clamp-2">${item.title}</h3>
                    
                    <!-- Description -->
                    <p class="text-slate-400 text-sm mb-3 line-clamp-2">${item.description}</p>
                    
                    <!-- Stats -->
                    <div class="flex items-center justify-between text-slate-400 text-sm">
                        <div class="flex items-center space-x-4">
                            <span class="flex items-center space-x-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                </svg>
                                <span>${formattedViews}</span>
                            </span>
                            <span class="flex items-center space-x-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                </svg>
                                <span>${formattedLikes}</span>
                            </span>
                            <span class="flex items-center space-x-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                </svg>
                                <span>${formattedComments}</span>
                            </span>
                        </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
                        <div class="flex items-center space-x-2">
                            <button class="like-btn flex items-center space-x-2 px-3 py-1 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                </svg>
                                <span>Me gusta</span>
                            </button>
                            
                            <button class="share-btn flex items-center space-x-2 px-3 py-1 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-700 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                                </svg>
                                <span>Compartir</span>
                            </button>
                        </div>
                        
                        <button class="save-btn text-slate-400 hover:text-yellow-400 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add click event for card
        const cardElement = card.querySelector('.card-hover');
        cardElement.addEventListener('click', () => {
            this.openModal(item);
        });
        
        // Add click events for action buttons
        const likeBtn = card.querySelector('.like-btn');
        const shareBtn = card.querySelector('.share-btn');
        const saveBtn = card.querySelector('.save-btn');
        
        likeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleLike(likeBtn, item);
        });
        
        shareBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleShare(item);
        });
        
        saveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleSave(saveBtn, item);
        });
        
        return card;
    }
    
    handleLike(button, item) {
        const icon = button.querySelector('svg');
        const isLiked = button.classList.contains('text-red-400');
        
        if (isLiked) {
            button.classList.remove('text-red-400');
            button.classList.add('text-slate-400');
            icon.setAttribute('fill', 'none');
            this.showToast('Me gusta eliminado', 'info');
        } else {
            button.classList.remove('text-slate-400');
            button.classList.add('text-red-400');
            icon.setAttribute('fill', 'currentColor');
            this.showToast('¡Agregado a me gusta!', 'success');
            
            // Animate like
            anime({
                targets: button,
                scale: [1, 1.2, 1],
                duration: 300,
                easing: 'easeOutElastic(1, .8)'
            });
        }
    }
    
    handleShare(item) {
        if (navigator.share) {
            navigator.share({
                title: item.title,
                text: item.description,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.showToast('Enlace copiado al portapapeles', 'success');
            });
        }
    }
    
    handleSave(button, item) {
        const isSaved = button.classList.contains('text-yellow-400');
        
        if (isSaved) {
            button.classList.remove('text-yellow-400');
            button.classList.add('text-slate-400');
            this.showToast('Eliminado de guardados', 'info');
        } else {
            button.classList.remove('text-slate-400');
            button.classList.add('text-yellow-400');
            this.showToast('¡Guardado!', 'success');
            
            // Animate save
            anime({
                targets: button,
                scale: [1, 1.2, 1],
                duration: 300,
                easing: 'easeOutElastic(1, .8)'
            });
        }
    }
    
    openModal(item) {
        const modal = document.getElementById('content-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('modal-content');
        
        modalTitle.textContent = item.title;
        
        modalContent.innerHTML = `
            <div class="aspect-video bg-slate-700 rounded-lg mb-4 overflow-hidden">
                <img src="${item.thumbnail}" alt="${item.title}" class="w-full h-full object-cover">
            </div>
            
            <div class="flex items-center space-x-4 mb-4">
                <img src="${item.author.avatar}" alt="${item.author.name}" class="w-12 h-12 rounded-full object-cover">
                <div>
                    <h4 class="text-white font-semibold">${item.author.name}</h4>
                    <p class="text-slate-400 text-sm">${item.author.verified ? 'Creador verificado' : 'Creador'}</p>
                </div>
            </div>
            
            <p class="text-slate-300 mb-4">${item.description}</p>
            
            <div class="flex items-center justify-between text-slate-400 mb-6">
                <span>${this.formatNumber(item.stats.views)} visualizaciones</span>
                <span>${this.getTimeAgo(item.timestamp)}</span>
            </div>
            
            <div class="flex items-center space-x-4">
                <button class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors">
                    Seguir Creador
                </button>
                <button class="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                    Compartir
                </button>
            </div>
        `;
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Animate modal entrance
        anime({
            targets: modal.querySelector('.glass-effect'),
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutExpo'
        });
    }
    
    closeModal() {
        const modal = document.getElementById('content-modal');
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
    
    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        
        const colors = {
            'success': 'bg-green-600',
            'error': 'bg-red-600',
            'info': 'bg-blue-600',
            'warning': 'bg-yellow-600'
        };
        
        toast.className = `${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300`;
        toast.innerHTML = `
            <div class="flex items-center space-x-2">
                <span>${message}</span>
                <button class="ml-2 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            toast.classList.add('translate-x-full');
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }, 3000);
    }
    
    setupInfiniteScroll() {
        let isLoading = false;
        
        window.addEventListener('scroll', () => {
            if (isLoading) return;
            
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            
            if (scrollTop + clientHeight >= scrollHeight - 1000) {
                isLoading = true;
                this.loadMoreContent();
                
                setTimeout(() => {
                    isLoading = false;
                }, 1000);
            }
        });
    }
    
    loadMoreContent() {
        const loadingIndicator = document.getElementById('loading-indicator');
        loadingIndicator.classList.remove('hidden');
        
        setTimeout(() => {
            const currentCount = document.querySelectorAll('.masonry-item').length;
            const newItems = this.filteredData.slice(currentCount, currentCount + 10);
            
            const contentGrid = document.getElementById('content-grid');
            
            newItems.forEach((item, index) => {
                const card = this.createContentCard(item);
                contentGrid.appendChild(card);
                
                // Animate new cards
                anime({
                    targets: card,
                    translateY: [50, 0],
                    opacity: [0, 1],
                    delay: index * 100,
                    duration: 600,
                    easing: 'easeOutExpo'
                });
            });
            
            loadingIndicator.classList.add('hidden');
        }, 1000);
    }
    
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
    
    getTimeAgo(timestamp) {
        const now = new Date();
        const time = new Date(timestamp);
        const diffInSeconds = Math.floor((now - time) / 1000);
        
        if (diffInSeconds < 60) {
            return 'hace un momento';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
        } else if (diffInSeconds < 2592000) {
            const days = Math.floor(diffInSeconds / 86400);
            return `hace ${days} ${days === 1 ? 'día' : 'días'}`;
        } else {
            const months = Math.floor(diffInSeconds / 2592000);
            return `hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RealityApp();
});

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    // Update particle canvas size
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            this.style.filter = 'grayscale(100%)';
        });
    });
});

// Performance optimization: Lazy load images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});