(() => {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const mobile = document.getElementById("mobileMenu");
  const year = document.getElementById("year");

  if (year) year.textContent = String(new Date().getFullYear());

  // Sticky nav style
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      mobile.hidden = open;
      document.body.style.overflow = open ? "" : "hidden";
    });
    mobile.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        mobile.hidden = true;
        document.body.style.overflow = "";
      });
    });
  }

  // Scroll reveal
  const reveals = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  // ML node field decoration
  const field = document.getElementById("nodeField");
  if (field) {
    const count = 18;
    for (let i = 0; i < count; i++) {
      const n = document.createElement("span");
      n.className = "node" + (i % 4 === 0 ? " gold" : "");
      n.style.left = 8 + Math.random() * 84 + "%";
      n.style.top = 10 + Math.random() * 80 + "%";
      n.style.animationDelay = Math.random() * 3 + "s";
      n.style.animationDuration = 3 + Math.random() * 3 + "s";
      field.appendChild(n);
    }
  }

  // Smooth anchor offset for fixed nav
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
})();
