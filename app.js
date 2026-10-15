const SUPABASE_URL = 'https://uxniiocjqtjdwnhfukbp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_VOeq_mpLHpMzI-WQH9mLtA_7W5f3AR_';
const STORAGE_BUCKET = 'max-hybrid-media';
const supabaseReady = SUPABASE_URL.startsWith('https://') && !SUPABASE_URL.includes('PEGAR_') && !SUPABASE_ANON_KEY.includes('PEGAR_');
const supabaseClient = supabaseReady ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const planEntrenamientoDefault = {
  lun: {
    dia: "[ LUN ]",
    enfoque: "Enfoque: Piernas (Cuádriceps & Glúteos)",
    ejercicios: [
      { nombre: "1. Sentadilla Pesada con Barra", series: "4x8", videoKey: "", ejecucion: "Mantener espalda recta, bajar rompiendo el paralelo a 90° e impulsar con los talones." },
      { nombre: "2. Prensa 45°", series: "4x10", videoKey: "", ejecucion: "Pies a la anchura de hombros, bajar de forma controlada sin despegar la cadera." },
      { nombre: "3. Estocadas Pasantes", series: "3x12", videoKey: "", ejecucion: "Paso largo hacia adelante manteniendo el torso vertical." },
      { nombre: "4. Sillón de Cuádriceps", series: "3x15", videoKey: "", ejecucion: "Extensión completa pausando 1 segundo en la parte superior." },
      { nombre: "5. Gemelos de Pie", series: "4x20", videoKey: "", ejecucion: "Elevación máxima en punta de pies y descenso lento." }
    ]
  },
  mar: {
    dia: "[ MAR ]",
    enfoque: "Enfoque: Pecho & Tríceps",
    ejercicios: [
      { nombre: "1. Press Plano con Barra", series: "4x8", videoKey: "", ejecucion: "Bajar la barra al esternón con retracción escapular." },
      { nombre: "2. Press Inclinado con Mancuernas", series: "4x10", videoKey: "", ejecucion: "Banco a 30°, apertura controlada alineando codos." },
      { nombre: "3. Cruce de Poleas Altas", series: "3x12", videoKey: "", ejecucion: "Llevar las manos al centro apretando el pectoral." },
      { nombre: "4. Press Francés", series: "3x10", videoKey: "", ejecucion: "Codos fijos apuntando al techo, bajar hacia la frente." },
      { nombre: "5. Extensión en Polea Alta", series: "3x12", videoKey: "", ejecucion: "Extender brazos hacia abajo abriendo la cuerda al final." }
    ]
  },
  mie: {
    dia: "[ MIÉ ]",
    enfoque: "Enfoque: Descanso Activo / Cardio",
    ejercicios: [
      { nombre: "1. Caminata Inclinada en Cinta", series: "30 min", videoKey: "", ejecucion: "Inclinación 8-10, ritmo constante sin sostenerse." }
    ]
  },
  jue: {
    dia: "[ JUE ]",
    enfoque: "Enfoque: Espalda & Bíceps",
    ejercicios: [
      { nombre: "1. Jalón al Pecho", series: "4x8", videoKey: "", ejecucion: "Traccionar la barra hacia el pecho enfocando los codos." },
      { nombre: "2. Remo con Barra", series: "4x10", videoKey: "", ejecucion: "Torso a 45°, halar la barra hacia el ombligo." },
      { nombre: "3. Remo Unilateral Mancuerna", series: "3x12", videoKey: "", ejecucion: "Traer la mancuerna hacia la cadera en curva." },
      { nombre: "4. Curl Bíceps Barra Z", series: "3x10", videoKey: "", ejecucion: "Codos pegados a los costados sin balancear la espalda." },
      { nombre: "5. Curl Martillo", series: "3x12", videoKey: "", ejecucion: "Agarre neutro enfocado en el braquial y antebrazos." }
    ]
  },
  vie: {
    dia: "[ VIE ]",
    enfoque: "Enfoque: Hombros & Abdomen",
    ejercicios: [
      { nombre: "1. Press Militar Mancuernas", series: "4x8", videoKey: "", ejecucion: "Empujar verticalmente sin arquear en exceso la espalda." },
      { nombre: "2. Vuelos Laterales", series: "4x12", videoKey: "", ejecucion: "Elevar brazos levemente alineados a los hombros." },
      { nombre: "3. Pájaros en Polea", series: "3x15", videoKey: "", ejecucion: "Enfocar la tracción en el deltoides posterior." },
      { nombre: "4. Crunch Abdominal", series: "4x15", videoKey: "", ejecucion: "Flexionar la columna contrayendo fuertemente el abdomen." },
      { nombre: "5. Plancha Isométrica", series: "3x60s", videoKey: "", ejecucion: "Cuerpo alineado, glúteos y abdomen en tensión constante." }
    ]
  },
  sab: {
    dia: "[ SÁB ]",
    enfoque: "Enfoque: Isquios & Glúteos",
    ejercicios: [
      { nombre: "1. Hip Thrust", series: "4x8", videoKey: "", ejecucion: "Empujar con la cadera contrayendo glúteos arriba." },
      { nombre: "2. Peso Muerto Rumano", series: "4x10", videoKey: "", ejecucion: "Llevar la cadera hacia atrás sintiendo el estiramiento en isquios." },
      { nombre: "3. Camilla Femoral", series: "3x12", videoKey: "", ejecucion: "Flexión de piernas sin levantar la pelvis del banco." },
      { nombre: "4. Prensa Pies Altos", series: "3x12", videoKey: "", ejecucion: "Pies arriba y abiertos para enfoque en cadena posterior." },
      { nombre: "5. Abductores en Máquina", series: "4x15", videoKey: "", ejecucion: "Apertura completa sosteniendo 1 segundo la contracción." }
    ]
  },
  dom: {
    dia: "[ DOM ]",
    enfoque: "Enfoque: Descanso Total",
    ejercicios: [
      { nombre: "Descanso y Recuperación", series: "-", videoKey: "", ejecucion: "Día libre para favorecer la regeneración muscular." }
    ]
  }
};

const planNutricionalDefault = {
  lun: {
    dia: "[ LUN ]",
    titulo: "Pollo con Arroz",
    imgKey: "",
    ingredientes: ["Pechuga de pollo (200g)", "Arroz integral (80g)", "Verduras salteadas", "Aceite de oliva"],
    preparacion: "Cocinar la pechuga a la plancha con especias al gusto. Hervir el arroz integral con una pizca de sal y saltear las verduras a fuego medio antes de integrar todo."
  },
  mar: {
    dia: "[ MAR ]",
    titulo: "Carne Magra con Papas",
    imgKey: "",
    ingredientes: ["Bife magro (250g)", "Papas al horno (200g)", "Romero y orégano", "Aceite de oliva"],
    preparacion: "Dorar el bife a fuego fuerte. Cortar las papas en cubos, condimentar con romero y hornear a 200°C hasta que estén doradas."
  },
  mie: {
    dia: "[ MIÉ ]",
    titulo: "Merluza con Vegetales",
    imgKey: "",
    ingredientes: ["Filete de merluza (250g)", "Zapallito y zanahoria", "Jugo de limón", "Pimienta y sal"],
    preparacion: "Cocinar la merluza al horno con un chorrito de limón. Acompañar con vegetales al vapor."
  },
  jue: {
    dia: "[ JUE ]",
    titulo: "Omelette de Espinaca",
    imgKey: "",
    ingredientes: ["3 huevos enteros / 2 claras", "Espinaca fresca (100g)", "Queso magro (50g)"],
    preparacion: "Batir huevos, agregar la espinaca salteada y cocinar en sartén antihaderente agregando el queso al final."
  },
  vie: {
    dia: "[ VIE ]",
    titulo: "Solomillo con Batata",
    imgKey: "",
    ingredientes: ["Solomillo de cerdo (200g)", "Batata asada (180g)", "Pimentón dulce"],
    preparacion: "Sellar el solomillo en la plancha y acompañar con rodajas de batata doradas al horno."
  },
  sab: {
    dia: "[ SÁB ]",
    titulo: "Pizza Proteica de Avena",
    imgKey: "",
    ingredientes: ["Harina de avena (60g)", "2 claras de huevo", "Salsa de tomate", "Queso port salut magro"],
    preparacion: "Mezclar avena y claras, dorar en sartén, colocar salsa, queso y derretir a fuego lento."
  },
  dom: {
    dia: "[ DOM ]",
    titulo: "Ensalada de Atún",
    imgKey: "",
    ingredientes: ["1 lata de atún al natural", "1 huevo duro", "Lechuga, tomate y choclo"],
    preparacion: "Mezclar vegetales frescos con el atún escurrido y el huevo picado. Aderezar con aceite de oliva."
  }
};


let currentUser = null;
let currentProfile = null;
let currentTargetUserId = null;
let currentTargetEmail = null;
let currentTraining = null;
let currentNutrition = null;
let currentDayEntrenamiento = 'lun';
let currentDayNutricion = 'lun';
let editingDiaKey = null;
let editingIndex = null;
let isRegistering = false;

function obtenerBaseDatosNube() {
  return { global_entrenamiento: currentTraining || structuredClone(planEntrenamientoDefault), global_nutricion: currentNutrition || structuredClone(planNutricionalDefault) };
}
function escaparHTML(value = '') {
  return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
function informar(error, fallback = 'Ocurrió un error. Revisá la configuración y volvé a intentar.') {
  console.error(error);
  alert(error?.message || fallback);
}
function verificarAdmin() {
  const name = document.getElementById('userDisplayName');
  if (name && currentUser) name.textContent = (currentProfile?.display_name || currentUser.email.split('@')[0]).toUpperCase();
  document.body.classList.toggle('is-admin', currentProfile?.role === 'admin');
  const panel = document.getElementById('adminPanel');
  const adminMenu = document.getElementById('adminMenuItem');
  const isAdmin = currentProfile?.role === 'admin';
  if (panel) panel.hidden = !isAdmin;
  if (adminMenu) adminMenu.hidden = !isAdmin;
  const editNutri = document.getElementById('btnEditarNutricionDirecto');
  if (editNutri) editNutri.style.display = currentProfile?.role === 'admin' ? '' : 'none';
}
async function obtenerURLArchivo(path) {
  if (!path) return '';
  const { data, error } = await supabaseClient.storage.from(STORAGE_BUCKET).createSignedUrl(path, 3600);
  if (error) { console.warn('No se pudo generar el enlace del archivo', error.message); return ''; }
  return data.signedUrl;
}
async function guardarArchivoDB(key, file) {
  if (!currentTargetUserId) throw new Error('No hay un usuario seleccionado para asignar el archivo.');
  const safeName = (file.name || 'archivo').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9._-]/g, '_').slice(-90);
  const path = `${currentTargetUserId}/${key}_${safeName}`;
  const { error } = await supabaseClient.storage.from(STORAGE_BUCKET).upload(path, file, { upsert: false, contentType: file.type || undefined });
  if (error) throw error;
  return path;
}
async function guardarBaseDatosNube() {
  if (!currentTargetUserId) throw new Error('No hay un plan de usuario seleccionado.');
  const { error } = await supabaseClient.from('user_plans').upsert({ user_id: currentTargetUserId, training: currentTraining, nutrition: currentNutrition, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
  if (error) throw error;
}
async function cargarPlanUsuario(userId, email) {
  currentTargetUserId = userId;
  currentTargetEmail = email;
  const { data, error } = await supabaseClient.from('user_plans').select('training,nutrition').eq('user_id', userId).maybeSingle();
  if (error) throw error;
  if (!data) {
    currentTraining = structuredClone(planEntrenamientoDefault);
    currentNutrition = structuredClone(planNutricionalDefault);
    const { error: insertError } = await supabaseClient.from('user_plans').insert({ user_id: userId, training: currentTraining, nutrition: currentNutrition });
    if (insertError) throw insertError;
  } else {
    currentTraining = data.training || structuredClone(planEntrenamientoDefault);
    currentNutrition = data.nutrition || structuredClone(planNutricionalDefault);
  }
  const adminTarget = document.getElementById('adminTargetLabel');
  if (adminTarget) adminTarget.textContent = currentProfile?.role === 'admin' ? `Editando el plan de: ${email}` : '';
  await refrescarPlanes();
}
async function refrescarPlanes() {
  await window.cargarDiaEntrenamiento(currentDayEntrenamiento);
  window.cargarResumenSemanalEntrenamiento();
  await window.cargarDiaNutricion(currentDayNutricion);
  await window.cargarResumenSemanalNutricion();
}
async function cargarPerfilYAplicacion(authUser) {
  currentUser = authUser;
  const { data: profile, error } = await supabaseClient.from('profiles').select('id,email,role,display_name').eq('id', authUser.id).single();
  if (error) throw error;
  currentProfile = profile;
  verificarAdmin();
  document.getElementById('auth-screen').style.display = 'none';
  const secInicio = document.getElementById('sec-inicio');
  document.querySelectorAll('.app-section').forEach(s => s.classList.remove('active'));
  if (secInicio) secInicio.classList.add('active');
  if (currentProfile.role === 'admin') await cargarListaUsuarios();
  await cargarPlanUsuario(authUser.id, authUser.email);
}
async function cargarListaUsuarios() {
  const wrap = document.getElementById('adminUsersList');
  if (!wrap) return;
  wrap.innerHTML = '<p style="color:#aaa">Cargando usuarios…</p>';
  const { data, error } = await supabaseClient.from('profiles').select('id,email,role,display_name').order('email');
  if (error) { wrap.innerHTML = '<p>No se pudieron cargar los usuarios.</p>'; throw error; }
  wrap.innerHTML = '';
  data.filter(u => u.role !== 'admin').forEach(u => {
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'admin-user-btn';
    btn.textContent = `${u.display_name || u.email} — ${u.email}`;
    btn.addEventListener('click', async () => {
      try {
        await guardarBaseDatosNube();
        await cargarPlanUsuario(u.id, u.email);
        wrap.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      } catch (e) { informar(e); }
    });
    wrap.appendChild(btn);
  });
  if (!data.some(u => u.role !== 'admin')) wrap.innerHTML = '<p style="color:#aaa">Todavía no hay usuarios registrados.</p>';
}
function exigirAdmin() {
  if (currentProfile?.role !== 'admin') throw new Error('Esta acción está reservada al administrador.');
}
function inicializarInterfaz() {
  const authScreen = document.getElementById('auth-screen');
  const authForm = document.getElementById('authForm');
  const authEmail = document.getElementById('authEmail');
  const authPassword = document.getElementById('authPassword');
  const authSubmitBtn = document.getElementById('authSubmitBtn');
  const authToggleBtn = document.getElementById('authToggleBtn');
  const togglePasswordBtn = document.getElementById('togglePassword');
  const logoutBtn = document.getElementById('logoutBtn');
  if (!supabaseReady) {
    const warning = document.createElement('p');
    warning.id = 'configWarning'; warning.style.cssText = 'color:#ff6b63;font-size:.8rem;line-height:1.4;margin-top:8px';
    warning.textContent = 'Falta configurar la URL y la clave publicable de Supabase en app.js.';
    authForm?.appendChild(warning);
  }
  togglePasswordBtn?.addEventListener('click', () => {
    const next = authPassword.type === 'password' ? 'text' : 'password'; authPassword.type = next;
    togglePasswordBtn.textContent = next === 'password' ? '👁️' : '👁️‍🗨️';
  });
  authToggleBtn?.addEventListener('click', () => {
    isRegistering = !isRegistering;
    authSubmitBtn.textContent = isRegistering ? 'REGISTRARSE' : 'INICIAR SESIÓN';
    authToggleBtn.textContent = isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate aquí';
    authPassword.autocomplete = isRegistering ? 'new-password' : 'current-password';
  });
  authForm?.addEventListener('submit', async e => {
    e.preventDefault();
    if (!supabaseReady) { alert('Configurá SUPABASE_URL y SUPABASE_ANON_KEY al comienzo de app.js.'); return; }
    authSubmitBtn.disabled = true;
    try {
      const email = authEmail.value.trim().toLowerCase(); const password = authPassword.value;
      if (isRegistering && password.length < 8) throw new Error('La contraseña debe tener al menos 8 caracteres.');
      if (isRegistering) {
        const { data, error } = await supabaseClient.auth.signUp({ email, password, options: { data: { display_name: email.split('@')[0] } } });
        if (error) throw error;
        if (data.session) await cargarPerfilYAplicacion(data.user);
        else alert('Registro iniciado. Revisá tu correo para confirmar la cuenta y después iniciá sesión.');
      } else {
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await cargarPerfilYAplicacion(data.user);
      }
    } catch (error) { informar(error, 'No se pudo iniciar sesión o registrar la cuenta.'); }
    finally { authSubmitBtn.disabled = false; }
  });
  logoutBtn?.addEventListener('click', async e => { e.preventDefault(); try { await supabaseClient.auth.signOut(); location.reload(); } catch (err) { informar(err); } });

  const sidebar = document.getElementById('sidebar'), overlay = document.getElementById('overlay');
  const openMenu = document.getElementById('openMenu'), closeMenu = document.getElementById('closeMenu');
  const menuItems = document.querySelectorAll('.menu-item'), sections = document.querySelectorAll('.app-section');
  openMenu?.addEventListener('click', () => { sidebar.classList.add('open'); overlay.classList.add('active'); });
  const cerrarMenu = () => { sidebar.classList.remove('open'); overlay.classList.remove('active'); };
  closeMenu?.addEventListener('click', cerrarMenu); overlay?.addEventListener('click', cerrarMenu);
  menuItems.forEach(item => {
    if (item.id === 'logoutBtn') return;
    item.addEventListener('click', e => {
      e.preventDefault(); const targetId = item.getAttribute('data-target');
      sections.forEach(sec => sec.classList.remove('active'));
      const target = document.getElementById(targetId);
      if (target) {
        target.classList.add('active');
        const single = target.querySelector('.view-single'), full = target.querySelector('.view-full'), muscle = target.querySelector('.view-muscle-videos');
        if (single) single.classList.remove('hidden'); if (full) full.classList.add('hidden'); if (muscle) muscle.classList.add('hidden');
      }
      cerrarMenu();
    });
  });
  document.querySelectorAll('.btn-ver-completo').forEach(btn => btn.addEventListener('click', () => {
    const parent = btn.closest('.app-section'), single = parent.querySelector('.view-single'), full = parent.querySelector('.view-full');
    if (single && full) { single.classList.add('hidden'); full.classList.remove('hidden'); }
  }));
  document.querySelectorAll('.btn-volver').forEach(btn => btn.addEventListener('click', () => {
    const parent = btn.closest('.app-section'), single = parent.querySelector('.view-single'), full = parent.querySelector('.view-full');
    if (single && full) { full.classList.add('hidden'); single.classList.remove('hidden'); }
  }));
  const muscleView = document.querySelector('.view-muscle-videos'), singleViewTraining = document.querySelector('#sec-entrenamiento .view-single');
  const muscleTitle = document.getElementById('muscleTitle');
  document.querySelectorAll('#sec-entrenamiento .idea-square-card').forEach(card => card.addEventListener('click', () => {
    const muscle = card.getAttribute('data-muscle');
    if (muscle && muscleTitle && muscleView && singleViewTraining) { muscleTitle.textContent = `EJERCICIOS DE ${muscle.toUpperCase()}`; singleViewTraining.classList.add('hidden'); muscleView.classList.remove('hidden'); }
  }));
  document.getElementById('btnVolverMusculo')?.addEventListener('click', () => { muscleView?.classList.add('hidden'); singleViewTraining?.classList.remove('hidden'); });

  const editModal = document.getElementById('editModal');
  document.getElementById('closeEditModal')?.addEventListener('click', () => editModal.classList.remove('active-modal'));
  editModal?.addEventListener('click', e => { if (e.target === editModal) editModal.classList.remove('active-modal'); });
  window.editarEjercicio = (diaKey, index) => {
    try { exigirAdmin(); editingDiaKey = diaKey; editingIndex = index; const ej = currentTraining[diaKey].ejercicios[index];
      document.getElementById('editNombre').value = ej.nombre; document.getElementById('editSeries').value = ej.series; document.getElementById('editTecnica').value = ej.ejecucion; document.getElementById('editVideoFile').value = '';
      editModal.classList.add('active-modal');
    } catch (e) { informar(e); }
  };
  document.getElementById('editExerciseForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    try {
      exigirAdmin(); const ej = currentTraining[editingDiaKey].ejercicios[editingIndex];
      ej.nombre = document.getElementById('editNombre').value.trim(); ej.series = document.getElementById('editSeries').value.trim(); ej.ejecucion = document.getElementById('editTecnica').value.trim();
      const file = document.getElementById('editVideoFile').files[0];
      if (file) { if (!file.type.startsWith('video/')) throw new Error('Seleccioná un archivo de video.'); ej.videoKey = await guardarArchivoDB(`video_${Date.now()}`, file); }
      await guardarBaseDatosNube(); await window.cargarDiaEntrenamiento(editingDiaKey); window.cargarResumenSemanalEntrenamiento(); editModal.classList.remove('active-modal');
    } catch (err) { informar(err); }
  });
  window.eliminarEjercicio = async (diaKey, index) => {
    try { exigirAdmin(); if (!confirm('¿Seguro que deseas eliminar este ejercicio?')) return; currentTraining[diaKey].ejercicios.splice(index, 1); await guardarBaseDatosNube(); await window.cargarDiaEntrenamiento(diaKey); window.cargarResumenSemanalEntrenamiento(); }
    catch (err) { informar(err); }
  };
  document.getElementById('btnAgregarEjercicio')?.addEventListener('click', async () => {
    try { exigirAdmin(); const nombre = prompt('Nombre del ejercicio:'); if (!nombre?.trim()) return; const series = prompt('Series/repeticiones (ej. 3x12):', '3x12') || '3x12'; const ejecucion = prompt('Técnica / ejecución:') || ''; currentTraining[currentDayEntrenamiento].ejercicios.push({ nombre: nombre.trim(), series: series.trim(), ejecucion: ejecucion.trim(), videoKey: '' }); await guardarBaseDatosNube(); await window.cargarDiaEntrenamiento(currentDayEntrenamiento); window.cargarResumenSemanalEntrenamiento(); }
    catch (err) { informar(err); }
  });

  const editNutriModal = document.getElementById('editNutriModal');
  document.getElementById('closeEditNutriModal')?.addEventListener('click', () => editNutriModal.classList.remove('active-modal'));
  editNutriModal?.addEventListener('click', e => { if (e.target === editNutriModal) editNutriModal.classList.remove('active-modal'); });
  document.getElementById('btnEditarNutricionDirecto')?.addEventListener('click', () => {
    try { exigirAdmin(); const data = currentNutrition[currentDayNutricion];
      document.getElementById('editNutriTitulo').value = data.titulo; document.getElementById('editNutriPrep').value = data.preparacion;
      document.getElementById('editNutriIngredientes').value = (data.ingredientes || []).join('\n'); document.getElementById('editNutriImgFile').value = ''; editNutriModal.classList.add('active-modal');
    } catch (e) { informar(e); }
  });
  document.getElementById('editNutriForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    try { exigirAdmin(); const data = currentNutrition[currentDayNutricion];
      data.titulo = document.getElementById('editNutriTitulo').value.trim(); data.preparacion = document.getElementById('editNutriPrep').value.trim();
      data.ingredientes = document.getElementById('editNutriIngredientes').value.split('\n').map(x => x.trim()).filter(Boolean);
      const file = document.getElementById('editNutriImgFile').files[0];
      if (file) { if (!file.type.startsWith('image/')) throw new Error('Seleccioná una imagen.'); data.imgKey = await guardarArchivoDB(`foto_${Date.now()}`, file); }
      await guardarBaseDatosNube(); await window.cargarDiaNutricion(currentDayNutricion); await window.cargarResumenSemanalNutricion(); editNutriModal.classList.remove('active-modal');
    } catch (err) { informar(err); }
  });

  const trainingButtons = document.querySelectorAll('#sec-entrenamiento .days-bar .day-btn');
  const elEntrenDia = document.getElementById('entrenamientoDiaTitulo'), elEntrenEnfoque = document.getElementById('entrenamientoEnfoque'), elEntrenLista = document.getElementById('entrenamientoListaEjercicios'), elEntrenScrollSemanal = document.getElementById('entrenamientoScrollSemanal');
  window.cargarDiaEntrenamiento = async diaKey => {
    currentDayEntrenamiento = diaKey; const data = currentTraining?.[diaKey]; if (!data || !elEntrenLista) return;
    if (elEntrenDia) elEntrenDia.textContent = data.dia; if (elEntrenEnfoque) elEntrenEnfoque.textContent = data.enfoque; elEntrenLista.innerHTML = '';
    for (let idx = 0; idx < data.ejercicios.length; idx++) {
      const ej = data.ejercicios[idx], div = document.createElement('div'); div.className = 'ejercicio-item';
      const videoSrc = ej.videoKey ? await obtenerURLArchivo(ej.videoKey) : '';
      const videoHTML = videoSrc ? `<div class="video-box"><video src="${videoSrc}" controls preload="metadata"></video></div>` : '<div style="background:#1a1a1a;padding:15px;text-align:center;color:#888;font-size:.8rem;border-radius:6px;margin-bottom:8px">Sin video cargado.</div>';
      div.innerHTML = `<div class="ejercicio-header"><div class="ejercicio-info-main"><span class="ejercicio-nombre">${escaparHTML(ej.nombre)}</span><span class="ejercicio-series">${escaparHTML(ej.series)}</span></div><span class="ejercicio-arrow">▼</span></div><div class="ejercicio-body">${videoHTML}<p class="ejercicio-ejecucion"><strong>Técnica:</strong> ${escaparHTML(ej.ejecucion)}</p><div class="admin-edit-tools"><button class="admin-pencil-btn" data-edit="${idx}">✏️ Editar Ejercicio / Video</button><button class="admin-trash-btn" data-delete="${idx}">🗑️ Eliminar</button></div></div>`;
      div.querySelector('.ejercicio-header').addEventListener('click', () => { const active = div.classList.contains('active'); elEntrenLista.querySelectorAll('.ejercicio-item.active').forEach(item => item.classList.remove('active')); if (!active) div.classList.add('active'); });
      div.querySelector('[data-edit]')?.addEventListener('click', () => window.editarEjercicio(diaKey, idx));
      div.querySelector('[data-delete]')?.addEventListener('click', () => window.eliminarEjercicio(diaKey, idx));
      elEntrenLista.appendChild(div);
    }
  };
  window.cargarResumenSemanalEntrenamiento = () => {
    if (!elEntrenScrollSemanal || !currentTraining) return; elEntrenScrollSemanal.innerHTML = '';
    Object.values(currentTraining).forEach(d => { const card = document.createElement('div'); card.className = 'card entrenamiento mb';
      const items = d.ejercicios.length ? d.ejercicios.map(e => `<div class="resumen-ejercicio-item"><span class="resumen-nombre">${escaparHTML(e.nombre)}</span><span class="resumen-series">${escaparHTML(e.series)}</span></div>`).join('') : '<p style="color:#888;font-size:.8rem">Sin ejercicios</p>';
      card.innerHTML = `<div class="card-header"><h2>${escaparHTML(d.dia)}</h2><span class="accent">${escaparHTML(d.enfoque)}</span></div><div>${items}</div>`; elEntrenScrollSemanal.appendChild(card);
    });
  };
  trainingButtons.forEach(btn => btn.addEventListener('click', () => { trainingButtons.forEach(b => b.classList.remove('active')); btn.classList.add('active'); window.cargarDiaEntrenamiento(btn.getAttribute('data-day')); }));

  const nutritionButtons = document.querySelectorAll('#sec-nutricion .days-bar .day-btn');
  const elDiaTitulo = document.getElementById('nutricionDiaTitulo'), elPlatoTitulo = document.getElementById('nutricionPlatoTitulo'), elImg = document.getElementById('nutricionImg'), elIngredientes = document.getElementById('nutricionIngredientes'), elPreparacion = document.getElementById('nutricionPreparacion');
  window.cargarDiaNutricion = async diaKey => {
    currentDayNutricion = diaKey; const data = currentNutrition?.[diaKey]; if (!data) return;
    if (elDiaTitulo) elDiaTitulo.textContent = data.dia; if (elPlatoTitulo) elPlatoTitulo.textContent = data.titulo;
    if (elImg) { const src = data.imgKey ? await obtenerURLArchivo(data.imgKey) : ''; elImg.src = src; elImg.style.display = src ? 'block' : 'none'; elImg.alt = data.titulo; }
    if (elPreparacion) elPreparacion.textContent = data.preparacion;
    if (elIngredientes) { elIngredientes.innerHTML = ''; (data.ingredientes || []).forEach(item => { const li = document.createElement('li'); li.textContent = item; elIngredientes.appendChild(li); }); }
  };
  window.cargarResumenSemanalNutricion = async () => {
    const wrap = document.getElementById('nutricionScrollSemanal'); if (!wrap || !currentNutrition) return; wrap.innerHTML = '';
    for (const d of Object.values(currentNutrition)) {
      const card = document.createElement('div'); card.className = 'card nutricion mb'; const src = d.imgKey ? await obtenerURLArchivo(d.imgKey) : '';
      const img = src ? `<img src="${src}" alt="${escaparHTML(d.titulo)}" class="comida-img">` : '<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:.7rem;color:#666;text-align:center">Sin foto</div>';
      card.innerHTML = `<div class="card-header"><h2>${escaparHTML(d.dia)}</h2><span class="accent">${escaparHTML(d.titulo)}</span></div><div class="comida-item-horizontal"><div class="comida-img-box">${img}</div><div class="comida-info"><div class="comida-seccion"><strong>Ingredientes:</strong><ul class="comida-lista">${(d.ingredientes || []).map(i => `<li>${escaparHTML(i)}</li>`).join('')}</ul></div><div class="comida-seccion"><strong>Preparación:</strong><p class="comida-text">${escaparHTML(d.preparacion)}</p></div></div></div>`; wrap.appendChild(card);
    }
  };
  nutritionButtons.forEach(btn => btn.addEventListener('click', () => { nutritionButtons.forEach(b => b.classList.remove('active')); btn.classList.add('active'); window.cargarDiaNutricion(btn.getAttribute('data-day')); }));

  document.getElementById('adminRefreshUsers')?.addEventListener('click', () => cargarListaUsuarios().catch(informar));
  document.getElementById('adminSavePlan')?.addEventListener('click', async () => { try { exigirAdmin(); await guardarBaseDatosNube(); alert(`Plan guardado para ${currentTargetEmail}.`); } catch (err) { informar(err); } });
}

async function iniciarAplicacion() {
  inicializarInterfaz();
  if (!supabaseReady) return;
  const { data: { session }, error } = await supabaseClient.auth.getSession();
  if (error) { informar(error); return; }
  if (session?.user) {
    try { await cargarPerfilYAplicacion(session.user); }
    catch (err) { informar(err, 'No se pudo cargar tu perfil o tu plan. Revisá que hayas ejecutado el SQL de configuración en Supabase.'); }
  } else document.getElementById('auth-screen').style.display = 'flex';
  supabaseClient.auth.onAuthStateChange((event, sessionNow) => {
    if (event === 'SIGNED_OUT' || !sessionNow) { currentUser = null; currentProfile = null; document.body.classList.remove('is-admin'); }
  });
}
document.addEventListener('DOMContentLoaded', () => iniciarAplicacion().catch(err => informar(err)));
