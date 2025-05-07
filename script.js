document.addEventListener('DOMContentLoaded', function() {

    // Active navigation link styling
    const currentLocation = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });

    // Order Page: Order Button Interactivity
    const orderForm = document.getElementById('chipOrderForm');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const orderStatusMsg = document.getElementById('orderStatusMsg');

    if (placeOrderBtn && orderForm && orderStatusMsg) {
        let originalButtonText = placeOrderBtn.textContent;
        const successMessage = 'Order success! Details will be mailed shortly. Check your emails from Star Chips for tracking ID, invoice, and other documents.';

        placeOrderBtn.addEventListener('mouseover', function() {
            if (placeOrderBtn.textContent !== successMessage) {
                // Optional: You could change text on hover too, if desired.
                // For now, hover effect is primarily CSS based.
            }
        });

        placeOrderBtn.addEventListener('mouseout', function() {
            if (placeOrderBtn.textContent !== successMessage) {
                // placeOrderBtn.textContent = originalButtonText; // Reset if hover text was changed
            }
        });

        orderForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission for this demo

            // Basic validation example (can be expanded)
            const customerName = document.getElementById('customerName').value;
            const email = document.getElementById('email').value;
            const quantity = document.getElementById('quantity').value;
            const chipType = document.getElementById('chipType').value;

            if (!customerName || !email || !quantity || !chipType) {
                orderStatusMsg.textContent = "Please fill in all required fields.";
                orderStatusMsg.style.color = "#dc3545"; // Red for error
                return;
            }


            // Change button text and show status message
            placeOrderBtn.textContent = successMessage;
            placeOrderBtn.style.backgroundColor = "#17a2b8"; // Info blue for success indication
            placeOrderBtn.disabled = true; // Disable button after successful "submission"

            orderStatusMsg.textContent = "Processing your order...";
            orderStatusMsg.style.color = "#007bff"; // Blue for processing

            // Simulate a delay for processing
            setTimeout(() => {
                orderStatusMsg.textContent = "Order details simulated. In a real application, this would be sent to a server.";
                orderStatusMsg.style.color = "#28a745"; // Green for success confirmation
                console.log("Form Submitted (Simulated):", {
                    name: customerName,
                    email: email,
                    quantity: quantity,
                    chipType: chipType,
                    // ... other form data
                });

                // Optionally reset the form after a delay or redirect
                // setTimeout(() => {
                //     orderForm.reset();
                //     placeOrderBtn.textContent = originalButtonText;
                //     placeOrderBtn.disabled = false;
                //     placeOrderBtn.style.backgroundColor = ""; // Reset style
                //     orderStatusMsg.textContent = "";
                // }, 5000); // Reset after 5 seconds

            }, 2000); // 2 second delay
        });
    }


    // Browse Page: Pre-fill order form if product link is clicked
    const urlParams = new URLSearchParams(window.location.search);
    const productToOrder = urlParams.get('product');

    if (productToOrder && document.getElementById('chipType')) {
        const chipTypeSelect = document.getElementById('chipType');
        // Ensure the value exists in the select options
        if (Array.from(chipTypeSelect.options).some(option => option.value === productToOrder)) {
            chipTypeSelect.value = productToOrder;
        }
    }


    // Feedback Form (Basic simulation)
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission
            alert("Thank you for your feedback! We will review it shortly.");
            feedbackForm.reset();
        });
    }

    // Simple dynamic element: maybe a subtle animation on page load for headers
    const headers = document.querySelectorAll('header.sunflower-box h1, .sunflower-box.form-header');
    headers.forEach(header => {
        header.style.opacity = '0';
        header.style.transition = 'opacity 0.8s ease-in-out';
        setTimeout(() => {
            header.style.opacity = '1';
        }, 100); // slight delay
    });

});