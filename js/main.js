document.addEventListener("DOMContentLoaded", () => {
  // ===== CUENTA REGRESIVA =====
  // Inicio: 2 de junio de 2025 a las 12:00
  const festivalStart = new Date("2025-06-02T12:00:00").getTime();
  // Fin: 4 de junio de 2025 a las 00:00
  const festivalEnd   = new Date("2025-06-04T00:00:00").getTime();

  function updateCountdown() {
    const now  = Date.now();
    const date = new Date();

    // Día 1: 2 de junio (mes 5)
    if (date.getDate() === 2 && date.getMonth() === 5) {
      document.body.classList.add("festival-dia1");
      document.querySelector(".countdown h2").textContent = "🎉 ¡Día 1 del festival en marcha!";
      document.querySelector(".timer").innerHTML = "<strong>¡Disfruta el inicio del festival! 🎶</strong>";
      return;
    }

    // Día 2: 3 de junio (mes 5)
    if (date.getDate() === 3 && date.getMonth() === 5) {
      document.body.classList.add("festival-dia2");
      document.querySelector(".countdown h2").textContent = "🎊 ¡Día 2 del festival en marcha!";
      document.querySelector(".timer").innerHTML = "<strong>¡El festival continúa! 💃🕺</strong>";
      return;
    }

    // Después del festival
    if (now >= festivalEnd) {
      document.body.classList.add("festival-fin");
      document.querySelector(".timer").innerHTML = "<strong>El festival ya finalizó. ¡Gracias por venir! 🙌</strong>";
      return;
    }

    // Antes del festival: cuenta regresiva
    const diff    = festivalStart - now;
    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days"   ).textContent = String(days   ).padStart(2, "0");
    document.getElementById("hours"  ).textContent = String(hours  ).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
  }

  // Arranca y programa actualizaciones
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ===== MENÚ DINÁMICO ARTISTAS =====
  const artists = [
    { name: 'Charlotte de Witte', genre: 'Techno',       img: 'img/placeholders/artista1.jpg', bio: 'Reina del techno belga.' },
    { name: 'Morat',                genre: 'Pop Latino',  img: 'img/placeholders/artista2.jpg', bio: 'Cuarteto de pop-rock colombiano.' },
    { name: 'Bizarrap',             genre: 'Electrónica', img: 'img/placeholders/artista3.jpg', bio: 'Productor y DJ argentino.' },
    { name: 'Tokischa',             genre: 'Trap & Urbano',img: 'img/placeholders/artista4.jpg', bio: 'Estrella del trap dominicano.' },
    { name: 'Elvis Crespo',         genre: 'Merengue',    img: 'img/placeholders/artista5.jpg', bio: 'Icono del merengue clásico.' }
  ];

  const menu = document.getElementById('artists-menu');
  const info = document.getElementById('artist-info');

  if (menu && info) {
    artists.forEach((a, i) => {
      const btn = document.createElement('button');
      btn.className = 'artist-btn';
      btn.textContent = a.name;
      btn.onclick = () => {
        info.innerHTML = `
          <img src="${a.img}" alt="${a.name}" />
          <h3>${a.name}</h3>
          <p><strong>Género:</strong> ${a.genre}</p>
          <p>${a.bio}</p>
        `;
      };
      menu.appendChild(btn);
    });
    // Mostrar el primer artista al cargar
    menu.querySelector('button').click();
  }
});


// ===== Carousel automático cada 2s con flechas dinámicas =====
document.addEventListener("DOMContentLoaded", () => {
  const slideContainer = document.querySelector('.carousel-slide');
  const slides = document.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let index = 0;

  function showSlide(i) {
    slideContainer.style.transform = `translateX(-${i * 100}%)`;
  }

  prevBtn.addEventListener('click', () => {
    index = index > 0 ? index - 1 : slides.length - 1;
    showSlide(index);
  });

  nextBtn.addEventListener('click', () => {
    index = index < slides.length - 1 ? index + 1 : 0;
    showSlide(index);
  });

  // Auto-avanzar cada 2 segundos
  setInterval(() => {
    nextBtn.click();
  }, 2000);
});

// Wizard Entradas
document.addEventListener("DOMContentLoaded", () => {
  const form        = document.getElementById("checkout-form");
  const steps       = Array.from(document.querySelectorAll(".wizard-step"));
  const contents    = Array.from(document.querySelectorAll(".wizard-content"));
  const prevBtn     = document.getElementById("prev-btn");
  const nextBtn     = document.getElementById("next-btn");
  const summaryList = document.getElementById("summary-list");
  const totalEl     = document.getElementById("total-amount");

  const prices = { general:200000, vip:350000, day:80000 };
  let currentStep = 1;

  function showStep(n) {
    steps.forEach(s => s.classList.toggle("active", +s.dataset.step===n));
    contents.forEach(c => c.classList.toggle("d-none", +c.dataset.step!==n));
    prevBtn.disabled = n===1;
    nextBtn.textContent = n===3 ? "Confirmar" : "Siguiente";
  }

  function fillSummary() {
    const type = form.ticketType.value;
    const qty  = +form.quantity.value;
    const total = prices[type] * qty;
    summaryList.innerHTML = `<li>${qty} × ${type} @ ${prices[type].toLocaleString()} COP</li>`;
    totalEl.textContent = total.toLocaleString();
  }

  prevBtn.addEventListener("click", () => {
    if (currentStep>1) { currentStep--; showStep(currentStep); }
  });

  nextBtn.addEventListener("click", () => {
    if (currentStep < 3) {
      currentStep++;
      if (currentStep===3) fillSummary();
      showStep(currentStep);
    } else {
      alert("¡Gracias! Tu compra ha sido procesada.");
      form.reset(); currentStep=1; showStep(1);
    }
  });

  showStep(currentStep);
});


// ===== Mini-contador en header =====
document.addEventListener("DOMContentLoaded", () => {
  // Referencias a spans
  const hdDays    = document.getElementById("hd-days");
  const hdHours   = document.getElementById("hd-hours");
  const hdMinutes = document.getElementById("hd-minutes");
  const hdSeconds = document.getElementById("hd-seconds");

  // Reusa la función que ya tienes para calcular días/horas/minutos/segundos
  // Aquí la copiamos dentro para poder actualizar ambos contadores
  function updateHeaderCountdown() {
    const now  = Date.now();
    const start = new Date("2025-06-02T12:00:00").getTime();
    const diff = start - now;

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Actualiza solo el texto interior de cada span
    hdDays.textContent    = days    >= 0 ? String(days).padStart(2, "0")    : "00";
    hdHours.textContent   = hours   >= 0 ? String(hours).padStart(2, "0")   : "00";
    hdMinutes.textContent = minutes >= 0 ? String(minutes).padStart(2, "0") : "00";
    hdSeconds.textContent = seconds >= 0 ? String(seconds).padStart(2, "0") : "00";
  }

  // Lanza el mini-contador cada segundo
  updateHeaderCountdown();
  setInterval(updateHeaderCountdown, 1000);
});
