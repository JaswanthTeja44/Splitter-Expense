    const expenses = [];

    function addExpense() {
      const payer = document.getElementById('payer').value.trim();
      const amount = parseFloat(document.getElementById('amount').value);
      const participants = document.getElementById('participants').value
        .split(',')
        .map(name => name.trim())
        .filter(name => name);

      if (!payer || isNaN(amount) || amount <= 0 || participants.length === 0) {
        alert('Please enter valid data for all fields.');
        return;
      }

      expenses.push({ payer, amount, participants });

      document.getElementById('payer').value = '';
      document.getElementById('amount').value = '';
      document.getElementById('participants').value = '';

      alert('Expense added successfully!');
    }

    function calculateBalances() {
      const balances = {};

      expenses.forEach(({ payer, amount, participants }) => {
        const share = amount / participants.length;

        participants.forEach(participant => {
          if (participant === payer) return;

          if (!balances[participant]) balances[participant] = 0;
          if (!balances[payer]) balances[payer] = 0;

          balances[participant] -= share;
          balances[payer] += share;
        });
      });

      const results = [];
      const people = Object.keys(balances);

      people.forEach(p => {
        if (balances[p] > 0) {
          people.forEach(q => {
            if (balances[q] < 0) {
              const amount = Math.min(balances[p], -balances[q]);
              if (amount > 0.01) {
                results.push(`${q} owes ${p} $${amount.toFixed(2)}`);
                balances[p] -= amount;
                balances[q] += amount;
              }
            }
          });
        }
      });

      const output = document.getElementById('output');
      output.innerHTML = '<h2>Who Owes Whom:</h2>';
      if (results.length === 0) {
        output.innerHTML += '<p class="result-item animated">All settled up!</p>';
      } else {
        results.forEach(res => {
          const div = document.createElement('div');
          div.className = 'result-item animated';
          div.textContent = res;
          output.appendChild(div);
        });
      }
    }
