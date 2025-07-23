// Mobile menu toggle
const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
menuBtn.addEventListener('click', () => nav.classList.toggle('open'));

// Random sustainable tech quotes
const quotes = [
  '“The greatest threat to our planet is the belief that someone else will save it.” – Robert Swan',
  '“Innovation is seeing change as an opportunity, not a threat.” – Steve Jobs',
  '“Doing more with less is compassionate and enduring.” – Paul Hawken',
  '“Sustainability is about doing more good.” – Jochen Zeitz'
];
// Display a random quote
const quoteEl = document.getElementById('quote');
quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];

// Set year in footer
document.getElementById('year').textContent = new Date().getFullYear();
