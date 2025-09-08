// admin.js - Todas las funcionalidades del panel de administración

// Datos iniciales de las pizzas
const pizzasIniciales = {
    '1': {
        id: '1',
        codigo: 'PIX001',
        nombre: 'Margherita Pixel',
        descripcion: 'Pizza clásica con tomate, mozzarella y albahaca en estilo 8-bit',
        precio: 12990,
        stock: 25,
        categoria: 'Clásicas',
        estado: 'activo'
    },
    '2': {
        id: '2',
        codigo: 'PIX002',
        nombre: 'Pepperoni Retro',
        descripcion: 'Pepperoni pixelado con queso mozzarella derretido',
        precio: 15990,
        stock: 20,
        categoria: 'Tradicionales',
        estado: 'activo'
    },
    '3': {
        id: '3',
        codigo: 'PIX003',
        nombre: 'Super Mario Special',
        descripcion: 'Champiñones, pimientos y aceitunas como power-ups',
        precio: 18990,
        stock: 15,
        categoria: 'Especiales',
        estado: 'activo'
    },
    '4': {
        id: '4',
        codigo: 'PIX004',
        nombre: 'Tetris Veggie',
        descripcion: 'Vegetales organizados en forma de piezas de Tetris',
        precio: 16990,
        stock: 18,
        categoria: 'Vegetarianas',
        estado: 'inactivo'
    }
};

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    inicializarAlmacenamiento();
    inicializarNavegacion();
    inicializarFormularios();
    inicializarEventListeners();

    // Cargar datos si estamos en la página de edición
    if (window.location.pathname.includes('editar-pizza')) {
        const urlParams = new URLSearchParams(window.location.search);
        const pizzaId = urlParams.get('id');
        if (pizzaId) {
            cargarDatosPizza(pizzaId);
        }
    }

    // Cargar tabla de productos si estamos en la página admin
    if (window.location.pathname.endsWith('admin.html') ||
        window.location.pathname.endsWith('/')) {
        cargarTablaProductos();
    }
});

// Inicializar almacenamiento con datos por defecto si está vacío
function inicializarAlmacenamiento() {
    if (!localStorage.getItem('pizzas')) {
        localStorage.setItem('pizzas', JSON.stringify(pizzasIniciales));
    }
}

// Obtener todas las pizzas del almacenamiento
function obtenerPizzas() {
    return JSON.parse(localStorage.getItem('pizzas')) || {};
}

// Guardar pizzas en el almacenamiento
function guardarPizzas(pizzas) {
    localStorage.setItem('pizzas', JSON.stringify(pizzas));
}

// Configurar la navegación entre secciones
function inicializarNavegacion() {
    const navItems = document.querySelectorAll('.nav-item');

    if (navItems.length > 0) {
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (this.id === 'logout-btn') {
                    cerrarSesion();
                    return;
                }

                // Remover clase active de todos los items
                document.querySelectorAll('.nav-item').forEach(navItem => {
                    navItem.classList.remove('active');
                });

                // Agregar clase active al item clickeado
                this.classList.add('active');

                // Ocultar todas las secciones
                document.querySelectorAll('.content-section').forEach(section => {
                    section.classList.remove('active');
                });

                // Mostrar la sección correspondiente
                const sectionId = this.getAttribute('data-section') + '-section';
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }

                // Actualizar el título en el header
                const sectionTitle = this.querySelector('span').textContent;
                const headerTitle = document.querySelector('.admin-header h2');
                if (headerTitle) {
                    headerTitle.textContent = sectionTitle;
                }
            });
        });
    }
}

// Configurar event listeners generales
function inicializarEventListeners() {
    // Toggle sidebar
    const toggleSidebar = document.querySelector('.toggle-sidebar');
    if (toggleSidebar) {
        toggleSidebar.addEventListener('click', function() {
            const sidebar = document.querySelector('.admin-sidebar');
            const main = document.querySelector('.admin-main');

            if (sidebar && main) {
                sidebar.classList.toggle('collapsed');
                main.classList.toggle('expanded');
            }
        });
    }
}

// Configurar validación de formularios
function inicializarFormularios() {
    // Formulario de pizza (crear y editar)
    const pizzaForm = document.getElementById('pizza-form');
    if (pizzaForm) {
        pizzaForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (validarFormularioPizza()) {
                // Determinar si es crear o editar
                const urlParams = new URLSearchParams(window.location.search);
                const pizzaId = urlParams.get('id');

                if (pizzaId) {
                    actualizarPizza(pizzaId);
                } else {
                    crearPizza();
                }
            }
        });
    }

    // Formulario de login
    const loginForm = document.querySelector('form');
    if (loginForm && window.location.pathname.includes('login')) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            window.location.href = 'admin.html';
        });
    }
}

// Función para crear una nueva pizza
function crearPizza() {
    const pizzas = obtenerPizzas();

    // Generar un nuevo ID
    const nuevoId = Object.keys(pizzas).length > 0 ?
        Math.max(...Object.keys(pizzas).map(id => parseInt(id))) + 1 : 1;

    // Crear el objeto pizza
    const nuevaPizza = {
        id: nuevoId.toString(),
        codigo: document.getElementById('codigo').value,
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        precio: parseInt(document.getElementById('precio').value),
        stock: parseInt(document.getElementById('stock').value),
        categoria: document.getElementById('categoria').value,
        estado: 'activo'
    };

    // Agregar la nueva pizza
    pizzas[nuevoId] = nuevaPizza;

    // Guardar en localStorage
    guardarPizzas(pizzas);

    alert('¡Pizza creada con éxito!');
    window.location.href = 'admin.html#products-section';
}

// Función para actualizar una pizza existente
function actualizarPizza(pizzaId) {
    const pizzas = obtenerPizzas();

    if (pizzas[pizzaId]) {
        // Actualizar la pizza
        pizzas[pizzaId] = {
            id: pizzaId,
            codigo: document.getElementById('codigo').value,
            nombre: document.getElementById('nombre').value,
            descripcion: document.getElementById('descripcion').value,
            precio: parseInt(document.getElementById('precio').value),
            stock: parseInt(document.getElementById('stock').value),
            categoria: document.getElementById('categoria').value,
            estado: document.getElementById('estado').value
        };

        // Guardar en localStorage
        guardarPizzas(pizzas);

        alert('¡Pizza actualizada con éxito!');
        window.location.href = 'admin.html#products-section';
    } else {
        alert('Error: No se encontró la pizza a actualizar');
    }
}

// Función para cargar la tabla de productos
function cargarTablaProductos() {
    const tabla = document.querySelector('.data-table tbody');
    if (!tabla) return;

    // Limpiar tabla
    tabla.innerHTML = '';

    // Obtener pizzas
    const pizzas = obtenerPizzas();

    // Llenar tabla
    for (const id in pizzas) {
        const pizza = pizzas[id];

        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${pizza.codigo}</td>
            <td>${pizza.nombre}</td>
            <td>$${pizza.precio.toLocaleString('es-CL')}</td>
            <td class="stock-cell">
                <span class="stock-badge ${pizza.stock <= 5 ? 'critical' : pizza.stock <= 10 ? 'warning' : ''}">
                    ${pizza.stock}
                </span>
            </td>
            <td>${pizza.categoria}</td>
            <td><span class="status-badge ${pizza.estado}">${pizza.estado === 'activo' ? 'Activo' : 'Inactivo'}</span></td>
            <td>
                <button class="action-btn edit" onclick="editarPizza(${pizza.id})"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" onclick="eliminarProducto(${pizza.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;

        tabla.appendChild(fila);
    }
}

// Función para redirigir a la página de edición
function editarPizza(id) {
    window.location.href = `editar-pizza.html?id=${id}`;
}

// Función para validar formulario de pizza
function validarFormularioPizza() {
    let isValid = true;

    // Validar código
    const codigo = document.getElementById('codigo');
    const codigoError = document.getElementById('codigo-error');
    if (!codigo || !codigo.value.trim()) {
        if (codigoError) codigoError.textContent = 'El código es obligatorio';
        isValid = false;
    } else if (codigoError) {
        codigoError.textContent = '';
    }

    // Validar nombre
    const nombre = document.getElementById('nombre');
    const nombreError = document.getElementById('nombre-error');
    if (!nombre || !nombre.value.trim()) {
        if (nombreError) nombreError.textContent = 'El nombre es obligatorio';
        isValid = false;
    } else if (nombreError) {
        nombreError.textContent = '';
    }

    // Validar descripción
    const descripcion = document.getElementById('descripcion');
    const descripcionError = document.getElementById('descripcion-error');
    if (!descripcion || !descripcion.value.trim()) {
        if (descripcionError) descripcionError.textContent = 'La descripción es obligatoria';
        isValid = false;
    } else if (descripcionError) {
        descripcionError.textContent = '';
    }

    // Validar precio
    const precio = document.getElementById('precio');
    const precioError = document.getElementById('precio-error');
    if (!precio || !precio.value || precio.value <= 0) {
        if (precioError) precioError.textContent = 'El precio debe ser mayor a 0';
        isValid = false;
    } else if (precioError) {
        precioError.textContent = '';
    }

    // Validar stock
    const stock = document.getElementById('stock');
    const stockError = document.getElementById('stock-error');
    if (!stock || !stock.value || stock.value < 0) {
        if (stockError) stockError.textContent = 'El stock no puede ser negativo';
        isValid = false;
    } else if (stockError) {
        stockError.textContent = '';
    }

    // Validar categoría
    const categoria = document.getElementById('categoria');
    const categoriaError = document.getElementById('categoria-error');
    if (!categoria || !categoria.value) {
        if (categoriaError) categoriaError.textContent = 'Debes seleccionar una categoría';
        isValid = false;
    } else if (categoriaError) {
        categoriaError.textContent = '';
    }

    return isValid;
}

// Función para cargar datos de pizza para edición
function cargarDatosPizza(pizzaId) {
    const pizzas = obtenerPizzas();
    const pizza = pizzas[pizzaId];

    if (pizza) {
        if (document.getElementById('codigo')) document.getElementById('codigo').value = pizza.codigo;
        if (document.getElementById('nombre')) document.getElementById('nombre').value = pizza.nombre;
        if (document.getElementById('descripcion')) document.getElementById('descripcion').value = pizza.descripcion;
        if (document.getElementById('precio')) document.getElementById('precio').value = pizza.precio;
        if (document.getElementById('stock')) document.getElementById('stock').value = pizza.stock;
        if (document.getElementById('categoria')) document.getElementById('categoria').value = pizza.categoria;
        if (document.getElementById('estado')) document.getElementById('estado').value = pizza.estado;
    }
}

// Función para eliminar producto
function eliminarProducto(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        const pizzas = obtenerPizzas();

        if (pizzas[id]) {
            delete pizzas[id];
            guardarPizzas(pizzas);

            // Recargar la tabla
            cargarTablaProductos();

            alert('Producto eliminado con éxito');
        } else {
            alert('Error: No se encontró el producto');
        }
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        window.location.href = 'login.html';
    }
}