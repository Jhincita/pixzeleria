document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        if (item.id !== 'logout-btn') {
            item.addEventListener('click', function() {
                const sectionId = this.getAttribute('data-section') + '-section';

                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');

                contentSections.forEach(section => section.classList.remove('active'));
                document.getElementById(sectionId).classList.add('active');

                document.querySelector('.admin-header h2').textContent = this.querySelector('span').textContent;
            });
        }
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', function() {
        if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
            sessionStorage.removeItem('adminLoggedIn');
            window.location.href = 'index.html';
        }
    });

    // Toggle sidebar
    document.querySelector('.toggle-sidebar').addEventListener('click', function() {
        document.querySelector('.admin-sidebar').classList.toggle('collapsed');
    });

    // Iniciar charts
    initCharts();

    // Carga los más vendidiwis
    loadBestSellers();

    // Pa que funcionen los botoncitos
    document.getElementById('add-product-btn')?.addEventListener('click', showProductModal);
    document.getElementById('add-user-btn')?.addEventListener('click', showUserModal);

    // Setup para validaciones
    if (document.getElementById('pizza-form')) {
        setupPizzaFormValidation();
        document.getElementById('pizza-form').addEventListener('submit', handlePizzaSubmit);
    }

    if (document.getElementById('user-form')) {
        loadChileanRegions();
        setupUserFormValidation();
        document.getElementById('user-form').addEventListener('submit', handleUserSubmit);
    }
});

// Iniciar charts
function initCharts() {
    // Chart de venta de pizzas
    const pizzaCtx = document.getElementById('pizzaChart')?.getContext('2d');
    if (pizzaCtx) {
        new Chart(pizzaCtx, {
            type: 'bar',
            data: {
                labels: ['Margarita', 'Pepperoni', 'Hawaiana', 'Vegetariana', 'Cuatro Quesos'],
                datasets: [{
                    label: 'Ventas',
                    data: [65, 59, 80, 45, 56],
                    backgroundColor: ['#ff6b6b', '#4ecdc4', '#ffd166', '#06d6a0', '#118ab2'],
                    borderColor: ['#000', '#000', '#000', '#000', '#000'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { drawBorder: false },
                        ticks: {
                            font: { family: '"lores-15-bold-alt-oakland", sans-serif' }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: {
                            font: { family: '"lores-15-bold-alt-oakland", sans-serif' }
                        }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // Chart de ventas
    const salesCtx = document.getElementById('salesChart')?.getContext('2d');
    if (salesCtx) {
        new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                datasets: [{
                    label: 'Ventas ($)',
                    data: [120000, 190000, 150000, 220000, 180000, 250000, 210000],
                    backgroundColor: 'rgba(78, 205, 196, 0.2)',
                    borderColor: '#4ecdc4',
                    borderWidth: 3,
                    tension: 0.3,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#4ecdc4',
                    pointBorderWidth: 2,
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { drawBorder: false },
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000) + 'K';
                            },
                            font: { family: '"lores-15-bold-alt-oakland", sans-serif' }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: {
                            font: { family: '"lores-15-bold-alt-oakland", sans-serif' }
                        }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
}

// Función para cargar datos de las pipshas más vendidas
function loadBestSellers() {
    const bestSellers = [
        { name: "Pixza Pepperoni", sales: 152, revenue: 1400000 },
        { name: "Pixza Margarita", sales: 128, revenue: 1100000 },
        { name: "Pixza Hawaiana", sales: 98, revenue: 890000 },
        { name: "Pixza Cuatro Quesos", sales: 76, revenue: 720000 },
        { name: "Pixza Vegetariana", sales: 64, revenue: 580000 }
    ];

    const bestSellersList = document.querySelector('.best-sellers-list');

    if (bestSellersList) {
        bestSellersList.innerHTML = '';

        bestSellers.forEach((product, index) => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';

            const formattedRevenue = product.revenue >= 1000000
                ? `$${(product.revenue / 1000000).toFixed(1)}M`
                : `$${(product.revenue / 1000).toFixed(0)}K`;

            productItem.innerHTML = `
                <div class="product-info">
                    <span class="product-rank">${index + 1}</span>
                    <span class="product-name">${product.name}</span>
                </div>
                <div class="product-stats">
                    <span class="sales-count">${product.sales} ventas</span>
                    <span class="revenue">${formattedRevenue}</span>
                </div>
            `;

            bestSellersList.appendChild(productItem);
        });
    }
}

// Funciones modales
function showProductModal() {
    window.location.href = 'new-pizza.html';
}

function showUserModal() {
    window.location.href = 'new-user.html';
}

// Función para simular datos en tiempo real
function simulateRealTimeUpdates() {
    setInterval(() => {
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length >= 3) {
            const orders = parseInt(statNumbers[2].textContent);
            const change = Math.floor(Math.random() * 5) - 2;
            const newOrders = Math.max(0, orders + change);
            statNumbers[2].textContent = newOrders;

            const changeElement = document.querySelectorAll('.stat-change')[2];
            if (change > 0) {
                changeElement.textContent = `+${change}%`;
                changeElement.className = 'stat-change positive';
            } else if (change < 0) {
                changeElement.textContent = `${change}%`;
                changeElement.className = 'stat-change negative';
            } else {
                changeElement.textContent = '0%';
                changeElement.className = 'stat-change';
            }
        }
    }, 10000);
}

// Iniciar simulaciones de datos en tiempo real
document.addEventListener('DOMContentLoaded', function() {
    simulateRealTimeUpdates();
});

// Función para manejar búsquedas y filtros
function setupFilters() {
    const searchInputs = document.querySelectorAll('.search-input');
    const filterSelects = document.querySelectorAll('.filter-select');

    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            filterTable(this.value, this.closest('section').id);
        });
    });

    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            filterTableBySelect(this.value, this.closest('section').id);
        });
    });
}

// Funciones de filtrado
function filterTable(query, sectionId) {
    console.log(`Buscando: ${query} en la sección: ${sectionId}`);
}

function filterTableBySelect(value, sectionId) {
    console.log(`Filtrando por: ${value} en la sección: ${sectionId}`);
}

// Configurar filtros cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setupFilters();
});

// Formulario pixza nueva
function setupPizzaFormValidation() {
    const codeInput = document.getElementById('pizza-code');
    const priceInput = document.getElementById('pizza-price');
    const stockInput = document.getElementById('pizza-stock');
    const criticalStockInput = document.getElementById('pizza-critical-stock');

    codeInput.addEventListener('blur', function() {
        const code = this.value.toUpperCase();
        this.value = code;

        if (code && isPizzaCodeExists(code)) {
            showError('code-error', 'Este código ya está en uso');
        } else {
            clearError('code-error');
        }
    });

    criticalStockInput.addEventListener('blur', function() {
        const stock = parseInt(stockInput.value) || 0;
        const criticalStock = parseInt(this.value) || 0;

        if (criticalStock >= stock) {
            showError('critical-stock-error', 'El stock crítico debe ser menor al stock total');
        } else {
            clearError('critical-stock-error');
        }
    });
}

function handlePizzaSubmit(e) {
    e.preventDefault();

    const formData = {
        code: document.getElementById('pizza-code').value.toUpperCase(),
        name: document.getElementById('pizza-name').value,
        description: document.getElementById('pizza-description').value,
        price: parseInt(document.getElementById('pizza-price').value),
        stock: parseInt(document.getElementById('pizza-stock').value),
        criticalStock: parseInt(document.getElementById('pizza-critical-stock').value),
        category: document.getElementById('pizza-category').value,
        image: document.getElementById('pizza-image').value,
        status: document.getElementById('pizza-status').value,
        createdAt: new Date().toISOString()
    };

    if (!validatePizzaForm(formData)) {
        return;
    }

    savePizza(formData);
    alert('¡Pixza creada exitosamente!');
    window.location.href = 'admin.html#products';
}

function validatePizzaForm(formData) {
    let isValid = true;

    if (!formData.code) {
        showError('code-error', 'El código es obligatorio');
        isValid = false;
    } else if (isPizzaCodeExists(formData.code)) {
        showError('code-error', 'Este código ya está en uso');
        isValid = false;
    } else {
        clearError('code-error');
    }

    if (!formData.name) {
        showError('name-error', 'El nombre es obligatorio');
        isValid = false;
    } else {
        clearError('name-error');
    }

    if (!formData.price || formData.price < 1000) {
        showError('price-error', 'El precio debe ser mayor a $1.000');
        isValid = false;
    } else {
        clearError('price-error');
    }

    if (formData.stock < 0) {
        showError('stock-error', 'El stock no puede ser negativo');
        isValid = false;
    } else {
        clearError('stock-error');
    }

    if (formData.criticalStock >= formData.stock) {
        showError('critical-stock-error', 'El stock crítico debe ser menor al stock total');
        isValid = false;
    } else {
        clearError('critical-stock-error');
    }

    if (!formData.category) {
        showError('category-error', 'La categoría es obligatoria');
        isValid = false;
    } else {
        clearError('category-error');
    }

    if (!formData.image) {
        showError('image-error', 'La URL de la imagen es obligatoria');
        isValid = false;
    } else if (!isValidUrl(formData.image)) {
        showError('image-error', 'La URL de la imagen no es válida');
        isValid = false;
    } else {
        clearError('image-error');
    }

    return isValid;
}

function isPizzaCodeExists(code) {
    const pizzas = JSON.parse(localStorage.getItem('pixeleriaPizzas')) || [];
    return pizzas.some(pizza => pizza.code === code);
}

function savePizza(pizzaData) {
    const pizzas = JSON.parse(localStorage.getItem('pixeleriaPizzas')) || [];
    pizzas.push(pizzaData);
    localStorage.setItem('pixeleriaPizzas', JSON.stringify(pizzas));
}

// Formulario de usuario nuevo
const chileData = {
    regiones: [
        { id: 1, nombre: "Arica y Parinacota", comunas: ["Arica", "Camarones", "Putre", "General Lagos"] },
        { id: 2, nombre: "Tarapacá", comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"] },
        { id: 3, nombre: "Antofagasta", comunas: ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"] },
        { id: 4, nombre: "Atacama", comunas: ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"] },
        { id: 5, nombre: "Coquimbo", comunas: ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paihuano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"] },
        { id: 6, nombre: "Valparaíso", comunas: ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"] },
        { id: 7, nombre: "Metropolitana de Santiago", comunas: ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Santiago", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"] },
        { id: 8, nombre: "Libertador General Bernardo O'Higgins", comunas: ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"] },
        { id: 9, nombre: "Maule", comunas: ["Talca", "ConsVtución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "ReVro", "San Javier", "Villa Alegre", "Yerbas Buenas"] },
        { id: 10, nombre: "Ñuble", comunas: ["Cobquecura", "Coelemu", "Ninhue", "Portezuelo", "Quirihue", "Ránquil", "Treguaco", "Bulnes", "Chillán Viejo", "Chillán", "El Carmen", "Pemuco", "Pinto", "Quillón", "San Ignacio", "Yungay", "Coihueco", "Ñiquén", "San Carlos", "San Fabián", "San Nicolás"] },
        { id: 11, nombre: "Biobío", comunas: ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualpén", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Lebu", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"] },
        { id: 12, nombre: "La Araucanía", comunas: ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"] },
        { id: 13, nombre: "Los Ríos", comunas: ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"] },
        { id: 14, nombre: "Los Lagos", comunas: ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "FruVllar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"] },
        { id: 15, nombre: "Aysén del General Carlos Ibáñez del Campo", comunas: ["Coihaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"] },
        { id: 16, nombre: "Magallanes y de la Antártica Chilena", comunas: ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"] }
    ]
};

function loadChileanRegions() {
    const regionSelect = document.getElementById('user-region');
    const comunaSelect = document.getElementById('user-commune');

    if (regionSelect) {
        chileData.regiones.forEach(region => {
            const option = document.createElement('option');
            option.value = region.nombre;
            option.textContent = region.nombre;
            regionSelect.appendChild(option);
        });

        regionSelect.addEventListener('change', function() {
            const selectedRegion = chileData.regiones.find(r => r.nombre === this.value);

            comunaSelect.disabled = !selectedRegion;
            comunaSelect.innerHTML = '';

            if (selectedRegion) {
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Selecciona una comuna';
                comunaSelect.appendChild(defaultOption);

                selectedRegion.comunas.forEach(comuna => {
                    const option = document.createElement('option');
                    option.value = comuna;
                    option.textContent = comuna;
                    comunaSelect.appendChild(option);
                });
            } else {
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Primero selecciona una región';
                comunaSelect.appendChild(defaultOption);
            }
        });
    }
}

function setupUserFormValidation() {
    const runInput = document.getElementById('user-run');
    const emailInput = document.getElementById('user-email');
    const passwordInput = document.getElementById('user-password');
    const confirmPasswordInput = document.getElementById('user-confirm-password');

    runInput.addEventListener('blur', function() {
        const run = this.value;

        if (run && isUserRunExists(run)) {
            showError('run-error', 'Este RUN ya está registrado');
        } else {
            clearError('run-error');
        }
    });

    emailInput.addEventListener('blur', function() {
        const email = this.value;

        if (email && isUserEmailExists(email)) {
            showError('email-error', 'Este email ya está registrado');
        } else {
            clearError('email-error');
        }
    });

    confirmPasswordInput.addEventListener('blur', function() {
        const password = passwordInput.value;
        const confirmPassword = this.value;

        if (password !== confirmPassword) {
            showError('confirm-password-error', 'Las contraseñas no coinciden');
        } else {
            clearError('confirm-password-error');
        }
    });
}

function handleUserSubmit(e) {
    e.preventDefault();

    const formData = {
        run: document.getElementById('user-run').value,
        name: document.getElementById('user-name').value,
        lastname: document.getElementById('user-lastname').value,
        email: document.getElementById('user-email').value,
        birthdate: document.getElementById('user-birthdate').value,
        password: document.getElementById('user-password').value,
        role: document.getElementById('user-role').value,
        region: document.getElementById('user-region').value,
        commune: document.getElementById('user-commune').value,
        street: document.getElementById('user-street').value,
        number: document.getElementById('user-number').value,
        department: document.getElementById('user-department').value,
        status: document.getElementById('user-status').value,
        createdAt: new Date().toISOString()
    };

    if (!validateUserForm(formData)) {
        return;
    }

    saveUser(formData);
    alert('¡Usuario creado exitosamente!');
    window.location.href = 'admin.html#users';
}

function validateUserForm(formData) {
    let isValid = true;

    if (!formData.run) {
        showError('run-error', 'El RUN es obligatorio');
        isValid = false;
    } else if (!isValidRun(formData.run)) {
        showError('run-error', 'El RUN no tiene un formato válido');
        isValid = false;
    } else if (isUserRunExists(formData.run)) {
        showError('run-error', 'Este RUN ya está registrado');
        isValid = false;
    } else {
        clearError('run-error');
    }

    if (!formData.email) {
        showError('email-error', 'El email es obligatorio');
        isValid = false;
    } else if (!isValidEmail(formData.email)) {
        showError('email-error', 'El email no tiene un formato válido');
        isValid = false;
    } else if (isUserEmailExists(formData.email)) {
        showError('email-error', 'Este email ya está registrado');
        isValid = false;
    } else {
        clearError('email-error');
    }

    if (!formData.password) {
        showError('password-error', 'La contraseña es obligatoria');
        isValid = false;
    } else if (formData.password.length < 6) {
        showError('password-error', 'La contraseña debe tener al menos 6 caracteres');
        isValid = false;
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(formData.password)) {
        showError('password-error', 'La contraseña debe contener letras y números');
        isValid = false;
    } else {
        clearError('password-error');
    }

    const confirmPassword = document.getElementById('user-confirm-password').value;
    if (formData.password !== confirmPassword) {
        showError('confirm-password-error', 'Las contraseñas no coinciden');
        isValid = false;
    } else {
        clearError('confirm-password-error');
    }

    if (!formData.role) {
        showError('role-error', 'El tipo de usuario es obligatorio');
        isValid = false;
    } else {
        clearError('role-error');
    }

    if (!formData.street) {
        showError('street-error', 'La calle es obligatoria');
        isValid = false;
    } else {
        clearError('street-error');
    }

    if (!formData.number) {
        showError('number-error', 'El número es obligatorio');
        isValid = false;
    } else {
        clearError('number-error');
    }

    return isValid;
}

function isValidRun(run) {
    const runRegex = /^[0-9]{7,9}[0-9Kk]{1}$/;
    return runRegex.test(run);
}

function isUserRunExists(run) {
    const users = JSON.parse(localStorage.getItem('pixeleriaUsers')) || [];
    return users.some(user => user.run === run);
}

function isUserEmailExists(email) {
    const users = JSON.parse(localStorage.getItem('pixeleriaUsers')) || [];
    return users.some(user => user.email === email);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function saveUser(userData) {
    const users = JSON.parse(localStorage.getItem('pixeleriaUsers')) || [];
    users.push(userData);
    localStorage.setItem('pixeleriaUsers', JSON.stringify(users));
}

// Funciones utilitarias
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}