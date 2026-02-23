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
