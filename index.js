// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.tool-section').forEach(sec => sec.classList.remove('active'));
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.classList.add('active');
        window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
      }
    });
  });
  
  function calcBMI() {
    const w = parseFloat(document.getElementById('bmi-weight').value);
    const h = parseFloat(document.getElementById('bmi-height').value) / 100;
    const result = document.getElementById('bmi-result');
    result.innerText = (w && h) ? `Your BMI is ${(w / (h * h)).toFixed(2)}` : 'Enter valid values.';
  }
  
  function calcAge() {
    const dob = new Date(document.getElementById('dob').value);
    if (!isNaN(dob)) {
      const diff = Date.now() - dob.getTime();
      const age = new Date(diff).getUTCFullYear() - 1970;
      document.getElementById('age-result').innerText = `You are ${age} years old.`;
    }
  }
  
  function calcEMI() {
    const p = +document.getElementById('loan-amount').value;
    const r = +document.getElementById('loan-interest').value / 12 / 100;
    const n = +document.getElementById('loan-term').value * 12;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    document.getElementById('emi-result').innerText = `EMI: ₹${emi.toFixed(2)}`;
  }
  
  function calcDueDate() {
    const lmp = new Date(document.getElementById('lmp').value);
    if (!isNaN(lmp)) {
      const dueDate = new Date(lmp.setDate(lmp.getDate() + 280));
      document.getElementById('due-date-result').innerText = `Due Date: ${dueDate.toDateString()}`;
    }
  }
  
  function calcBMR() {
    const w = +document.getElementById('cal-weight').value;
    const h = +document.getElementById('cal-height').value;
    const a = +document.getElementById('cal-age').value;
    const g = document.getElementById('cal-gender').value;
    let bmr = g === 'male'
      ? 88.36 + (13.4 * w) + (4.8 * h) - (5.7 * a)
      : 447.6 + (9.2 * w) + (3.1 * h) - (4.3 * a);
    document.getElementById('bmr-result').innerText = `Estimated BMR: ${bmr.toFixed(0)} kcal/day`;
  }
  
  document.getElementById("loveForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const yourName = document.getElementById("yourName").value.trim();
    const partnerName = document.getElementById("partnerName").value.trim();
  
    const combined = yourName + partnerName;
    let score = 0;
    for (let i = 0; i < combined.length; i++) {
      score += combined.charCodeAt(i);
    }
    const compatibility = (score % 100) + 1;
    document.getElementById("loveResult").textContent = `💖 Compatibility Score: ${compatibility}%`;
  });
  
  function calcPercent() {
    const part = +document.getElementById('percent-part').value;
    const total = +document.getElementById('percent-total').value;
    document.getElementById('percent-result').innerText = total > 0
      ? `Result: ${(part / total * 100).toFixed(2)}%`
      : 'Enter valid numbers.';
  }
  
  function calcTax() {
    const income = parseFloat(document.getElementById("income").value);
    const rate = parseFloat(document.getElementById("tax-rate").value);
  
    if (isNaN(income) || income < 0 || isNaN(rate) || rate < 0) {
      document.getElementById("tax-result").innerText = "Please enter valid income and tax rate.";
      return;
    }
  
    const tax = (income * rate) / 100;
    const afterTax = income - tax;
  
    document.getElementById("tax-result").innerText = 
      `Tax: ₹${tax.toFixed(2)} | After Tax Income: ₹${afterTax.toFixed(2)}`;
  }

  function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const from = document.getElementById("from-currency").value.toUpperCase();
    const to = document.getElementById("to-currency").value.toUpperCase();
    const resultEl = document.getElementById("currency-result");
  
    resultEl.textContent = "";
  
    if (!amount || !from || !to) {
      resultEl.textContent = "❗ Please enter a valid amount and currency codes.";
      return;
    }
  
    fetch(`https://api.frankfurter.dev/latest?from=${from}&to=${to}`)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not OK.");
        return res.json();
      })
      .then(data => {
        if (!data.rates || !data.rates[to]) {
          resultEl.textContent = "❌ Invalid currency code.";
          return;
        }
        const rate = data.rates[to];
        const converted = (rate * amount).toFixed(2);
        resultEl.textContent = `✅ ${amount} ${from} = ${converted} ${to}`;
      })
      .catch(err => {
        resultEl.textContent = "⚠️ Error: " + err.message;
      });
  }  
  
// 🕓 Time Zone Converter
function convertTimeZone() {
  const baseTime = document.getElementById("base-time").value;
  const fromZone = document.getElementById("from-zone").value;
  const toZone = document.getElementById("to-zone").value;
  const resultEl = document.getElementById("timezone-result");

  if (!baseTime || !fromZone || !toZone) {
    resultEl.textContent = "Please fill in all fields.";
    return;
  }

  const [hours, minutes] = baseTime.split(":").map(Number);
  const now = new Date();
  now.setHours(hours);
  now.setMinutes(minutes);
  now.setSeconds(0);

  // Convert base time to source time zone
  const fromTime = new Date(now.toLocaleString("en-US", { timeZone: fromZone }));
  // Convert source time to target time zone
  const toTime = new Date(fromTime.toLocaleString("en-US", { timeZone: toZone }));

  const converted = toTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  resultEl.textContent = `Converted Time: ${converted} (${toZone})`;
}

// ========== Unit Converter ==========
const unitOptions = {
  length: ['meter', 'kilometer', 'mile', 'foot'],
  weight: ['gram', 'kilogram', 'pound', 'ounce'],
  temperature: ['celsius', 'fahrenheit', 'kelvin']
};

const unitFactors = {
  length: {
    meter: 1,
    kilometer: 1000,
    mile: 1609.34,
    foot: 0.3048
  },
  weight: {
    gram: 1,
    kilogram: 1000,
    pound: 453.592,
    ounce: 28.3495
  }
};

function updateUnitDropdowns() {
  const type = document.getElementById("unit-type").value;
  const from = document.getElementById("unit-from");
  const to = document.getElementById("unit-to");
  from.innerHTML = '';
  to.innerHTML = '';
  unitOptions[type].forEach(unit => {
    from.innerHTML += `<option value="${unit}">${unit}</option>`;
    to.innerHTML += `<option value="${unit}">${unit}</option>`;
  });
}

function convertUnit() {
  const type = document.getElementById("unit-type").value;
  const value = parseFloat(document.getElementById("unit-value").value);
  const from = document.getElementById("unit-from").value;
  const to = document.getElementById("unit-to").value;
  let result;

  if (type === 'temperature') {
    if (from === to) result = value;
    else if (from === 'celsius') result = to === 'fahrenheit' ? (value * 9/5) + 32 : value + 273.15;
    else if (from === 'fahrenheit') result = to === 'celsius' ? (value - 32) * 5/9 : (value - 32) * 5/9 + 273.15;
    else if (from === 'kelvin') result = to === 'celsius' ? value - 273.15 : (value - 273.15) * 9/5 + 32;
  } else {
    result = value * (unitFactors[type][from] / unitFactors[type][to]);
  }

  document.getElementById("unit-result").innerText = `Result: ${result.toFixed(4)} ${to}`;
}

document.getElementById("unit-type").addEventListener("change", updateUnitDropdowns);
updateUnitDropdowns();


// ========== Word / Character Counter ==========
function countWords() {
  const text = document.getElementById("word-input").value.trim();
  const words = text === "" ? 0 : text.split(/\s+/).length;
  const chars = text.length;
  document.getElementById("word-result").innerText = `Words: ${words}, Characters: ${chars}`;
}


// ========== Text Case Converter ==========
function convertCase(type) {
  let text = document.getElementById("case-input").value;
  if (type === "upper") text = text.toUpperCase();
  else if (type === "lower") text = text.toLowerCase();
  else if (type === "title") text = text.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase());

  document.getElementById("case-result").innerText = text;
}


// ========== QR Code Generator ==========
function generateQR() {
  const text = document.getElementById("qr-input").value.trim();
  if (!text) return;

  const qrCodeDiv = document.getElementById("qr-code");
  qrCodeDiv.innerHTML = '';
  const img = document.createElement("img");
  img.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}&size=200x200`;
  qrCodeDiv.appendChild(img);
}


// ========== Base64 Encoder / Decoder ==========
function encodeBase64() {
  const input = document.getElementById("base64-input").value;
  const result = btoa(input);
  document.getElementById("base64-result").innerText = result;
}

function decodeBase64() {
  const input = document.getElementById("base64-input").value;
  try {
    const result = atob(input);
    document.getElementById("base64-result").innerText = result;
  } catch (e) {
    document.getElementById("base64-result").innerText = "Invalid Base64 input.";
  }
}


// ========== Password Generator ==========
function generatePassword() {
  const length = parseInt(document.getElementById("password-length").value) || 12;
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById("password-result").innerText = password;
}


// ========== Random Number Generator ==========
function generateRandom() {
  const min = parseInt(document.getElementById("rand-min").value);
  const max = parseInt(document.getElementById("rand-max").value);
  if (isNaN(min) || isNaN(max) || min > max) {
    document.getElementById("random-result").innerText = "Invalid range";
    return;
  }
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  document.getElementById("random-result").innerText = `Random Number: ${random}`;
}


// ========== Age in Days / Months ==========
function calcAgeInDays() {
  const birthdate = new Date(document.getElementById("birthdate").value);
  const today = new Date();
  const diffTime = today - birthdate;
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30.44);
  document.getElementById("days-result").innerText = `You are ${days} days or about ${months} months old.`;
}


// ========== Tip Calculator ==========
function calcTip() {
  const bill = parseFloat(document.getElementById("bill-amount").value);
  const percent = parseFloat(document.getElementById("tip-percent").value);
  if (isNaN(bill) || isNaN(percent)) {
    document.getElementById("tip-result").innerText = "Invalid input.";
    return;
  }
  const tip = bill * (percent / 100);
  const total = bill + tip;
  document.getElementById("tip-result").innerText = `Tip: $${tip.toFixed(2)}, Total: $${total.toFixed(2)}`;
}


// ========== Date Difference Calculator ==========
function addCourse() {
  const form = document.getElementById("gpa-form");
  const div = document.createElement("div");
  div.classList.add("mb-2");
  div.innerHTML = `
    <input type="text" placeholder="Course Name" class="course-name border p-2 mr-2" />
    <input type="number" placeholder="Grade (0-100)" class="course-grade border p-2 mr-2" />
    <input type="number" placeholder="Credits" class="course-credits border p-2 mr-2" />
  `;
  form.appendChild(div);
}