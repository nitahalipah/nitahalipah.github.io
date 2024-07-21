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

  if (footer) {
    footer.classList.toggle("show-animate", this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const messagesTableBody = document.getElementById('messages-body');

  // Load existing messages from localStorage
  loadMessages();

  form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form data
      const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          subject: document.getElementById('subject').value,
          message: document.getElementById('message').value
      };

      // Save message to localStorage
      saveMessage(formData);

      // Clear the form
      form.reset();
  });

  function saveMessage(message) {
      // Get existing messages
      let messages = JSON.parse(localStorage.getItem('messages')) || [];
      messages.push(message);
      localStorage.setItem('messages', JSON.stringify(messages));
      loadMessages();
  }

  function loadMessages() {
      // Load messages from localStorage
      let messages = JSON.parse(localStorage.getItem('messages')) || [];
      messagesTableBody.innerHTML = messages.map(msg => `
          <tr>
              <td>${msg.name}</td>
              <td>${msg.email}</td>
              <td>${msg.phone}</td>
              <td>${msg.subject}</td>
              <td>${msg.message}</td>
          </tr>
      `).join('');
  }
});
