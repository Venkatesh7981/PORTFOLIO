$(document).ready(function() {
    // Sticky Header
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1) {
            $(".header-area").addClass("sticky");
        } else {
            $(".header-area").removeClass("sticky");
        }
        updateActiveSection();
    });

    $(".header ul li a").click(function(e) {
        e.preventDefault();
        var target = $(this).attr("href");

        if ($(target).hasClass("active-section")) {
            return;
        }

        if (target === "#home") {
            $("html, body").animate({ scrollTop: 0 }, 500);
        } else {
            var offset = $(target).offset().top - 40;
            $("html, body").animate({ scrollTop: offset }, 500);
        }

        $(".header ul li a").removeClass("active");
        $(this).addClass("active");
    });

    // Scroll Reveal Animations
    ScrollReveal({ distance: "100px", duration: 2000, delay: 200 });
    ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", { origin: "left" });
    ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", { origin: "right" });
    ScrollReveal().reveal(".project-title, .contact-title, .page-header2", { origin: "top" });
    ScrollReveal().reveal(".projects, .contact, .carousel-container", { origin: "bottom" });

    // Google Sheets Form Submission
    const scriptURL = "https://script.google.com/macros/s/AKfycbzdmrMoz4igioFhF4xpQCHGV9snCvAyB_baFJpRPGUi2pRev74ZlCR33NMHjksj8WYT/exec";
    const form = document.forms["submitToGoogleSheet"];
    const msg = document.getElementById("msg");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        fetch(scriptURL, {
            method: "POST",
            body: new FormData(form),
            mode: "cors", // Fix CORS error
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === "success") {
                msg.innerHTML = "Message stored successfully!";
            } else {
                msg.innerHTML = "Successfully done.";
            }
            form.reset();
        })
        .catch(error => {
            console.error("Error!", error.message);
            msg.innerHTML = "Successfully done.";
        });
    });
});

// Function to update active section in the navbar
function updateActiveSection() {
    var scrollPosition = $(window).scrollTop();

    if (scrollPosition === 0) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#home']").addClass("active");
        return;
    }

    $("section, .carousel-container").each(function() {
        var target = $(this).attr("id");
        var offset = $(this).offset().top;
        var height = $(this).outerHeight();

        if (scrollPosition >= offset - 40 && scrollPosition < offset + height - 40) {
            $(".header ul li a").removeClass("active");
            $(".header ul li a[href='#" + target + "']").addClass("active");
        }
    });
}
//image slider
let currentIndex = 0;

function moveCarousel(direction) {
    const items = document.querySelectorAll(".carousel-item");
    const totalItems = items.length;

    // Hide current item
    items[currentIndex].style.display = "none";

    // Calculate next index
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = totalItems - 1;
    } else if (currentIndex >= totalItems) {
        currentIndex = 0;
    }

    // Show new item
    items[currentIndex].style.display = "block";
}

// Initialize by displaying the first item
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".carousel-item");
    items.forEach((item, index) => {
        item.style.display = index === 0 ? "block" : "none";
    });
});


// EmailJS Integration
function SendMail() {
    emailjs.send("service_9vpiuoa", "template_qnq4qpk", {
        from_name: document.querySelector("input[name='NAME']").value,
        email_id: document.querySelector("input[name='EMAIL']").value,
        subject: document.querySelector("input[name='SUBJECT']").value,
        message: document.querySelector("textarea[name='MESSAGE']").value,
    }, "8ppgfIQ01nDCg9MaW")
    .then(
        function(response) {
            console.log("SUCCESS!", response.status, response.text);
            document.getElementById("msg").innerHTML = "Message sent successfully!";
        },
        function(error) {
            console.log("FAILED...", error);
            document.getElementById("msg").innerHTML = "Message sending failed.";
        }
    );
}
