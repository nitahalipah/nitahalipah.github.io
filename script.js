let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

navLinks.forEach((link) => {
  link.onclick = (event) => {
    event.preventDefault();
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");

    let targetSection = document.querySelector(link.getAttribute("href"));
    if (targetSection) {
      resetAnimation(targetSection);
      setTimeout(() => {
        targetSection.classList.add("show-animate");
      }, 50);

      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };
});

window.onscroll = () => {
  let top = window.scrollY;
  let header = document.querySelector("header");

  header.classList.toggle("sticky", top > 100);

  sections.forEach((sec) => {
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
      });

      sec.classList.add("show-animate");
    } else {
      sec.classList.remove("show-animate");
    }
  });

  let footer = document.querySelector("footer");
  if (footer) {
    footer.classList.toggle("show-animate", this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
  }

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

function resetAnimation(element) {
  element.classList.remove("show-animate");
  void element.offsetWidth;
  element.querySelectorAll(".animate.scroll").forEach((child) => {
    child.classList.remove("animate");
    void child.offsetWidth;
    child.classList.add("animate");
  });

  let footer = document.querySelector("footer");

  footer.classList.toggle("show-animate", this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}
