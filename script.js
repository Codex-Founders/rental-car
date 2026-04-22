/* ─── CURSOR ─── */
const cursorCar = document.getElementById('cursor-car');
const cursorDot = document.getElementById('cursor-dot');
let mx = 0, my = 0, cx = 0, cy = 0, lastX = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursorDot.style.left = mx + 'px';
  cursorDot.style.top  = my + 'px';
});

(function animCursor() {
  cx += (mx - cx) * 0.12;
  cy += (my - cy) * 0.12;
  const dir  = cx - lastX;
  const tilt = Math.max(-12, Math.min(12, dir * 2));
  cursorCar.style.left = cx + 'px';
  cursorCar.style.top  = cy + 'px';
  cursorCar.style.transform = `translate(-50%, -50%) rotate(${tilt}deg)`;
  lastX = cx;
  requestAnimationFrame(animCursor);
})();

/* ─── INTRO ─── */
const intro     = document.getElementById('intro');
const introImg  = document.getElementById('intro-car-img');
const introLogo = document.getElementById('intro-logo');
const beamL     = document.getElementById('beam-left');
const beamR     = document.getElementById('beam-right');

setTimeout(() => {
  introImg.classList.add('lights-on');
  setTimeout(() => {
    beamL.classList.add('active');
    beamR.classList.add('active');
  }, 400);
}, 800);

setTimeout(() => { introLogo.classList.add('show'); }, 1400);
setTimeout(() => { intro.classList.add('fade-out'); }, 2600);
setTimeout(() => { intro.style.display = 'none'; }, 3500);

/* ─── DRAWER ─── */
const hamburger  = document.getElementById('hamburger');
const drawer     = document.getElementById('drawer');
const overlay    = document.getElementById('overlay');
const drawerClose = document.getElementById('drawer-close');

function openDrawer()  {
  drawer.classList.add('open');
  overlay.classList.add('active');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  drawer.classList.remove('open');
  overlay.classList.remove('active');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () =>
  drawer.classList.contains('open') ? closeDrawer() : openDrawer()
);
drawerClose.addEventListener('click', closeDrawer);
overlay.addEventListener('click', closeDrawer);
document.querySelectorAll('.drawer-link').forEach(l => l.addEventListener('click', closeDrawer));

/* ─── SCROLL REVEAL ─── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 0.08 + 's';
  revealObs.observe(el);
});

/* ─── BOOKING MODAL ─── */
const modalOverlay = document.getElementById('bookingModal');
const modalCarName = document.getElementById('modalCarName');
const modalClose   = document.getElementById('modalClose');

function openModal(carName) {
  modalCarName.textContent = carName;
  document.getElementById('modalCarDisplay').value = carName;
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

document.querySelectorAll('.book-now-btn').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.car));
});

/* ─── MODAL WHATSAPP SUBMIT ─── */
document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const car       = document.getElementById('modalCarDisplay').value;
  const pickup    = document.getElementById('pickupDate').value;
  const ret       = document.getElementById('returnDate').value;
  const location  = document.getElementById('pickupLocation').value;
  const driver    = document.querySelector('input[name="driverOption"]:checked')?.value || 'Khud Chalana';

  if (!pickup || !ret || !location) {
    alert('Please fill all fields.');
    return;
  }

  const msg =
    `*APEX DRIVE — Booking Request*\n\n` +
    `*Gari:* ${car}\n` +
    `*Pickup Date:* ${pickup}\n` +
    `*Wapsi Date:* ${ret}\n` +
    `*Location:* ${location}\n` +
    `*Driver:* ${driver}\n\n` +
    `_ApexDrive website se bheja gaya_`;

  const wa = `https://wa.me/923193921895?text=${encodeURIComponent(msg)}`;
  window.open(wa, '_blank');
  closeModal();
});

/* ─── EVENT BOOKING WHATSAPP SUBMIT ─── */
document.getElementById('eventForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name     = document.getElementById('evName').value.trim();
  const phone    = document.getElementById('evPhone').value.trim();
  const carModel = document.getElementById('evCar').value.trim();
  const qty      = document.getElementById('evQty').value.trim();
  const date     = document.getElementById('evDate').value;
  const message  = document.getElementById('evMessage').value.trim();

  if (!name || !phone || !carModel || !qty || !date) {
    alert('Please fill all required fields.');
    return;
  }

  const msg =
    `*APEX DRIVE — Event Booking Enquiry*\n\n` +
    `*Naam:* ${name}\n` +
    `*Phone:* ${phone}\n` +
    `*Car Model:* ${carModel}\n` +
    `*Tadadad:* ${qty}\n` +
    `*Event Date:* ${date}\n` +
    `*Message:* ${message || 'N/A'}\n\n` +
    `_ApexDrive Event Form se bheja gaya_`;

  const wa = `https://wa.me/923193921895?text=${encodeURIComponent(msg)}`;
  window.open(wa, '_blank');
  this.reset();
});

/* ─── PACKAGE BOOKING ─── */
document.querySelectorAll('.pkg-book-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const pkg   = btn.dataset.package;
    const cars  = btn.dataset.cars;
    const price = btn.dataset.price;

    const msg =
      `*APEX DRIVE — Event Package Booking*\n\n` +
      `*Package:* ${pkg}\n` +
      `*Gaariyan:* ${cars}\n` +
      `*Qeemat:* ${price}\n\n` +
      `Mujhe is package ke baare mein aur jankari chahiye.\n\n` +
      `_ApexDrive Packages section se bheja gaya_`;

    const wa = `https://wa.me/923193921895?text=${encodeURIComponent(msg)}`;
    window.open(wa, '_blank');
  });
});

/* ─── STAR RATING ─── */
let selectedStars = 5;
const starBtns = document.querySelectorAll('.star-btn');

starBtns.forEach(btn => {
  btn.addEventListener('mouseover', () => {
    const val = parseInt(btn.dataset.val);
    starBtns.forEach((s, i) => {
      s.classList.toggle('active', i < val);
    });
  });
  btn.addEventListener('click', () => {
    selectedStars = parseInt(btn.dataset.val);
    document.getElementById('reviewStars').value = selectedStars;
    starBtns.forEach((s, i) => {
      s.classList.toggle('selected', i < selectedStars);
      s.classList.toggle('active', i < selectedStars);
    });
  });
});

document.getElementById('starRating').addEventListener('mouseleave', () => {
  starBtns.forEach((s, i) => {
    s.classList.toggle('active', i < selectedStars);
  });
});

// Init all 5 stars selected
starBtns.forEach((s, i) => s.classList.toggle('active', i < 5));

/* ─── REVIEW MODAL ─── */
const reviewModal = document.getElementById('reviewModal');
const reviewModalClose = document.getElementById('reviewModalClose');
const openReviewBtn = document.getElementById('openReviewModal');
const userReviewsGrid = document.getElementById('userReviewsGrid');

function openReviewModal() {
  reviewModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeReviewModal() {
  reviewModal.classList.remove('active');
  document.body.style.overflow = '';
}

openReviewBtn.addEventListener('click', openReviewModal);
reviewModalClose.addEventListener('click', closeReviewModal);
reviewModal.addEventListener('click', e => { if (e.target === reviewModal) closeReviewModal(); });

/* ─── REVIEW SUBMIT ─── */
let userReviews = JSON.parse(localStorage.getItem('apexReviews') || '[]');

function renderUserReviews() {
  if (!userReviews.length) {
    userReviewsGrid.style.display = 'none';
    return;
  }
  userReviewsGrid.style.display = 'grid';
  userReviewsGrid.innerHTML = userReviews.map(r => {
    const stars = Array.from({length: 5}, (_, i) =>
      `<i class="fa-${i < r.stars ? 'solid' : 'regular'} fa-star"></i>`
    ).join('');
    const initials = r.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
    return `
      <div class="user-review-card">
        <div class="stars">${stars}</div>
        <p class="review-text">"${r.message}"</p>
        <div class="reviewer">
          <div class="reviewer-avatar" style="background:linear-gradient(135deg,#3b82f6,#1e40af)">${initials}</div>
          <div>
            <div class="reviewer-name">${r.name}</div>
            <div class="reviewer-loc">${r.city || 'Pakistan'}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

renderUserReviews();

document.getElementById('reviewForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name    = document.getElementById('reviewName').value.trim();
  const city    = document.getElementById('reviewCity').value.trim();
  const stars   = parseInt(document.getElementById('reviewStars').value) || 5;
  const message = document.getElementById('reviewMessage').value.trim();

  if (!name || !message) { alert('Naam aur review zaroor likhein.'); return; }

  const review = { name, city, stars, message, date: new Date().toLocaleDateString('ur-PK') };
  userReviews.unshift(review);
  localStorage.setItem('apexReviews', JSON.stringify(userReviews));
  renderUserReviews();

  this.reset();
  selectedStars = 5;
  starBtns.forEach((s, i) => { s.classList.toggle('active', i < 5); s.classList.remove('selected'); });
  document.getElementById('reviewStars').value = 5;

  closeReviewModal();

  // Scroll to user reviews
  setTimeout(() => {
    userReviewsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 300);
});
/* ─── SCROLL TOP BUTTON ─── */
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});


/* ═══════════════════════════════════════════════
   APEX DRIVE — BMW CINEMATIC INTRO  (append to script.js)
   ═══════════════════════════════════════════════ */
(function () {
  var intro = document.getElementById('intro');
  if (!intro) return;

  /* Lock scroll while intro plays */
  document.body.style.overflow = 'hidden';

  /* Auto-dismiss after 4.8s (CSS fade starts at 4.2s) */
  var timer = setTimeout(dismiss, 4900);

  /* Click / tap anywhere = skip */
  intro.addEventListener('click', function () {
    clearTimeout(timer);
    dismiss(true);
  });

  function dismiss(fast) {
    document.body.style.overflow = '';
    if (fast) {
      intro.style.transition = 'opacity 0.35s ease';
      intro.style.opacity = '0';
      setTimeout(function () { intro.style.display = 'none'; }, 370);
    } else {
      setTimeout(function () { intro.style.display = 'none'; }, 700);
    }
  }
})();