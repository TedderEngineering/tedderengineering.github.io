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

  const slides = Array.from(track.querySelectorAll(".carousel__slide"));
  const total = slides.length;
  let current = 0;
  let autoTimer = null;
  let isTransitioning = false;

  // Clone first and last slides for infinite loop
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[total - 1].cloneNode(true);
  firstClone.classList.add("carousel__clone");
  lastClone.classList.add("carousel__clone");
  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  // Offset by 1 to account for prepended clone
  track.style.transform = "translateX(-100%)";

  // Build dot indicators
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("button");
    dot.className = "carousel__dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Go to slide " + (i + 1));
    dot.addEventListener("click", function () { slideTo(i); });
    dotsContainer.appendChild(dot);
  }
  const dots = dotsContainer.querySelectorAll(".carousel__dot");

  function updateDots() {
    dots.forEach(function (d, i) {
      d.classList.toggle("active", i === current);
    });
  }

  function slideTo(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    current = index;
    // +1 offset because of prepended clone
    track.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    track.style.transform = "translateX(-" + ((current + 1) * 100) + "%)";
    updateDots();
    resetAuto();
  }

  function slideNext() {
    if (isTransitioning) return;
    isTransitioning = true;
    current++;
    track.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    track.style.transform = "translateX(-" + ((current + 1) * 100) + "%)";
    updateDots();
    resetAuto();
  }

  function slidePrev() {
    if (isTransitioning) return;
    isTransitioning = true;
    current--;
    track.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    track.style.transform = "translateX(-" + ((current + 1) * 100) + "%)";
    updateDots();
    resetAuto();
  }

  // After transition ends, snap to real slide if on a clone
  track.addEventListener("transitionend", function () {
    isTransitioning = false;
    if (current >= total) {
      current = 0;
      track.style.transition = "none";
      track.style.transform = "translateX(-100%)";
      updateDots();
    } else if (current < 0) {
      current = total - 1;
      track.style.transition = "none";
      track.style.transform = "translateX(-" + ((current + 1) * 100) + "%)";
      updateDots();
    }
  });

  prevBtn.addEventListener("click", function () { slidePrev(); });
  nextBtn.addEventListener("click", function () { slideNext(); });

  // Auto-advance every 24 seconds
  function startAuto() {
    autoTimer = setInterval(function () { slideNext(); }, 24000);
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
      if (touchDelta < 0) slideNext();
      else slidePrev();
    }
    startAuto();
  });

  // Keyboard: left/right when carousel is near viewport
  document.addEventListener("keydown", function (e) {
    var rect = carousel.getBoundingClientRect();
    var inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;
    if (e.key === "ArrowLeft") slidePrev();
    if (e.key === "ArrowRight") slideNext();
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
