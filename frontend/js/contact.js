document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.querySelector('.contact__form');
    const messageAlert = document.querySelector('.contact__msg');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Update UI to show sending state
            if (messageAlert) {
                messageAlert.style.display = 'none'; // Reset first
                messageAlert.classList.remove('alert-danger');
                messageAlert.classList.add('alert-success');
                messageAlert.textContent = 'Sending...';
                messageAlert.style.display = 'block';
            }

            // Gather form data
            const formData = new FormData(contactForm);
            const payload = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Send POST request
            fetch('https://demo.altairattic.net/hotel-two/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            })
                .then(response => {
                    if (response.ok) {
                        // Try to parse JSON, but handle if it's not
                        return response.text().then(text => {
                            try {
                                return JSON.parse(text);
                            } catch (e) {
                                return { message: 'Success' };
                            }
                        });
                    } else {
                        throw new Error('Server returned ' + response.status);
                    }
                })
                .then(data => {
                    // Success handling
                    if (messageAlert) {
                        messageAlert.textContent = 'Your message was sent successfully.';
                        messageAlert.style.display = 'block';
                    }
                    contactForm.reset();
                })
                .catch(error => {
                    console.error('Error submitting form:', error);

                    // Error UI
                    if (messageAlert) {
                        messageAlert.classList.remove('alert-success');
                        messageAlert.classList.add('alert-danger');
                        messageAlert.textContent = 'There was an error sending your message. Please try again.';
                        messageAlert.style.display = 'block';
                    }
                });
        });
    }
});
