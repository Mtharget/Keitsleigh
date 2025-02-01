// Script for Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.display = 'none'; // Hide loader when page loads
});

// Script for Navbar Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Script for Footer Fade-in on Scroll
const footer = document.querySelector('.footer');

window.addEventListener('scroll', () => {
    const footerPosition = footer.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (footerPosition < screenHeight) {
        footer.classList.add('visible');
    }
});




// Function to detect when the footer is in view
function checkFooterInView() {
    const footer = document.getElementById('footer');
    const footerPosition = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // If the footer is in the viewport, add the "visible" class
    if (footerPosition < windowHeight) {
        footer.classList.add('visible');
    }
}

// Call the function on scroll
window.addEventListener('scroll', checkFooterInView);

// Also, run the function once on page load in case the footer is already in view
checkFooterInView();





// Function to handle navigation link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default link behavior

        // Show loader
        const loader = document.getElementById('loader');
        loader.style.display = 'block';

        // Simulate loading time
        setTimeout(() => {
            loader.style.display = 'none';
            const dataLink = this.getAttribute('data-link');
            if (dataLink) {
                window.location.href = `#${dataLink}`;
            }
        }, 3000); // 3 seconds loading time
    });
});


document.querySelector('.scroll-arrow a').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    window.scrollBy({
        top: 50,  // Adjust to a small scroll distance (e.g., 50px)
        left: 0,
        behavior: 'smooth'
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const footerContainer = document.getElementById("footer");

    if (footerContainer) {
        fetch("footer.html")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load footer");
                }
                return response.text();
            })
            .then((footerHTML) => {
                footerContainer.innerHTML = footerHTML;

                // Initialize modal functionality after footer is loaded
                const modalLinks = document.querySelectorAll(".modal-link");
                const modal = document.getElementById("modal");
                const modalTitle = document.getElementById("modal-title");
                const modalBody = document.getElementById("modal-body");

                modalLinks.forEach((link) => {
                    link.addEventListener("click", (event) => {
                        event.preventDefault();
                        const modalContent = link.dataset.modal;

                        // Set modal content based on the link clicked
                        switch (modalContent) {
                            case "privacy-policy":
                                modalTitle.textContent = "Privacy Policy";
                                modalBody.textContent = "Here is the Privacy Policy...";
                                break;
                            case "terms-conditions":
                                modalTitle.textContent = "Terms and Conditions";
                                modalBody.textContent = "Here are the Terms and Conditions...";
                                break;
                            case "copyright":
                                modalTitle.textContent = "Copyright";
                                modalBody.textContent = "Copyright information...";
                                break;
                        }

                        modal.style.display = "block";
                    });
                });

                // Close the modal
                document.querySelector(".close-btn").addEventListener("click", () => {
                    modal.style.display = "none";
                });

                window.addEventListener("click", (event) => {
                    if (event.target === modal) {
                        modal.style.display = "none";
                    }
                });
            })
            .catch((error) => {
                console.error("Error loading footer:", error);
            });
    }
});
