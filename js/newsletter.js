  function newsletterFormHandler(event){
    event.preventDefault();
    checkEmailErrors(event.target);
  }
  
  function checkEmailErrors(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const emailLabel = document.querySelector('#newsletter-email-info');
  
    const invalidEmail = !/^[A-Za-zÅÄÖåäö0-9._%+-]{2,}@[A-Za-zÅÄÖåäö0-9.-]{2,}\.[A-Za-zÅÄÖåäö]{2,}(?:\.[A-Za-zÅÄÖåäö]{2,})?$/.test(data.email);
  
    if (invalidEmail) {
      emailLabel.innerHTML = '* Please enter a valid e-mail address.';
      emailLabel.classList.remove('success');
      emailLabel.classList.add('error');
    } else {
      const apiUrl = `https://kyhnet23-assignment.azurewebsites.net/api/subscribe?email=${encodeURIComponent(data.email)}`;
  
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        if (response.status === 200) {
          emailLabel.innerHTML = 'Thank you for subscribing to our newsletter!';
          emailLabel.classList.remove('error');
          emailLabel.classList.add('success');
          form.reset();
        } else {
          emailLabel.innerHTML = 'There was an error subscribing. Please try again.';
          emailLabel.classList.remove('success');
          emailLabel.classList.add('error');
        }
      })
      .catch(error => {
        console.error('Error during subscription:', error);
        emailLabel.innerHTML = 'There was an error subscribing. Please try again.';
        emailLabel.classList.remove('success');
        emailLabel.classList.add('error');
      });
    }
  }
  
  