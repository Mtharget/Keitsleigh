document.addEventListener("DOMContentLoaded", function () {
    // Function to load the footer dynamically
    function loadFooter() {
        const footerContainer = document.getElementById("footer");
        if (footerContainer) {
            fetch("footer.html")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to load footer");
                    }
                    return response.text();
                })
                .then((data) => {
                    footerContainer.innerHTML = data;

                    // Attach event listener for the newsletter form after footer is loaded
                    initializeSubscriberForm();
                })
                .catch((error) => {
                    console.error("Error loading footer:", error);
                });
        }
    }

    // Function to initialize the subscriber form
    function initializeSubscriberForm() {
        const subscribeForm = document.getElementById("subscribeForm");
        const errorElement = document.getElementById("newLettereror");

        if (subscribeForm) {
            subscribeForm.addEventListener("submit", async function (event) {
                event.preventDefault(); // Prevent the form from reloading the page
                const emailInput = document.getElementById("email");
                if (!emailInput) return;

                const email = emailInput.value;

                try {
                    const response = await fetch("https://app.kzdsolutions.co.za/api/subscribe", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email }),
                    });

                    if (response.ok) {
                        errorElement.style.color = "green";
                        errorElement.textContent = "You have successfully subscribed!";
                    } else {
                        const data = await response.json();
                        errorElement.style.color = "red";
                        errorElement.textContent = data.message || "Subscription failed. Please try again.";
                    }
                } catch (error) {
                    console.error("Error subscribing:", error);
                    errorElement.style.color = "red";
                    errorElement.textContent = "An error occurred. Please try again.";
                }
            });
        }
    }

    // Call the footer loader function
    loadFooter();
});
