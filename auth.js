// Datos de regiones y comunas de Chile
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

// Cargar regiones y comunas al documento
document.addEventListener('DOMContentLoaded', function() {
    const regionSelect = document.getElementById('region');
    const comunaSelect = document.getElementById('comuna');

    // Si estamos en la página de registro, cargar las regiones
    if (regionSelect) {
        // Cargar regiones
        chileData.regiones.forEach(region => {
            const option = document.createElement('option');
            option.value = region.nombre;
            option.textContent = region.nombre;
            regionSelect.appendChild(option);
        });

        // Event listener para cargar comunas cuando se selecciona una región
        regionSelect.addEventListener('change', function() {
            const selectedRegion = chileData.regiones.find(r => r.nombre === this.value);

            // Habilitar y limpiar select de comunas
            comunaSelect.disabled = !selectedRegion;
            comunaSelect.innerHTML = '';

            if (selectedRegion) {
                // Agregar opción por defecto
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Selecciona una comuna';
                comunaSelect.appendChild(defaultOption);

                // Agregar comunas
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

    // Manejar formulario de registro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Manejar formulario de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para manejar el registro
function handleRegister(e) {
    e.preventDefault();

    // Obtener valores del formulario
    const username = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const region = document.getElementById('region').value;
    const comuna = document.getElementById('comuna').value;
    const favoritePizza = document.getElementById('favorite-pizza').value.trim();

    // Validaciones
    let isValid = true;

    // Validar nombre de usuario
    if (!username) {
        showError('username-error', 'El nombre de usuario es obligatorio');
        isValid = false;
    } else if (username.length > 100) {
        showError('username-error', 'El nombre de usuario no puede tener más de 100 caracteres');
        isValid = false;
    } else {
        clearError('username-error');
    }

    // Validar email
    if (!email) {
        showError('email-error', 'El email es obligatorio');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email-error', 'Por favor ingresa un email válido');
        isValid = false;
    } else {
        clearError('email-error');
    }

    // Validar contraseña
    if (!password) {
        showError('password-error', 'La contraseña es obligatoria');
        isValid = false;
    } else if (password.length < 4 || password.length > 10) {
        showError('password-error', 'La contraseña debe tener entre 4 y 10 caracteres');
        isValid = false;
    } else {
        clearError('password-error');
    }

    // Validar confirmación de contraseña
    if (!confirmPassword) {
        showError('confirm-password-error', 'Debes confirmar tu contraseña');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError('confirm-password-error', 'Las contraseñas no coinciden');
        isValid = false;
    } else {
        clearError('confirm-password-error');
    }

    // Si hay errores, detener el proceso
    if (!isValid) return;

    // Obtener usuarios existentes del localStorage
    const users = JSON.parse(localStorage.getItem('pixeleriaUsers')) || [];

    // Verificar si el usuario ya existe
    if (users.some(user => user.username === username)) {
        showError('username-error', 'Este nombre de usuario ya está registrado');
        return;
    }

    if (users.some(user => user.email === email)) {
        showError('email-error', 'Este email ya está registrado');
        return;
    }

    // Crear nuevo usuario
    const newUser = {
        username,
        email,
        password, // En un caso real, esto debería estar encriptado
        region,
        comuna,
        favoritePizza,
        registrationDate: new Date().toISOString()
    };

    // Guardar usuario
    users.push(newUser);
    localStorage.setItem('pixeleriaUsers', JSON.stringify(users));

    // Mostrar mensaje de éxito
    showMessage('Registro exitoso. Ahora puedes iniciar sesión.', 'success');

    // Redirigir después de 2 segundos
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

// Función para manejar el inicio de sesión
function handleLogin(e) {
    e.preventDefault();

    // Obtener valores del formulario
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    // Validaciones
    let isValid = true;

    if (!username) {
        showError('username-error', 'El nombre de usuario es obligatorio');
        isValid = false;
    } else {
        clearError('username-error');
    }

    if (!password) {
        showError('password-error', 'La contraseña es obligatoria');
        isValid = false;
    } else {
        clearError('password-error');
    }

    // Si hay errores, detener el proceso
    if (!isValid) return;

    // Obtener usuarios del localStorage
    const users = JSON.parse(localStorage.getItem('pixeleriaUsers')) || [];

    // Buscar usuario
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Guardar sesión (en un caso real, usaríamos tokens más seguros)
        sessionStorage.setItem('currentUser', JSON.stringify({
            username: user.username,
            email: user.email
        }));

        // Mostrar mensaje de éxito
        showMessage('Inicio de sesión exitoso. Redirigiendo...', 'success');

        // Redirigir después de 2 segundos
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } else {
        showMessage('Nombre de usuario o contraseña incorrectos', 'error');
    }
}

// Función para mostrar errores
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Función para limpiar errores
function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
    }
}

// Función para mostrar mensajes
function showMessage(message, type) {
    // Eliminar mensajes anteriores
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());

    // Crear nuevo mensaje
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;

    // Insertar después del formulario
    const form = document.querySelector('form');
    if (form) {
        form.parentNode.insertBefore(messageDiv, form.nextSibling);
    }
}