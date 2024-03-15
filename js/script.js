function contactFormHandler(event){
    // alert(12122);
    event.preventDefault();
    checkErrors(event);
}

function checkErrors(event){
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const nameTooShort = data.fullName.length < 2;
    const emailTooShort = data.email.length < 5;
    const invalidDate = data.date.length < 5;
    const invalidTime = data.time.length < 5;

    const fullNameLabel = document.querySelector('#full-name-info')
    const emailLabel = document.querySelector('#email-info')
    const specialistLabel = document.querySelector('#specialist-info')
    const dateLabel = document.querySelector('#date-info')
    const timeLabel = document.querySelector('#time-info')
    
    if (nameTooShort){
      fullNameLabel.innerHTML = 'Please enter your first and last name.'
      fullNameLabel.classList.remove('success')
      fullNameLabel.classList.add('error');
    }
    else{
        fullNameLabel.innerHTML = 'Looks good!'
        fullNameLabel.classList.remove('error')
        fullNameLabel.classList.add('success');
    }
 
    if (emailTooShort){
        emailLabel.innerHTML = 'Please enter your e-mail address.'
        emailLabel.classList.remove('success')
        emailLabel.classList.add('error');
    }
    else{
        emailLabel.innerHTML = 'Looks good!'
        emailLabel.classList.remove('error')
        emailLabel.classList.add('success');
    }

    if (invalidDate){
        dateLabel.innerHTML = 'Please enter a valid date.'
        dateLabel.classList.remove('success')
        dateLabel.classList.add('error');
    }
    else{
        dateLabel.innerHTML = 'Looks good!'
        dateLabel.classList.remove('error')
        dateLabel.classList.add('success');
    }

    if (invalidTime){
        timeLabel.innerHTML = 'Please enter a valid time.'
        timeLabel.classList.remove('success')
        timeLabel.classList.add('error');
    }
    else{
        timeLabel.innerHTML = 'Looks good!'
        timeLabel.classList.remove('error')
        timeLabel.classList.add('success');
    }

    console.log(data);
}

function populateSpecialists(specialists) {
    const select = document.getElementById('specialist-field');
    specialists.forEach(specialist => {
      const option = document.createElement('option');
      option.value = specialist.id;
      option.textContent = `${specialist.firstname} ${specialist.lastname}`;
      select.appendChild(option);
    });
  }
  
  fetch('https://your-api-url/api/specialists')
    .then(response => response.json())
    .then(data => populateSpecialists(data))
    .catch(error => console.error('Error fetching specialists:', error));
  