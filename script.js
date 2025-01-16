$(document).ready(function() {

  //sticky header
  $(window).scroll(function() {
      if ($(this).scrollTop() > 1) {
          $(".header-area").addClass("sticky");
      } else {
          $(".header-area").removeClass("sticky");
      }

      // Update the active section in the header
      updateActiveSection();
  });

  $(".header ul li a").click(function(e) {
      e.preventDefault();

      var target = $(this).attr("href");

      if ($(target).hasClass("active-section")) {
          return;
      }

      if (target === "#home") {
          $("html, body").animate({
              scrollTop: 0
          }, 500);
      } else {
          var offset = $(target).offset().top - 40;

          $("html, body").animate({
              scrollTop: offset
          }, 500);
      }

      $(".header ul li a").removeClass("active");
      $(this).addClass("active");
  });

  //Initial content revealing js
  ScrollReveal({
      distance: "100px",
      duration: 2000,
      delay: 200
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
      origin: "left"
  });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
      origin: "right"
  });
  ScrollReveal().reveal(".project-title, .contact-title, .page-header2", { // Added .page-header2
      origin: "top"
  });
  ScrollReveal().reveal(".projects, .contact, .carousel-container", { // Added .carousel-container
      origin: "bottom"
  });

  //contact form to excel sheet
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
  const form = document.forms['submitToGoogleSheet']
  const msg = document.getElementById("msg")

  form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
          .then(response => {
              msg.innerHTML = "Message sent successfully"
              setTimeout(function() {
                  msg.innerHTML = ""
              }, 5000)
              form.reset()
          })
          .catch(error => console.error('Error!', error.message))
  })

});

function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  // Checking if scroll position is at the top of the page
  if (scrollPosition === 0) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#home']").addClass("active");
      return;
  }

  // Iterate through each section and update the active class in the header
  $("section, .carousel-container").each(function() { // Added .carousel-container
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();

      if (
          scrollPosition >= offset - 40 &&
          scrollPosition < offset + height - 40
      ) {
          $(".header ul li a").removeClass("active");
          $(".header ul li a[href='#" + target + "']").addClass("active");
      }
  });
}

let currentSlide = 0;

function moveCarousel(direction) {
  const carousel = document.querySelector('.carousel');
  const totalSlides = document.querySelectorAll('.carousel-item').length;

  // Update current slide
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

  // Move carousel
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}




function sendMail(){
  let params={
    NAME:document.getElementById('name').value,
    EMAIL:document.getElementById('email').value,
    SUBJECT:document.getElementById('subject').value,
    MESSAGE:document.getElementById('message').value

  }
  emailjs.send("service_9vpiuoa","template_qnq4qpk",params).then(alert("Mail Sent Successfully"))
    
}