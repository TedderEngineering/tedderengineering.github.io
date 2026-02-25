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

  var viewport = document.querySelector(".carousel__viewport");

  function updateViewportHeight() {
    var allSlides = track.querySelectorAll(".carousel__slide");
    // current + 1 because of prepended clone
    var activeSlide = allSlides[current + 1];
    if (activeSlide) {
      var content = activeSlide.querySelector(".motorsports__content");
      if (content) {
        viewport.style.height = content.scrollHeight + "px";
      }
    }
  }

  function slideTo(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    current = index;
    // +1 offset because of prepended clone
    track.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    track.style.transform = "translateX(-" + ((current + 1) * 100) + "%)";
    updateDots();
    updateViewportHeight();
    resetAuto();
  }

  function slideNext() {
    if (isTransitioning) return;
    isTransitioning = true;
    current++;
    track.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    track.style.transform = "translateX(-" + ((current + 1) * 100) + "%)";
    updateDots();
    updateViewportHeight();
    resetAuto();
  }

  function slidePrev() {
    if (isTransitioning) return;
    isTransitioning = true;
    current--;
    track.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    track.style.transform = "translateX(-" + ((current + 1) * 100) + "%)";
    updateDots();
    updateViewportHeight();
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
      // Snap height instantly (no animation during clone-to-real jump)
      viewport.style.transition = "none";
      updateViewportHeight();
      requestAnimationFrame(function () {
        viewport.style.transition = "";
      });
    } else if (current < 0) {
      current = total - 1;
      track.style.transition = "none";
      track.style.transform = "translateX(-" + ((current + 1) * 100) + "%)";
      updateDots();
      viewport.style.transition = "none";
      updateViewportHeight();
      requestAnimationFrame(function () {
        viewport.style.transition = "";
      });
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

  // Set initial viewport height and update on resize
  updateViewportHeight();
  window.addEventListener("resize", updateViewportHeight);

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
      "mailto:brenttedder@tedderengineering.com?subject=" + subject + "&body=" + body;
    btn.textContent = originalText;
    btn.disabled = false;
  }
});

/* ─── Service Inquiry Modal ──────────────────────────────────────── */

(function () {
  var SERVICE_CONFIG = {
    "data-analytics": {
      title: "Data Analytics & Telemetry",
      message: "I'm interested in learning more about Tedder Engineering's data analytics and telemetry services, including MoTeC data analysis, driver coaching, and sector performance breakdowns. Please let me know how we can work together."
    },
    "race-engineering": {
      title: "Race Engineering",
      message: "I'm interested in learning more about Tedder Engineering's race engineering services, including vehicle setup, race strategy, tire management, and fuel planning. Please let me know how we can work together."
    },
    "vehicle-dynamics": {
      title: "Vehicle Dynamics & Performance",
      message: "I'm interested in learning more about Tedder Engineering's vehicle dynamics and performance services, including suspension optimization, balance tuning, and performance simulation. Please let me know how we can work together."
    },
    "trackside-support": {
      title: "Trackside Support",
      message: "I'm interested in learning more about Tedder Engineering's trackside support services, including on-site engineering, real-time strategy, and pit wall support. Please let me know how we can work together."
    }
  };

  var overlay = document.getElementById("service-modal");
  if (!overlay) return;
  var modalPanel = overlay.querySelector(".modal");
  var closeBtn = document.getElementById("modal-close");
  var sForm = document.getElementById("service-form");
  var titleEl = document.getElementById("modal-title");
  var subjectField = document.getElementById("modal-subject");
  var serviceField = document.getElementById("modal-service-field");
  var replytoField = document.getElementById("modal-replyto");
  var messageField = document.getElementById("modal-message");
  var errorEl = document.getElementById("modal-error");
  var successEl = document.getElementById("modal-success");
  var submitBtn = document.getElementById("modal-submit");
  var autoCloseTimer = null;

  function openModal(serviceKey) {
    var config = SERVICE_CONFIG[serviceKey];
    if (!config) return;

    // Reset state
    sForm.reset();
    errorEl.hidden = true;
    successEl.hidden = true;
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Inquiry";
    sForm.style.display = "";

    // Fill service-specific content
    titleEl.textContent = "Inquire About: " + config.title;
    subjectField.value = "Tedder Engineering Inquiry: " + config.title;
    serviceField.value = config.title;
    messageField.value = config.message;

    // Show modal
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    // Focus the name field after transition
    setTimeout(function () {
      document.getElementById("modal-name").focus();
    }, 350);
  }

  function closeModal() {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    clearTimeout(autoCloseTimer);
  }

  // Close button
  closeBtn.addEventListener("click", closeModal);

  // Click outside modal panel to close
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });

  // Escape key to close
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("open")) {
      closeModal();
    }
  });

  // Attach click handlers to all service cards
  document.querySelectorAll(".card[data-service]").forEach(function (card) {
    card.addEventListener("click", function () {
      openModal(card.getAttribute("data-service"));
    });

    // Keyboard: Enter or Space opens modal
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card.getAttribute("data-service"));
      }
    });
  });

  // Form submission
  sForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    errorEl.hidden = true;

    // Sync _replyto with the email field
    replytoField.value = document.getElementById("modal-email").value;

    var originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      var response = await fetch(sForm.action, {
        method: "POST",
        body: new FormData(sForm),
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        // Success: hide form, show success message
        sForm.style.display = "none";
        successEl.hidden = false;
        autoCloseTimer = setTimeout(closeModal, 2500);
      } else {
        throw new Error("Formspree returned " + response.status);
      }
    } catch (err) {
      // Show error banner
      errorEl.hidden = false;

      // Fallback to mailto
      var name = document.getElementById("modal-name").value;
      var email = document.getElementById("modal-email").value;
      var org = document.getElementById("modal-org").value;
      var series = document.getElementById("modal-series").value;
      var eventDate = document.getElementById("modal-date").value;
      var message = messageField.value;

      var subject = encodeURIComponent(subjectField.value);
      var bodyParts = [];
      bodyParts.push("From: " + name + " (" + email + ")");
      if (org) bodyParts.push("Team/Organization: " + org);
      if (series) bodyParts.push("Racing Series: " + series);
      if (eventDate) bodyParts.push("Event Date/Timeline: " + eventDate);
      bodyParts.push("");
      bodyParts.push(message);
      var body = encodeURIComponent(bodyParts.join("\n"));

      window.location.href = "mailto:Brenttedder@tedderengineering.com?subject=" + subject + "&body=" + body;

      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
})();
