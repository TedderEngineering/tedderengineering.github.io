/* ─── Scroll-triggered fade-in ─────────────────────────────────────── */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

/* ─── Nav scroll effect ───────────────────────────────────────────── */

const nav = document.getElementById("nav");

window.addEventListener("scroll", () => {
  nav.classList.toggle("nav--scrolled", window.scrollY > 40);
});

/* ─── Mobile nav toggle ───────────────────────────────────────────── */

const toggle = document.getElementById("nav-toggle");
const links = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  links.classList.toggle("open");
});

links.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    toggle.classList.remove("active");
    links.classList.remove("open");
  });
});

/* ─── Motorsports Carousel ────────────────────────────────────────── */

(function () {
  const track = document.getElementById("carousel-track");
  const dotsContainer = document.getElementById("carousel-dots");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  if (!track) return;

  const slides = track.querySelectorAll(".carousel__slide");
  const total = slides.length;
  let current = 0;
  let autoTimer = null;

  // Build dot indicators
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("button");
    dot.className = "carousel__dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Go to slide " + (i + 1));
    dot.addEventListener("click", function () { goTo(i); });
    dotsContainer.appendChild(dot);
  }
  const dots = dotsContainer.querySelectorAll(".carousel__dot");

  function goTo(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    current = index;
    track.style.transform = "translateX(-" + (current * 100) + "%)";
    dots.forEach(function (d, i) {
      d.classList.toggle("active", i === current);
    });
    resetAuto();
  }

  prevBtn.addEventListener("click", function () { goTo(current - 1); });
  nextBtn.addEventListener("click", function () { goTo(current + 1); });

  // Auto-advance every 8 seconds
  function startAuto() {
    autoTimer = setInterval(function () { goTo(current + 1); }, 8000);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }
  startAuto();

  // Pause on hover
  var carousel = document.getElementById("carousel");
  carousel.addEventListener("mouseenter", function () { clearInterval(autoTimer); });
  carousel.addEventListener("mouseleave", function () { startAuto(); });

  // Touch/swipe support
  var touchStartX = 0;
  var touchDelta = 0;

  track.addEventListener("touchstart", function (e) {
    touchStartX = e.touches[0].clientX;
    touchDelta = 0;
    clearInterval(autoTimer);
  }, { passive: true });

  track.addEventListener("touchmove", function (e) {
    touchDelta = e.touches[0].clientX - touchStartX;
  }, { passive: true });

  track.addEventListener("touchend", function () {
    if (Math.abs(touchDelta) > 50) {
      if (touchDelta < 0) goTo(current + 1);
      else goTo(current - 1);
    }
    startAuto();
  });

  // Keyboard: left/right when carousel is near viewport
  document.addEventListener("keydown", function (e) {
    var rect = carousel.getBoundingClientRect();
    var inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;
    if (e.key === "ArrowLeft") goTo(current - 1);
    if (e.key === "ArrowRight") goTo(current + 1);
  });
})();

/* ─── Contact form ────────────────────────────────────────────────── */

const form = document.getElementById("contact-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = "Sending...";
  btn.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      btn.textContent = "Sent!";
      form.reset();
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 3000);
    } else {
      throw new Error();
    }
  } catch {
    // Fallback to mailto
    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]').value;
    const message = form.querySelector('[name="message"]').value;
    const subject = encodeURIComponent("Contact from " + name);
    const body = encodeURIComponent(
      "From: " + name + " (" + email + ")\n\n" + message
    );
    window.location.href =
      "mailto:info@tedderengineering.com?subject=" + subject + "&body=" + body;
    btn.textContent = originalText;
    btn.disabled = false;
  }
});
