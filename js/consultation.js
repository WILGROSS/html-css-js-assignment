function contactFormHandler(event){
    event.preventDefault();
    checkErrors(event);
}

function checkErrors(event){
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const nameTooShort = !/^[A-Za-zÅÄÖåäö]{2,}\s[A-Za-zÅÄÖåäö]{2,}$/.test(data.fullName);

    const invalidEmail = !/^[A-Za-zÅÄÖåäö0-9._%+-]{2,}@[A-Za-zÅÄÖåäö0-9.-]{2,}\.[A-Za-zÅÄÖåäö]{2,}(?:\.[A-Za-zÅÄÖåäö]{2,})?$/.test(data.email);

    const isValidDate = data.date && data.time;
    const selectedDateTime = isValidDate ? new Date(`${data.date}T${data.time}`) : null;
    const currentTimePlusOneHour = new Date(new Date().getTime() + (60 * 60 * 1000));
    const invalidDateTime = !selectedDateTime || selectedDateTime <= currentTimePlusOneHour;

    const specialistSelect = document.querySelector('#specialist-field');
    const invalidSpecialist = !specialistSelect.value || specialistSelect.value === "";

    const fullNameLabel = document.querySelector('#full-name-info')
    const emailLabel = document.querySelector('#email-info')
    const specialistLabel = document.querySelector('#specialist-info')
    const dateTimeLabel = document.querySelector('#date-time-info')
    
    if (nameTooShort){
      fullNameLabel.innerHTML = '* Please enter your first and last name.'
      fullNameLabel.classList.remove('success')
      fullNameLabel.classList.add('error');
    }
    else{
        fullNameLabel.innerHTML = 'Looks good!'
        fullNameLabel.classList.remove('error')
        fullNameLabel.classList.add('success');
    }
 
    if (invalidEmail){
        emailLabel.innerHTML = '* Please enter your e-mail address.'
        emailLabel.classList.remove('success')
        emailLabel.classList.add('error');
    }
    else{
        emailLabel.innerHTML = 'Looks good!'
        emailLabel.classList.remove('error')
        emailLabel.classList.add('success');
    }
    
    if (invalidSpecialist){
        specialistLabel.innerHTML = '* Please select a specialist.'
        specialistLabel.classList.remove('success')
        specialistLabel.classList.add('error');
    }
    else{
        specialistLabel.innerHTML = 'Looks good!'
        specialistLabel.classList.remove('error')
        specialistLabel.classList.add('success');
    }

    if (invalidDateTime){
        dateTimeLabel.innerHTML = '* Please enter a valid date and time.'
        dateTimeLabel.classList.remove('success')
        dateTimeLabel.classList.add('error');
    }
    else{
        dateTimeLabel.innerHTML = 'Looks good!'
        dateTimeLabel.classList.remove('error')
        dateTimeLabel.classList.add('success');
    }

    if (!nameTooShort && !invalidEmail && !invalidDateTime && !invalidSpecialist) {
        const appointmentData = {
            fullName: data.fullName,
            email: data.email,
            specialist: specialistSelect.value,
            date: data.date,
            time: data.time
        };
          const selectedSpecialistText = specialistSelect.options[specialistSelect. selectedIndex].text;

        fetch('https://kyhnet23-assignment.azurewebsites.net/api/book-appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointmentData)
        })
        .then(response => {
            if(response.status === 200) {
                alert(`Successfully booked appointment for ${data.fullName} with ${selectedSpecialistText} on ${data.date} at ${data.time}!
                We've sent a  confirmation to ${data.email}.`);
                dateTimeLabel.classList.remove('error')
                dateTimeLabel.classList.remove('success')
                dateTimeLabel.innerHTML = ''
                specialistLabel.classList.remove('error')
                specialistLabel.classList.remove('success')
                specialistLabel.innerHTML = ''
                emailLabel.classList.remove('error')
                emailLabel.classList.remove('success')
                emailLabel.innerHTML = ''
                fullNameLabel.classList.remove('error')
                fullNameLabel.classList.remove('success')
                fullNameLabel.innerHTML = ''
                event.target.reset();

            } else {
                alert('Failed to book appointment, Please try again');
            }
        })
        .catch(error => {
            alert('Error booking appointment, Please try again');
        });
    }
}

fetch('https://kyhnet23-assignment.azurewebsites.net/api/specialists')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    populateSpecialists(data);
  })
  .catch(error => console.error('Error fetching specialists:', error));

  function populateSpecialists(specialists) {
    const select = document.getElementById('specialist-field');
    specialists.forEach(specialist => {
      const option = document.createElement('option');
      option.value = specialist.id;
      option.textContent = `${specialist.firstName} ${specialist.lastName}`;
      select.appendChild(option);
    });
  }