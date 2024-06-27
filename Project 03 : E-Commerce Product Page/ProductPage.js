document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const thumbnails = document.querySelectorAll('.thumbnail-images img');
    const mainImage = document.querySelector('.main-image');

    // Tab buttons functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            document.querySelector(`#${button.dataset.tab}`).classList.add('active');
        });
    });

    // Thumbnail image functionality
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnail.classList.add('active');
            mainImage.src = thumbnail.src;
        });
    });

    // Add to cart button alert
    document.querySelector('.cart-button').addEventListener('click', () => {
        alert('Your product has been added to the cart!');
    });

    // Submit review form functionality
    document.getElementById('review-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reviewer-name').value;
        const rating = document.getElementById('review-rating').value;
        const comment = document.getElementById('review-comment').value;

        if (name && rating && comment) {
            const reviewContainer = document.querySelector('.reviews-container');
            const newReview = document.createElement('div');
            newReview.classList.add('review');
            newReview.innerHTML = `
                <h4>${name} - ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</h4>
                <p>${comment}</p>
            `;
            reviewContainer.appendChild(newReview);

            document.getElementById('review-form').reset();
        }
    });

    // Check pincode functionality
    const pincodeInput = document.getElementById("pincode-input");
    const checkPincodeBtn = document.getElementById("check-pincode");
    const pincodeMessage = document.getElementById("pincode-message");

    checkPincodeBtn.addEventListener("click", function(event) {
        event.preventDefault();

        const pincode = pincodeInput.value.trim();
        const restrictedPincodes = ['764059', '764060', '764061'];

        if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
            pincodeMessage.textContent = "Please enter a valid 6-digit pincode.";
            pincodeMessage.style.color = "red";
            return;
        }

        if (restrictedPincodes.includes(pincode)) {
            pincodeMessage.textContent = "Sorry, delivery is not available to this pincode.";
            pincodeMessage.style.color = "red";
            return;
        }

        // Simulate checking delivery availability (replace with actual logic)
        setTimeout(function() {
            // Assuming delivery is available for demonstration
            pincodeMessage.textContent = "Delivery available to " + pincode + ".";
            pincodeMessage.style.color = "green";
        }, 1000);

        pincodeInput.value = "";
    });
});
