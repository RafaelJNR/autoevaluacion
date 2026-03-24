/**
 * BANCO DE PREGUNTAS (Extraídas del Manual UF1302)
 */
const allQuestions = [
    {
        question: "¿Qué significan las siglas IDE en el desarrollo de software?",
        options: ["Interfaz de Diseño Estándar", "Entorno de Desarrollo Integrado", "Indicador de Edición Inteligente", "Entorno de Depuración Individual"],
        correct: 1,
        feedback: "Un IDE combina herramientas esenciales como editor, depurador y automatización en una sola interfaz."
    },
    {
        question: "¿Cuál es la función del Resaltado de Sintaxis?",
        options: ["Sugerir etiquetas automáticamente", "Colorear el código para hacerlo más legible", "Localizar errores en scripts de servidor", "Guardar versiones en la nube"],
        correct: 1,
        feedback: "El resaltado colorea etiquetas y atributos según el lenguaje para facilitar la lectura."
    },
    {
        question: "¿Qué riesgo de seguridad se asocia con el 'Typosquatting' en extensiones?",
        options: ["Robo de archivos .env", "Inyección de SQL", "Uso de nombres parecidos a extensiones famosas para engañar", "Ralentización del sistema"],
        correct: 2,
        feedback: "Consiste en publicar extensiones con nombres casi idénticos a las populares para que el usuario las instale por error."
    },
    {
        question: "¿Qué combinación de teclas abre el Explorador de Archivos en VS Code?",
        options: ["Ctrl + Shift + X", "Ctrl + Shift + E", "Ctrl + Shift + F", "Ctrl + ñ"],
        correct: 1,
        feedback: "Ctrl + Shift + E permite gestionar rápidamente la estructura de archivos del proyecto."
    },
    {
        question: "¿Qué herramienta permite generar estructuras complejas (ej. ul>li*5) rápidamente?",
        options: ["IntelliSense", "Emmet", "Breadcrumbs", "Linter"],
        correct: 1,
        feedback: "Emmet es un motor de abreviaciones que acelera drásticamente la escritura de HTML y CSS."
    },
    {
        question: "¿Qué funcionalidad aporta la extensión 'Live Server'?",
        options: ["Ordena el código", "Detecta errores de JS", "Crea un servidor local con vista previa en tiempo real", "Cierra etiquetas"],
        correct: 2,
        feedback: "Actualiza el navegador automáticamente cada vez que guardas un cambio en el código."
    },
    {
        question: "¿Cuál es el objetivo general de la unidad formativa UF1302?",
        options: ["Instalar sistemas operativos", "Realizar páginas web para presentar información", "Programar bases de datos", "Reparar hardware"],
        correct: 1,
        feedback: "El objetivo es construir y retocar páginas web integrando diversos elementos según el diseño."
    },
    {
        question: "¿Qué indica el 'Check azul' (Verified Publisher) en una extensión?",
        options: ["Muchos usuarios", "Código abierto", "Autor verificado por Microsoft", "Extensión de pago"],
        correct: 2,
        feedback: "Garantiza que el desarrollador es una entidad confiable y verificada."
    },
    {
        question: "Según el glosario del manual, ¿qué es el 'Software'?",
        options: ["Componentes físicos", "Unidad de procesamiento", "Componentes lógicos e intangibles", "Interfaz de red"],
        correct: 2,
        feedback: "El software es la parte lógica que permite al hardware realizar tareas específicas."
    },
    {
        question: "¿Qué hace la propiedad 'Format on Save' en VS Code?",
        options: ["Cambia colores", "Ordena el código automáticamente al guardar", "Envía a GitHub", "Cierra el editor"],
        correct: 1,
        feedback: "Asegura que el código mantenga siempre un formato limpio y profesional sin esfuerzo manual."
    },
    {
        question: "¿Qué atajo abre el buscador universal de comandos en VS Code?",
        options: ["Ctrl + Shift + P", "Alt + F4", "Ctrl + C", "Ctrl + Shift + E"],
        correct: 0,
        feedback: "Es la vía rápida para acceder a cualquier función o configuración del editor."
    },
    {
        question: "¿Qué herramienta detecta errores de sintaxis y malas prácticas en JS?",
        options: ["Auto Rename Tag", "Live Server", "ESLint", "Minimap"],
        correct: 2,
        feedback: "ESLint analiza el código en busca de patrones problemáticos antes de ejecutarlo."
    },
    {
        question: "¿Qué casilla de instalación en Windows permite abrir carpetas con clic derecho?",
        options: ["Ejecutar como admin", "Agregar acción 'Abrir con Code'", "Instalar extensiones", "Crear acceso directo"],
        correct: 1,
        feedback: "Esta opción integra VS Code en el explorador de archivos para mayor agilidad."
    },
    {
        question: "¿Qué es el 'Minimap' en VS Code?",
        options: ["Un buscador", "Un menú lateral", "Una vista en miniatura del código a la derecha", "Un depurador"],
        correct: 2,
        feedback: "Ayuda a orientarse y navegar rápidamente en archivos de código muy extensos."
    },
    {
        question: "¿Cuál es la característica principal de 'Zed' según el manual?",
        options: ["Extensiones infinitas", "Enfocado en IA", "Velocidad extrema (Rust)", "Ideal para Java"],
        correct: 2,
        feedback: "Zed destaca por su alto rendimiento y eficiencia en el uso de recursos."
    },
    {
        question: "¿Qué extensión sincroniza el cambio de etiquetas HTML automáticamente?",
        options: ["Prettier", "ESLint", "Auto Rename Tag", "Live Server"],
        correct: 2,
        feedback: "Si cambias la etiqueta de apertura, Auto Rename Tag modifica la de cierre al instante."
    }
];

/**
 * LÓGICA DEL SISTEMA
 */
let selectedQuestions = [];
let currentIndex = 0;
let score = 0;
let userErrors = [];

// Configuración de Sonidos (URLs de sistema)
const audioSuccess = new Audio('https://actions.google.com/sounds/v1/cartoon/clink_vibrant.ogg');
const audioError = new Audio('https://actions.google.com/sounds/v1/cartoon/pop.ogg');

// Desbloqueo de audio para navegadores
function unlockAudio() {
    audioSuccess.play().then(() => { audioSuccess.pause(); audioSuccess.currentTime = 0; });
    audioError.play().then(() => { audioError.pause(); audioError.currentTime = 0; });
    document.removeEventListener('click', unlockAudio);
}
document.addEventListener('click', unlockAudio);

// Referencias al DOM
const questionEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackBox = document.getElementById('feedback-box');
const feedbackText = document.getElementById('feedback-text');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const currentQNum = document.getElementById('current-q-num');
const totalQNum = document.getElementById('total-q-num');

function initQuiz() {
    // Mezclar y elegir 10 preguntas
    selectedQuestions = [...allQuestions]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);
    
    totalQNum.innerText = selectedQuestions.length;
    showQuestion();
}

function showQuestion() {
    const q = selectedQuestions[currentIndex];
    feedbackBox.classList.add('hidden');
    optionsContainer.innerHTML = '';
    
    questionEl.innerText = q.question;
    currentQNum.innerText = currentIndex + 1;
    
    // Actualizar barra de progreso
    const progressPercent = (currentIndex / selectedQuestions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(i);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected) {
    const q = selectedQuestions[currentIndex];
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);

    if (selected === q.correct) {
        audioSuccess.currentTime = 0;
        audioSuccess.play();
        buttons[selected].classList.add('correct');
        feedbackText.innerHTML = `<strong>¡Correcto!</strong><br>${q.feedback}`;
        score++;
    } else {
        audioError.currentTime = 0;
        audioError.play();
        buttons[selected].classList.add('incorrect');
        buttons[q.correct].classList.add('correct');
        feedbackText.innerHTML = `<strong>No es correcto.</strong><br>${q.feedback}`;
        
        userErrors.push({
            q: q.question,
            correctAnswer: q.options[q.correct]
        });
    }

    feedbackBox.classList.remove('hidden');
}

nextBtn.onclick = () => {
    currentIndex++;
    if (currentIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
};

function showResults() {
    progressBar.style.width = "100%";
    let reviewHTML = '';
    
    if (userErrors.length > 0) {
        reviewHTML = `
            <div style="text-align: left; margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1rem;">
                <h3 style="font-size: 1rem; color: var(--error); margin-bottom: 1rem;">Preguntas a repasar:</h3>
                <ul>
                    ${userErrors.map(err => `
                        <li>
                            <div style="font-weight: 600;">${err.q}</div>
                            <div style="color: var(--success); font-size: 0.9rem;">Respuesta correcta: ${err.correctAnswer}</div>
                        </li>
                    `).join('')}
                </ul>
            </div>`;
    }

    const container = document.getElementById('quiz-content');
    container.innerHTML = `
        <div style="text-align: center;">
            <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">${score} / 10</h2>
            <p style="color: var(--text-dim); margin-bottom: 2rem;">
                ${score >= 8 ? "¡Maestría total! Has asimilado perfectamente el manual." : "Buen intento. Revisa los conceptos marcados abajo."}
            </p>
            ${reviewHTML}
            <button onclick="location.reload()" id="next-btn" style="margin-top: 2rem;">Reiniciar Autoevaluación</button>
        </div>
    `;
}

// Iniciar aplicación
initQuiz();