// CONFIGURACIÓN DE SUPABASE
const SUPABASE_URL = 'https://uxniiocjqtjdwnhfukbp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_VOeq_mpLHpMzI-WQH9mLtA_7W5f3AR_'; 
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const authScreen = document.getElementById('auth-screen');
const authForm = document.getElementById('authForm');
const authEmail = document.getElementById('authEmail');
const authPassword = document.getElementById('authPassword');
const authSubmitBtn = document.getElementById('authSubmitBtn');
const authToggleBtn = document.getElementById('authToggleBtn');
const togglePasswordBtn = document.getElementById('togglePassword');

let isRegistering = false;
let currentDayEntrenamiento = "lun";
let currentDayNutricion = "lun";

let editingDiaKey = null;
let editingIndex = null;

function verificarAdmin(user) {
  const adminMenuBtn = document.getElementById('adminMenuBtn');
  if (user && user.email === 'luchoaversa@gmail.com') {
    if (adminMenuBtn) adminMenuBtn.style.display = 'block';
    document.body.classList.add('is-admin'); 
  } else {
    if (adminMenuBtn) adminMenuBtn.style.display = 'none';
    document.body.classList.remove('is-admin');
  }
}

supabaseClient.auth.getUser().then(({ data: { user } }) => {
  verificarAdmin(user);
});

if (togglePasswordBtn && authPassword) {
  togglePasswordBtn.addEventListener('click', () => {
    const type = authPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    authPassword.setAttribute('type', type);
    togglePasswordBtn.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
  });
}

if (authToggleBtn) {
  authToggleBtn.addEventListener('click', () => {
    isRegistering = !isRegistering;
    if (isRegistering) {
      authSubmitBtn.textContent = "REGISTRARSE";
      authToggleBtn.textContent = "¿Ya tienes cuenta? Inicia sesión";
    } else {
      authSubmitBtn.textContent = "INICIAR SESIÓN";
      authToggleBtn.textContent = "¿No tienes cuenta? Regístrate aquí";
    }
  });
}

if (authForm) {
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = authEmail.value;
    const password = authPassword.value;

    if (isRegistering) {
      const { data, error } = await supabaseClient.auth.signUp({ email, password });
      if (error) alert("Error al registrarse: " + error.message);
      else {
        alert("¡Registro exitoso! Ya puedes iniciar sesión.");
        isRegistering = false;
        authSubmitBtn.textContent = "INICIAR SESIÓN";
        authToggleBtn.textContent = "¿No tienes cuenta? Regístrate aquí";
      }
    } else {
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) alert("Credenciales incorrectas o error: " + error.message);
      else {
        authScreen.style.display = 'none';
        const user = data.user;
        verificarAdmin(user);

        const secInicio = document.getElementById('sec-inicio');
        if (secInicio) secInicio.classList.add('active');
      }
    }
  });
}

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');

const menuItems = document.querySelectorAll('.menu-item');
const sections = document.querySelectorAll('.app-section');

if (openMenu) {
  openMenu.addEventListener('click', () => {
    sidebar.classList.add('open');
    overlay.classList.add('active');
  });
}

const cerrarMenu = () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
};

if (closeMenu) closeMenu.addEventListener('click', cerrarMenu);
if (overlay) overlay.addEventListener('click', cerrarMenu);

menuItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = item.getAttribute('data-target');
    sections.forEach(sec => sec.classList.remove('active'));

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
      
      const singleView = targetSection.querySelector('.view-single');
      const fullView = targetSection.querySelector('.view-full');
      const muscleView = targetSection.querySelector('.view-muscle-videos');
      
      if (singleView) singleView.classList.remove('hidden');
      if (fullView) fullView.classList.add('hidden');
      if (muscleView) muscleView.classList.add('hidden');
    }
    cerrarMenu();
  });
});

const dayBars = document.querySelectorAll('.days-bar');
dayBars.forEach(bar => {
  const buttons = bar.querySelectorAll('.day-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const parentSection = bar.closest('.app-section');
      const titleSpan = parentSection.querySelector('h2 .accent');
      if (titleSpan) {
        titleSpan.textContent = `[ ${btn.textContent} ]`;
      }
    });
  });
});

const btnVerCompleto = document.querySelectorAll('.btn-ver-completo');
const btnVolver = document.querySelectorAll('.btn-volver');

btnVerCompleto.forEach(btn => {
  btn.addEventListener('click', () => {
    const parentSection = btn.closest('.app-section');
    const singleView = parentSection.querySelector('.view-single');
    const fullView = parentSection.querySelector('.view-full');

    if (singleView && fullView) {
      singleView.classList.add('hidden');
      fullView.classList.remove('hidden');
    }
  });
});

btnVolver.forEach(btn => {
  btn.addEventListener('click', () => {
    const parentSection = btn.closest('.app-section');
    const singleView = parentSection.querySelector('.view-single');
    const fullView = parentSection.querySelector('.view-full');

    if (singleView && fullView) {
      fullView.classList.add('hidden');
      singleView.classList.remove('hidden');
    }
  });
});

const muscleCards = document.querySelectorAll('#sec-entrenamiento .idea-square-card');
const muscleView = document.querySelector('.view-muscle-videos');
const singleViewTraining = document.querySelector('#sec-entrenamiento .view-single');
const muscleTitle = document.getElementById('muscleTitle');
const btnVolverMusculo = document.getElementById('btnVolverMusculo');

muscleCards.forEach(card => {
  card.addEventListener('click', () => {
    const muscleName = card.getAttribute('data-muscle');
    if (muscleName && muscleTitle && muscleView && singleViewTraining) {
      muscleTitle.textContent = `EJERCICIOS DE ${muscleName.toUpperCase()}`;
      singleViewTraining.classList.add('hidden');
      muscleView.classList.remove('hidden');
    }
  });
});

if (btnVolverMusculo && muscleView && singleViewTraining) {
  btnVolverMusculo.addEventListener('click', () => {
    muscleView.classList.add('hidden');
    singleViewTraining.classList.remove('hidden');
  });
}

// 1. BASE DE DATOS DE ENTRENAMIENTO
const planEntrenamientoDefault = {
  lun: {
    dia: "[ LUN ]",
    enfoque: "Enfoque: Piernas (Cuádriceps & Glúteos)",
    ejercicios: [
      { nombre: "1. Sentadilla Pesada con Barra", series: "4x8", video: "", ejecucion: "Mantener espalda recta, bajar rompiendo el paralelo a 90° e impulsar con los talones." },
      { nombre: "2. Prensa 45°", series: "4x10", video: "", ejecucion: "Pies a la anchura de hombros, bajar de forma controlada sin despegar la cadera." },
      { nombre: "3. Estocadas Pasantes", series: "3x12", video: "", ejecucion: "Paso largo hacia adelante manteniendo el torso vertical." },
      { nombre: "4. Sillón de Cuádriceps", series: "3x15", video: "", ejecucion: "Extensión completa pausando 1 segundo en la parte superior." },
      { nombre: "5. Gemelos de Pie", series: "4x20", video: "", ejecucion: "Elevación máxima en punta de pies y descenso lento." }
    ]
  },
  mar: {
    dia: "[ MAR ]",
    enfoque: "Enfoque: Pecho & Tríceps",
    ejercicios: [
      { nombre: "1. Press Plano con Barra", series: "4x8", video: "", ejecucion: "Bajar la barra al esternón con retracción escapular." },
      { nombre: "2. Press Inclinado con Mancuernas", series: "4x10", video: "", ejecucion: "Banco a 30°, apertura controlada alineando codos." },
      { nombre: "3. Cruce de Poleas Altas", series: "3x12", video: "", ejecucion: "Llevar las manos al centro apretando el pectoral." },
      { nombre: "4. Press Francés", series: "3x10", video: "", ejecucion: "Codos fijos apuntando al techo, bajar hacia la frente." },
      { nombre: "5. Extensión en Polea Alta", series: "3x12", video: "", ejecucion: "Extender brazos hacia abajo abriendo la cuerda al final." }
    ]
  },
  mie: {
    dia: "[ MIÉ ]",
    enfoque: "Enfoque: Descanso Activo / Cardio",
    ejercicios: [
      { nombre: "1. Caminata Inclinada en Cinta", series: "30 min", video: "", ejecucion: "Inclinación 8-10, ritmo constante sin sostenerse." }
    ]
  },
  jue: {
    dia: "[ JUE ]",
    enfoque: "Enfoque: Espalda & Bíceps",
    ejercicios: [
      { nombre: "1. Jalón al Pecho", series: "4x8", video: "", ejecucion: "Traccionar la barra hacia el pecho enfocando los codos." },
      { nombre: "2. Remo con Barra", series: "4x10", video: "", ejecucion: "Torso a 45°, halar la barra hacia el ombligo." },
      { nombre: "3. Remo Unilateral Mancuerna", series: "3x12", video: "", ejecucion: "Traer la mancuerna hacia la cadera en curva." },
      { nombre: "4. Curl Bíceps Barra Z", series: "3x10", video: "", ejecucion: "Codos pegados a los costados sin balancear la espalda." },
      { nombre: "5. Curl Martillo", series: "3x12", video: "", ejecucion: "Agarre neutro enfocado en el braquial y antebrazos." }
    ]
  },
  vie: {
    dia: "[ VIE ]",
    enfoque: "Enfoque: Hombros & Abdomen",
    ejercicios: [
      { nombre: "1. Press Militar Mancuernas", series: "4x8", video: "", ejecucion: "Empujar verticalmente sin arquear en exceso la espalda." },
      { nombre: "2. Vuelos Laterales", series: "4x12", video: "", ejecucion: "Elevar brazos levemente alineados a los hombros." },
      { nombre: "3. Pájaros en Polea", series: "3x15", video: "", ejecucion: "Enfocar la tracción en el deltoides posterior." },
      { nombre: "4. Crunch Abdominal", series: "4x15", video: "", ejecucion: "Flexionar la columna contrayendo fuertemente el abdomen." },
      { nombre: "5. Plancha Isométrica", series: "3x60s", video: "", ejecucion: "Cuerpo alineado, glúteos y abdomen en tensión constante." }
    ]
  },
  sab: {
    dia: "[ SÁB ]",
    enfoque: "Enfoque: Isquios & Glúteos",
    ejercicios: [
      { nombre: "1. Hip Thrust", series: "4x8", video: "", ejecucion: "Empujar con la cadera contrayendo glúteos arriba." },
      { nombre: "2. Peso Muerto Rumano", series: "4x10", video: "", ejecucion: "Llevar la cadera hacia atrás sintiendo el estiramiento en isquios." },
      { nombre: "3. Camilla Femoral", series: "3x12", video: "", ejecucion: "Flexión de piernas sin levantar la pelvis del banco." },
      { nombre: "4. Prensa Pies Altos", series: "3x12", video: "", ejecucion: "Pies arriba y abiertos para enfoque en cadena posterior." },
      { nombre: "5. Abductores en Máquina", series: "4x15", video: "", ejecucion: "Apertura completa sosteniendo 1 segundo la contracción." }
    ]
  },
  dom: {
    dia: "[ DOM ]",
    enfoque: "Enfoque: Descanso Total",
    ejercicios: [
      { nombre: "Descanso y Recuperación", series: "-", video: "", ejecucion: "Día libre para favorecer la regeneración muscular." }
    ]
  }
};

let planEntrenamiento = JSON.parse(localStorage.getItem('max_planEntrenamiento')) || planEntrenamientoDefault;

// 2. BASE DE DATOS DE NUTRICIÓN
const planNutricionalDefault = {
  lun: {
    dia: "[ LUN ]",
    titulo: "Pollo con Arroz",
    imagen: "",
    ingredientes: ["Pechuga de pollo (200g)", "Arroz integral (80g)", "Verduras salteadas", "Aceite de oliva"],
    preparacion: "Cocinar la pechuga a la plancha con especias al gusto. Hervir el arroz integral con una pizca de sal y saltear las verduras a fuego medio antes de integrar todo."
  },
  mar: {
    dia: "[ MAR ]",
    titulo: "Carne Magra con Papas",
    imagen: "",
    ingredientes: ["Bife magro (250g)", "Papas al horno (200g)", "Romero y orégano", "Aceite de oliva"],
    preparacion: "Dorar el bife a fuego fuerte. Cortar las papas en cubos, condimentar con romero y hornear a 200°C hasta que estén doradas."
  },
  mie: {
    dia: "[ MIÉ ]",
    titulo: "Merluza con Vegetales",
    imagen: "",
    ingredientes: ["Filete de merluza (250g)", "Zapallito y zanahoria", "Jugo de limón", "Pimienta y sal"],
    preparacion: "Cocinar la merluza al horno con un chorrito de limón. Acompañar con vegetales al vapor."
  },
  jue: {
    dia: "[ JUE ]",
    titulo: "Omelette de Espinaca",
    imagen: "",
    ingredientes: ["3 huevos enteros / 2 claras", "Espinaca fresca (100g)", "Queso magro (50g)"],
    preparacion: "Batir huevos, agregar la espinaca salteada y cocinar en sartén antihaderente agregando el queso al final."
  },
  vie: {
    dia: "[ VIE ]",
    titulo: "Solomillo con Batata",
    imagen: "",
    ingredientes: ["Solomillo de cerdo (200g)", "Batata asada (180g)", "Pimentón dulce"],
    preparacion: "Sellar el solomillo en la plancha y acompañar con rodajas de batata doradas al horno."
  },
  sab: {
    dia: "[ SÁB ]",
    titulo: "Pizza Proteica de Avena",
    imagen: "",
    ingredientes: ["Harina de avena (60g)", "2 claras de huevo", "Salsa de tomate", "Queso port salut magro"],
    preparacion: "Mezclar avena y claras, dorar en sartén, colocar salsa, queso y derretir a fuego lento."
  },
  dom: {
    dia: "[ DOM ]",
    titulo: "Ensalada de Atún",
    imagen: "",
    ingredientes: ["1 lata de atún al natural", "1 huevo duro", "Lechuga, tomate y choclo"],
    preparacion: "Mezclar vegetales frescos con el atún escurrido y el huevo picado. Aderezar con aceite de oliva."
  }
};

let planNutricional = JSON.parse(localStorage.getItem('max_planNutricional')) || planNutricionalDefault;

// SUBIDA DE ARCHIVOS A SUPABASE STORAGE ("medios de comunicación")
async function subirASupabaseStorage(file) {
  try {
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const fileName = `${Date.now()}_${cleanFileName}`;

    const { data, error } = await supabaseClient.storage
      .from('archivos')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error("Error al subir en Supabase:", error);
      alert("Error al subir archivo a la nube: " + error.message);
      return null;
    }

    const { data: publicData } = supabaseClient.storage
      .from('archivos')
      .getPublicUrl(fileName);

    return publicData.publicUrl;
  } catch (err) {
    console.error("Excepción en subida:", err);
    alert("Ocurrió un error inesperado al subir el archivo.");
    return null;
  }
}

const editModal = document.getElementById('editModal');
const closeEditModalBtn = document.getElementById('closeEditModal');
const editExerciseForm = document.getElementById('editExerciseForm');

window.editarEjercicio = function(diaKey, index) {
  editingDiaKey = diaKey;
  editingIndex = index;
  const ej = planEntrenamiento[diaKey].ejercicios[index];

  document.getElementById('editNombre').value = ej.nombre;
  document.getElementById('editSeries').value = ej.series;
  document.getElementById('editTecnica').value = ej.ejecucion;
  document.getElementById('editVideoFile').value = "";

  if (editModal) editModal.classList.add('active-modal');
};

if (closeEditModalBtn && editModal) {
  closeEditModalBtn.addEventListener('click', () => editModal.classList.remove('active-modal'));
  editModal.addEventListener('click', (e) => { if (e.target === editModal) editModal.classList.remove('active-modal'); });
}

if (editExerciseForm) {
  editExerciseForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (editingDiaKey === null || editingIndex === null) return;

    const btnGuardar = editExerciseForm.querySelector('button[type="submit"]');
    if (btnGuardar) {
      btnGuardar.disabled = true;
      btnGuardar.textContent = "Guardando...";
    }

    const ej = planEntrenamiento[editingDiaKey].ejercicios[editingIndex];
    ej.nombre = document.getElementById('editNombre').value;
    ej.series = document.getElementById('editSeries').value;
    ej.ejecucion = document.getElementById('editTecnica').value;

    const archivoInput = document.getElementById('editVideoFile');
    if (archivoInput && archivoInput.files && archivoInput.files[0]) {
      const urlNube = await subirASupabaseStorage(archivoInput.files[0]);
      if (urlNube) {
        ej.video = urlNube;
      }
    }

    localStorage.setItem('max_planEntrenamiento', JSON.stringify(planEntrenamiento));

    cargarDiaEntrenamiento(editingDiaKey);
    cargarResumenSemanalEntrenamiento();

    if (btnGuardar) {
      btnGuardar.disabled = false;
      btnGuardar.textContent = "GUARDAR CAMBIOS 💾";
    }

    if (editModal) editModal.classList.remove('active-modal');
  });
}

window.eliminarEjercicio = function(diaKey, index) {
  if (confirm("¿Seguro que deseas eliminar este ejercicio?")) {
    planEntrenamiento[diaKey].ejercicios.splice(index, 1);
    localStorage.setItem('max_planEntrenamiento', JSON.stringify(planEntrenamiento));
    cargarDiaEntrenamiento(diaKey);
    cargarResumenSemanalEntrenamiento();
  }
};

const editNutriModal = document.getElementById('editNutriModal');
const closeEditNutriModal = document.getElementById('closeEditNutriModal');
const editNutriForm = document.getElementById('editNutriForm');
const btnEditarNutricionDirecto = document.getElementById("btnEditarNutricionDirecto");

if (btnEditarNutricionDirecto) {
  btnEditarNutricionDirecto.addEventListener("click", () => {
    const data = planNutricional[currentDayNutricion];
    document.getElementById('editNutriTitulo').value = data.titulo;
    document.getElementById('editNutriPrep').value = data.preparacion;
    document.getElementById('editNutriImgFile').value = "";

    if (editNutriModal) editNutriModal.classList.add('active-modal');
  });
}

if (closeEditNutriModal && editNutriModal) {
  closeEditNutriModal.addEventListener('click', () => editNutriModal.classList.remove('active-modal'));
  editNutriModal.addEventListener('click', (e) => { if (e.target === editNutriModal) editNutriModal.classList.remove('active-modal'); });
}

window.cargarResumenSemanalNutricion = function() {
  const elNutriScrollSemanal = document.getElementById('nutricionScrollSemanal');
  if (!elNutriScrollSemanal) return;
  elNutriScrollSemanal.innerHTML = "";

  Object.keys(planNutricional).forEach(key => {
    const d = planNutricional[key];
    const card = document.createElement("div");
    card.className = "card nutricion mb";

    let ingrHTML = d.ingredientes.map(i => `<li>${i}</li>`).join("");
    let imgHTML = d.imagen ? `<img src="${d.imagen}" alt="${d.titulo}" class="comida-img">` : `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:0.7rem;color:#666;text-align:center;">Sin foto</div>`;

    card.innerHTML = `
      <div class="card-header"><h2>${d.dia}</h2><span class="accent">${d.titulo}</span></div>
      <div class="comida-item-horizontal">
        <div class="comida-img-box">${imgHTML}</div>
        <div class="comida-info">
          <div class="comida-seccion"><strong>Ingredientes:</strong><ul class="comida-lista">${ingrHTML}</ul></div>
          <div class="comida-seccion"><strong>Preparación:</strong><p class="comida-text">${d.preparacion}</p></div>
        </div>
      </div>
    `;
    elNutriScrollSemanal.appendChild(card);
  });
};

if (editNutriForm) {
  editNutriForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btnGuardar = editNutriForm.querySelector('button[type="submit"]');
    if (btnGuardar) {
      btnGuardar.disabled = true;
      btnGuardar.textContent = "Guardando...";
    }

    const data = planNutricional[currentDayNutricion];
    data.titulo = document.getElementById('editNutriTitulo').value;
    data.preparacion = document.getElementById('editNutriPrep').value;

    const imgInput = document.getElementById('editNutriImgFile');
    if (imgInput && imgInput.files && imgInput.files[0]) {
      const urlNube = await subirASupabaseStorage(imgInput.files[0]);
      if (urlNube) {
        data.imagen = urlNube;
      }
    }

    localStorage.setItem('max_planNutricional', JSON.stringify(planNutricional));

    cargarDiaNutricion(currentDayNutricion);
    window.cargarResumenSemanalNutricion();

    if (btnGuardar) {
      btnGuardar.disabled = false;
      btnGuardar.textContent = "GUARDAR CAMBIOS 💾";
    }

    if (editNutriModal) {
      editNutriModal.classList.remove('active-modal');
      editNutriModal.classList.remove('active');
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const botonesDiasEntrenamiento = document.querySelectorAll("#sec-entrenamiento .days-bar .day-btn");
  const elEntrenDia = document.getElementById("entrenamientoDiaTitulo");
  const elEntrenEnfoque = document.getElementById("entrenamientoEnfoque");
  const elEntrenLista = document.getElementById("entrenamientoListaEjercicios");
  const elEntrenScrollSemanal = document.getElementById("entrenamientoScrollSemanal");

  window.cargarDiaEntrenamiento = function(diaKey) {
    currentDayEntrenamiento = diaKey;
    const data = planEntrenamiento[diaKey];
    if (!data || !elEntrenLista) return;

    if (elEntrenDia) elEntrenDia.textContent = data.dia;
    if (elEntrenEnfoque) elEntrenEnfoque.textContent = data.enfoque;
    elEntrenLista.innerHTML = "";

    if (data.ejercicios.length === 0) {
      elEntrenLista.innerHTML = `<p style="color: #888; font-size: 0.85rem; text-align: center; padding: 15px;">No hay ejercicios cargados.</p>`;
      return;
    }

    data.ejercicios.forEach((ej, idx) => {
      const div = document.createElement("div");
      div.className = "ejercicio-item";

      const videoHTML = ej.video 
        ? `<div class="video-box"><video src="${ej.video}" controls preload="metadata"></video></div>`
        : `<div style="background: #1a1a1a; padding: 15px; text-align: center; color: #888; font-size: 0.8rem; border-radius: 6px; margin-bottom: 8px;">Sin video cargado. Haz clic en editar para subir uno.</div>`;

      div.innerHTML = `
        <div class="ejercicio-header">
          <div class="ejercicio-info-main">
            <span class="ejercicio-nombre">${ej.nombre}</span>
            <span class="ejercicio-series">${ej.series}</span>
          </div>
          <span class="ejercicio-arrow">▼</span>
        </div>
        <div class="ejercicio-body">
          ${videoHTML}
          <p class="ejercicio-ejecucion"><strong>Técnica:</strong> ${ej.ejecucion}</p>

          <div class="admin-edit-tools">
            <button class="admin-pencil-btn" onclick="editarEjercicio('${diaKey}', ${idx})">✏️ Editar Ejercicio / Video</button>
            <button class="admin-trash-btn" onclick="eliminarEjercicio('${diaKey}', ${idx})">🗑️ Eliminar</button>
          </div>
        </div>
      `;

      const header = div.querySelector('.ejercicio-header');
      header.addEventListener('click', () => {
        const estaActivo = div.classList.contains('active');
        const itemsAbiertos = elEntrenLista.querySelectorAll('.ejercicio-item.active');
        itemsAbiertos.forEach(item => item.classList.remove('active'));

        if (!estaActivo) {
          div.classList.add('active');
        }
      });

      elEntrenLista.appendChild(div);
    });
  };

  window.cargarResumenSemanalEntrenamiento = function() {
    if (!elEntrenScrollSemanal) return;
    elEntrenScrollSemanal.innerHTML = "";

    Object.keys(planEntrenamiento).forEach(key => {
      const d = planEntrenamiento[key];
      const card = document.createElement("div");
      card.className = "card entrenamiento mb";

      let itemsHTML = "";
      if(d.ejercicios.length === 0) {
        itemsHTML = `<p style="color: #888; font-size: 0.8rem;">Sin ejercicios</p>`;
      } else {
        d.ejercicios.forEach(e => {
          itemsHTML += `
            <div class="resumen-ejercicio-item">
              <span class="resumen-nombre">${e.nombre}</span>
              <span class="resumen-series">${e.series}</span>
            </div>
          `;
        });
      }

      card.innerHTML = `
        <div class="card-header">
          <h2>${d.dia}</h2>
          <span class="accent">${d.enfoque}</span>
        </div>
        <div>${itemsHTML}</div>
      `;
      elEntrenScrollSemanal.appendChild(card);
    });
  };

  botonesDiasEntrenamiento.forEach(boton => {
    boton.addEventListener("click", () => {
      botonesDiasEntrenamiento.forEach(b => b.classList.remove("active"));
      boton.classList.add("active");
      const diaKey = boton.getAttribute("data-day");
      cargarDiaEntrenamiento(diaKey);
    });
  });

  const botonesDiasNutricion = document.querySelectorAll("#sec-nutricion .days-bar .day-btn");
  const elDiaTitulo = document.getElementById("nutricionDiaTitulo");
  const elPlatoTitulo = document.getElementById("nutricionPlatoTitulo");
  const elImg = document.getElementById("nutricionImg");
  const elIngredientes = document.getElementById("nutricionIngredientes");
  const elPreparacion = document.getElementById("nutricionPreparacion");

  window.cargarDiaNutricion = function(diaKey) {
    currentDayNutricion = diaKey;
    const data = planNutricional[diaKey];
    if (!data) return;

    if (elDiaTitulo) elDiaTitulo.textContent = data.dia;
    if (elPlatoTitulo) elPlatoTitulo.textContent = data.titulo;
    if (elImg) {
      if(data.imagen) {
        elImg.src = data.imagen;
        elImg.style.display = "block";
      } else {
        elImg.src = "";
        elImg.style.display = "none";
      }
      elImg.alt = data.titulo;
    }
    if (elPreparacion) elPreparacion.textContent = data.preparacion;

    if (elIngredientes) {
      elIngredientes.innerHTML = "";
      data.ingredientes.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        elIngredientes.appendChild(li);
      });
    }
  };

  botonesDiasNutricion.forEach(boton => {
    boton.addEventListener("click", () => {
      botonesDiasNutricion.forEach(b => b.classList.remove("active"));
      boton.classList.add("active");
      const diaKey = boton.getAttribute("data-day");
      cargarDiaNutricion(diaKey);
    });
  });

  cargarDiaEntrenamiento("lun");
  cargarResumenSemanalEntrenamiento();
  cargarDiaNutricion("lun");
  window.cargarResumenSemanalNutricion();
});