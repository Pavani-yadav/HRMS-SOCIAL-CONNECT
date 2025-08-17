document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const submitButton = this.querySelector('button[type="submit"]');

    // Add loading state
    submitButton.textContent = 'Registering...';
    submitButton.disabled = true;

    fetch('api/register.php', {
        method: 'POST',
        body: formData
    }).then(res => res.json())
      .then(data => {
          // Show success message
          const alertDiv = document.createElement('div');
          alertDiv.className = 'alert alert-success';
          alertDiv.textContent = data.message;
          this.parentNode.insertBefore(alertDiv, this);

          // Remove alert after 3 seconds
          setTimeout(() => alertDiv.remove(), 3000);

          this.reset();
      })
      .catch(error => {
          // Show error message
          const alertDiv = document.createElement('div');
          alertDiv.className = 'alert alert-error';
          alertDiv.textContent = 'Error registering employee. Please try again.';
          this.parentNode.insertBefore(alertDiv, this);

          setTimeout(() => alertDiv.remove(), 3000);
          console.error('Registration error:', error);
      })
      .finally(() => {
          submitButton.textContent = '✅ Register Employee';
          submitButton.disabled = false;
      });
});

function searchEmployee() {
    const name = document.getElementById('searchInput').value;
    const resultsContainer = document.getElementById('searchResults');

    if (!name.trim()) {
        resultsContainer.innerHTML = '<div class="no-results">Please enter a name to search.</div>';
        return;
    }

    // Add loading state
    resultsContainer.innerHTML = '<div class="loading">Searching...</div>';

    fetch('api/search.php?name=' + encodeURIComponent(name))
        .then(res => res.json())
        .then(data => {
            const output = data.length ? data.map(emp => `
                <div class="employee-card animate-fade-in">
                    <div class="employee-name">${emp.name}</div>
                    <div class="employee-details">${emp.email} • ${emp.role}</div>
                </div>
            `).join('') : '<div class="no-results">No results found.</div>';
            resultsContainer.innerHTML = output;
        })
        .catch(error => {
            resultsContainer.innerHTML = '<div class="alert alert-error">Error searching employees. Please try again.</div>';
            console.error('Search error:', error);
        });
}

function loadPayroll(event) {
    const payrollContainer = document.getElementById('payrollData');
    const button = event ? event.target : document.querySelector('button[onclick="loadPayroll()"]');

    // Add loading state
    button.textContent = 'Loading...';
    button.disabled = true;
    payrollContainer.innerHTML = '<div class="loading">Loading payroll data...</div>';

    fetch('api/payroll.php')
        .then(res => res.json())
        .then(data => {
            const html = data.map(item => `
                <div class="payroll-item animate-fade-in">
                    <span class="employee-name">${item.name}</span>
                    <span class="salary">₹${item.salary.toLocaleString()}</span>
                </div>
            `).join('');
            payrollContainer.innerHTML = html;
        })
        .catch(error => {
            payrollContainer.innerHTML = '<div class="alert alert-error">Error loading payroll data. Please try again.</div>';
            console.error('Payroll error:', error);
        })
        .finally(() => {
            button.textContent = '📊 View Payroll Data';
            button.disabled = false;
        });
}
