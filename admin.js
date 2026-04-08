/* ===================================
   ADMIN PANEL JAVASCRIPT
   =================================== */

// ===================================
// DATA STORAGE (localStorage)
// ===================================
const Storage = {
    getPosts() {
        const posts = localStorage.getItem('parra_blog_posts');
        return posts ? JSON.parse(posts) : this.getDefaultPosts();
    },
    
    savePosts(posts) {
        localStorage.setItem('parra_blog_posts', JSON.stringify(posts));
    },
    
    getCategories() {
        const categories = localStorage.getItem('parra_blog_categories');
        return categories ? JSON.parse(categories) : this.getDefaultCategories();
    },
    
    saveCategories(categories) {
        localStorage.setItem('parra_blog_categories', JSON.stringify(categories));
    },
    
    getDefaultPosts() {
        return [
            {
                id: 1,
                title: 'Por que investir em terrenos é a melhor opção em 2024?',
                image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop',
                category: 'Investimentos',
                author: 'Daiane Parra',
                date: '2024-03-15',
                excerpt: 'O mercado imobiliário passa por transformações significativas e os terrenos se destacam como uma das opções mais seguras e rentáveis para quem busca investir com inteligência.',
                content: '<p>O mercado imobiliário passa por transformações significativas e os terrenos se destacam como uma das opções mais seguras e rentáveis para quem busca investir com inteligência.</p><h2>Por que terrenos?</h2><p>A terra é um bem finito, e a demanda por espaços para construção só tende a aumentar. Neste artigo, exploramos as razões pelas quais o investimento em terrenos continua sendo uma excelente escolha.</p><h3>Vantagens do investimento</h3><ul><li>Baixo custo de manutenção</li><li>Alta valorização a longo prazo</li><li>Menor burocracia na compra</li></ul>'
            },
            {
                id: 2,
                title: 'Tudo o que você precisa saber sobre documentação de terrenos',
                image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop',
                category: 'Documentação',
                author: 'Daiane Parra',
                date: '2024-03-10',
                excerpt: 'Entenda quais documentos são necessários para comprar um terreno e como evitar problemas na hora da negociação.',
                content: '<p>Comprar um terreno exige atenção redobrada com a documentação. Neste guia completo, explicamos todos os documentos necessários.</p><h2>Documentos essenciais</h2><ul><li>Matrícula atualizada do imóvel</li><li>Certidão negativa de débitos</li><li>Escritura pública</li></ul>'
            },
            {
                id: 3,
                title: 'As regiões de Goiânia que mais valorizam terrenos',
                image: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=400&h=250&fit=crop',
                category: 'Mercado',
                author: 'Daiane Parra',
                date: '2024-03-05',
                excerpt: 'Descubra quais bairros e regiões da capital goiana oferecem o melhor potencial de valorização para seu investimento.',
                content: '<p>Goiânia tem se destacado no cenário imobiliário nacional. Conheça as regiões que mais valorizam.</p><h2>Regiões em destaque</h2><p>Setor Bueno, Jardim Goiás e Marista são algumas das áreas que mais se valorizam.</p>'
            }
        ];
    },
    
    getDefaultCategories() {
        return [
            { id: 1, name: 'Investimentos', count: 12 },
            { id: 2, name: 'Dicas', count: 8 },
            { id: 3, name: 'Documentação', count: 5 },
            { id: 4, name: 'Condomínios', count: 7 },
            { id: 5, name: 'Mercado', count: 10 },
            { id: 6, name: 'Lançamentos', count: 6 }
        ];
    }
};

// ===================================
// AUTHENTICATION
// ===================================
const Auth = {
    login(username, password) {
        // Simple authentication (in production, use proper auth)
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('parra_admin_logged', 'true');
            return true;
        }
        return false;
    },
    
    logout() {
        localStorage.removeItem('parra_admin_logged');
        window.location.href = 'admin.html';
    },
    
    isLoggedIn() {
        return localStorage.getItem('parra_admin_logged') === 'true';
    },
    
    checkAuth() {
        if (this.isLoggedIn()) {
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('adminPanel').style.display = 'flex';
            initAdmin();
        }
    }
};

// ===================================
// ADMIN PANEL FUNCTIONS
// ===================================
let currentTab = 'dashboard';
let deletePostId = null;
let editingPostId = null;

function initAdmin() {
    // Initialize navigation
    initNavigation();
    
    // Load initial data
    loadDashboard();
    loadPosts();
    loadCategories();
    populateCategorySelects();
}

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-tab]');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const tab = this.dataset.tab;
            switchTab(tab);
        });
    });
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        Auth.logout();
    });
}

function switchTab(tabName) {
    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.tab === tabName) {
            item.classList.add('active');
        }
    });
    
    // Update content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const tabElement = document.getElementById(tabName + 'Tab');
    if (tabElement) {
        tabElement.classList.add('active');
    }
    
    currentTab = tabName;
    
    // Refresh data based on tab
    if (tabName === 'dashboard') {
        loadDashboard();
    } else if (tabName === 'posts') {
        loadPosts();
    } else if (tabName === 'categories') {
        loadCategories();
    }
}

// ===================================
// DASHBOARD
// ===================================
function loadDashboard() {
    const posts = Storage.getPosts();
    const categories = Storage.getCategories();
    
    document.getElementById('totalPosts').textContent = posts.length;
    document.getElementById('totalCategories').textContent = categories.length;
    document.getElementById('totalViews').textContent = Math.floor(Math.random() * 5000) + 1000;
    
    if (posts.length > 0) {
        const lastPost = posts[0];
        const date = new Date(lastPost.date);
        document.getElementById('lastPost').textContent = date.toLocaleDateString('pt-BR');
    }
    
    // Recent posts
    const recentPostsList = document.getElementById('recentPostsList');
    recentPostsList.innerHTML = '';
    
    posts.slice(0, 5).forEach(post => {
        const date = new Date(post.date);
        const item = document.createElement('div');
        item.className = 'post-item';
        item.innerHTML = `
            <img src="${post.image}" alt="${post.title}" onerror="this.src='https://via.placeholder.com/60x45'">
            <div class="post-item-info">
                <h4>${post.title}</h4>
                <span>${date.toLocaleDateString('pt-BR')} - ${post.category}</span>
            </div>
        `;
        recentPostsList.appendChild(item);
    });
}

// ===================================
// POSTS MANAGEMENT
// ===================================
function loadPosts() {
    const posts = Storage.getPosts();
    const tbody = document.getElementById('postsTableBody');
    tbody.innerHTML = '';
    
    posts.forEach(post => {
        const date = new Date(post.date);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${post.image}" alt="${post.title}" class="post-thumb" onerror="this.src='https://via.placeholder.com/80x50'">
            </td>
            <td class="post-title-cell">
                <h4>${post.title}</h4>
                <span>Por ${post.author}</span>
            </td>
            <td>${post.category}</td>
            <td>${date.toLocaleDateString('pt-BR')}</td>
            <td><span class="status-badge published">Publicado</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit" onclick="editPost(${post.id})" title="Editar">
                        <i class="fas fa-pen"></i>
                    </button>
                    <button class="action-btn delete" onclick="deletePost(${post.id})" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editPost(id) {
    const posts = Storage.getPosts();
    const post = posts.find(p => p.id === id);
    
    if (post) {
        editingPostId = id;
        document.getElementById('editPostId').value = id;
        document.getElementById('editPostTitle').value = post.title;
        document.getElementById('editPostImage').value = post.image;
        document.getElementById('editPostExcerpt').value = post.excerpt;
        document.getElementById('editPostContent').innerHTML = post.content;
        
        // Populate category select
        const select = document.getElementById('editPostCategory');
        select.innerHTML = '';
        const categories = Storage.getCategories();
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.name;
            option.textContent = cat.name;
            if (cat.name === post.category) {
                option.selected = true;
            }
            select.appendChild(option);
        });
        
        document.getElementById('editModal').classList.add('active');
    }
}

function closeEditModal() {
    document.getElementById('editModal').classList.remove('active');
    editingPostId = null;
}

function deletePost(id) {
    deletePostId = id;
    document.getElementById('deleteModal').classList.add('active');
}

function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('active');
    deletePostId = null;
}

function confirmDelete() {
    if (deletePostId) {
        let posts = Storage.getPosts();
        posts = posts.filter(p => p.id !== deletePostId);
        Storage.savePosts(posts);
        loadPosts();
        loadDashboard();
        closeDeleteModal();
    }
}

// Save edited post
document.getElementById('editPostForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (editingPostId) {
        let posts = Storage.getPosts();
        const index = posts.findIndex(p => p.id === editingPostId);
        
        if (index !== -1) {
            posts[index].title = document.getElementById('editPostTitle').value;
            posts[index].image = document.getElementById('editPostImage').value;
            posts[index].category = document.getElementById('editPostCategory').value;
            posts[index].excerpt = document.getElementById('editPostExcerpt').value;
            posts[index].content = document.getElementById('editPostContent').innerHTML;
            
            Storage.savePosts(posts);
            loadPosts();
            loadDashboard();
            closeEditModal();
        }
    }
});

// ===================================
// CREATE NEW POST
// ===================================
document.getElementById('postForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('postTitle').value;
    const image = document.getElementById('postImage').value;
    const category = document.getElementById('postCategory').value;
    const author = document.getElementById('postAuthor').value;
    const date = document.getElementById('postDate').value || new Date().toISOString().split('T')[0];
    const excerpt = document.getElementById('postExcerpt').value;
    const content = document.getElementById('postContent').innerHTML;
    
    const posts = Storage.getPosts();
    const newPost = {
        id: Date.now(),
        title,
        image,
        category,
        author,
        date,
        excerpt,
        content
    };
    
    posts.unshift(newPost);
    Storage.savePosts(posts);
    
    // Reset form
    this.reset();
    document.getElementById('postContent').innerHTML = '';
    document.getElementById('postDate').value = '';
    
    // Show success message
    alert('Post criado com sucesso!');
    
    // Switch to posts tab
    switchTab('posts');
});

function cancelPost() {
    document.getElementById('postForm').reset();
    document.getElementById('postContent').innerHTML = '';
    switchTab('posts');
}

// ===================================
// CATEGORIES MANAGEMENT
// ===================================
function loadCategories() {
    const categories = Storage.getCategories();
    const container = document.getElementById('categoriesList');
    container.innerHTML = '';
    
    categories.forEach(cat => {
        const item = document.createElement('div');
        item.className = 'category-item';
        item.innerHTML = `
            <div class="category-item-info">
                <i class="fas fa-folder"></i>
                <span>${cat.name}</span>
                <small>(${cat.count} posts)</small>
            </div>
            <button class="category-delete-btn" onclick="deleteCategory(${cat.id})" title="Excluir categoria">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(item);
    });
}

function populateCategorySelects() {
    const categories = Storage.getCategories();
    const selects = [
        document.getElementById('postCategory'),
        document.getElementById('editPostCategory')
    ];
    
    selects.forEach(select => {
        if (select) {
            select.innerHTML = '<option value="">Selecione uma categoria</option>';
            categories.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.name;
                option.textContent = cat.name;
                select.appendChild(option);
            });
        }
    });
}

document.getElementById('categoryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('categoryName').value.trim();
    
    if (name) {
        const categories = Storage.getCategories();
        
        // Check if category already exists
        if (categories.some(cat => cat.name.toLowerCase() === name.toLowerCase())) {
            alert('Esta categoria já existe!');
            return;
        }
        
        categories.push({
            id: Date.now(),
            name,
            count: 0
        });
        
        Storage.saveCategories(categories);
        this.reset();
        loadCategories();
        populateCategorySelects();
    }
});

function deleteCategory(id) {
    const categories = Storage.getCategories();
    const filtered = categories.filter(cat => cat.id !== id);
    Storage.saveCategories(filtered);
    loadCategories();
    populateCategorySelects();
}

// ===================================
// TEXT EDITOR
// ===================================
function formatText(command, value = null) {
    if (command === 'createLink') {
        value = prompt('Digite a URL:');
        if (!value) return;
    }
    document.execCommand(command, false, value);
}

// ===================================
// LOGIN FORM
// ===================================
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (Auth.login(username, password)) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'flex';
        initAdmin();
    } else {
        alert('Usuário ou senha inválidos!');
    }
});

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    Auth.checkAuth();
});

// Close modals on outside click
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
});
// ===================================
// SETTINGS MANAGEMENT
// ===================================
const Settings = {
    getDefault() {
        return {
            siteName: 'Parra Empreendimentos',
            siteSlogan: 'Especialistas em terrenos exclusivos',
            siteDescription: 'Construa seu legado com quem entende do assunto.',
            contactPhone: '(62) 99999-9999',
            contactEmail: 'contato@parraempreendimentos.com.br',
            contactAddress: 'Av. T-4, 1234 - Setor Bueno, Goiânia - GO',
            socialFacebook: '',
            socialInstagram: '',
            socialLinkedIn: '',
            socialWhatsApp: '5562999999999'
        };
    },
    
    get() {
        const settings = localStorage.getItem('parra_blog_settings');
        return settings ? JSON.parse(settings) : this.getDefault();
    },
    
    save(settings) {
        localStorage.setItem('parra_blog_settings', JSON.stringify(settings));
    },
    
    loadToForm() {
        const settings = this.get();
        document.getElementById('siteName').value = settings.siteName || '';
        document.getElementById('siteSlogan').value = settings.siteSlogan || '';
        document.getElementById('siteDescription').value = settings.siteDescription || '';
        document.getElementById('contactPhone').value = settings.contactPhone || '';
        document.getElementById('contactEmail').value = settings.contactEmail || '';
        document.getElementById('contactAddress').value = settings.contactAddress || '';
        document.getElementById('socialFacebook').value = settings.socialFacebook || '';
        document.getElementById('socialInstagram').value = settings.socialInstagram || '';
        document.getElementById('socialLinkedIn').value = settings.socialLinkedIn || '';
        document.getElementById('socialWhatsApp').value = settings.socialWhatsApp || '';
    }
};

// Settings Form Handler
document.getElementById('settingsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const settings = {
        siteName: document.getElementById('siteName').value,
        siteSlogan: document.getElementById('siteSlogan').value,
        siteDescription: document.getElementById('siteDescription').value,
        contactPhone: document.getElementById('contactPhone').value,
        contactEmail: document.getElementById('contactEmail').value,
        contactAddress: document.getElementById('contactAddress').value,
        socialFacebook: document.getElementById('socialFacebook').value,
        socialInstagram: document.getElementById('socialInstagram').value,
        socialLinkedIn: document.getElementById('socialLinkedIn').value,
        socialWhatsApp: document.getElementById('socialWhatsApp').value
    };
    
    Settings.save(settings);
    alert('Configurações salvas com sucesso!');
});

// Update initAdmin to include settings
const originalInitAdmin = typeof initAdmin !== 'undefined' ? initAdmin : null;
document.addEventListener('DOMContentLoaded', function() {
    // Load settings when settings tab is opened
    const settingsTab = document.querySelector('[data-tab="settings"]');
    if (settingsTab) {
        settingsTab.addEventListener('click', function(e) {
            e.preventDefault();
            Settings.loadToForm();
            switchTab('settings');
        });
    }
});
