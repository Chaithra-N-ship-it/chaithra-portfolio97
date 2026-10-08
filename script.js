/**
 * ===================================================================
 * CHAITHRA N - PORTFOLIO INTERACTIVITY & SCRIPTS
 * Theme: Modern Dark & Light AI/Data Science Portfolio
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initTypewriter();
  initSkillsFilter();
  initModals();
  initVideoPlayer();
  initTechCanvas();
  initScrollSpy();
  initStatsCounter();
  initYear();
});

/* -------------------------------------------------------------
 * 1. THEME SWITCHER (DARK & LIGHT THEME)
 * ------------------------------------------------------------- */
function initTheme() {
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Default is dark theme unless saved as light
  if (savedTheme === 'light' || (!savedTheme && !prefersDark && savedTheme !== 'dark')) {
    setTheme(savedTheme === 'light' ? 'light' : 'dark');
  } else {
    setTheme('dark');
  }
}

function setTheme(theme) {
  const isLight = theme === 'light';
  if (isLight) {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
  }

  // Update theme icons and labels
  const themeIcons = document.querySelectorAll('#theme-toggle-icon, .mobile-theme-btn i');
  const themeLabel = document.getElementById('theme-toggle-label');
  const mobileThemeLabel = document.querySelector('.theme-btn-text');

  themeIcons.forEach(icon => {
    if (isLight) {
      icon.className = 'fa-solid fa-sun';
      icon.style.color = '#f59e0b';
    } else {
      icon.className = 'fa-solid fa-moon';
      icon.style.color = '';
    }
  });

  if (themeLabel) {
    themeLabel.textContent = isLight ? 'Light' : 'Dark';
  }
  if (mobileThemeLabel) {
    mobileThemeLabel.textContent = isLight ? 'Light Theme' : 'Dark Theme';
  }

  localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
}

window.toggleTheme = function() {
  const currentIsLight = document.body.classList.contains('light-theme');
  setTheme(currentIsLight ? 'dark' : 'light');
};

/* -------------------------------------------------------------
 * 2. NAVBAR & MOBILE MENU TOGGLE
 * ------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close when clicking outside menu
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && 
          !navMenu.contains(e.target) && 
          !hamburgerBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  function openMobileMenu() {
    navMenu.classList.add('open');
    hamburgerBtn.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    navMenu.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* -------------------------------------------------------------
 * 3. SCROLL SPY (ACTIVE NAV LINK HIGHLIGHT)
 * ------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* -------------------------------------------------------------
 * 4. TYPEWRITER EFFECT FOR HERO SECTION
 * ------------------------------------------------------------- */
function initTypewriter() {
  const typedRoleElement = document.getElementById('typed-role');
  if (!typedRoleElement) return;

  const roles = [
    "Machine Learning & AI Solutions",
    "CropShield AI Crop Protection",
    "Data Science Pipelines with Python",
    "Relational Databases with MySQL",
    "Hackathon Prototypes & Innovation"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedRoleElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typedRoleElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 450;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* -------------------------------------------------------------
 * 5. SKILLS FILTER TABS
 * ------------------------------------------------------------- */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 6. MODALS (CERTIFICATES & PROJECTS)
 * ------------------------------------------------------------- */
function initModals() {
  const modalTriggers = document.querySelectorAll('.open-modal-btn');
  modalTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetModalId = btn.getAttribute('data-modal');
      openModal(targetModalId);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModals = document.querySelectorAll('.modal.active');
      activeModals.forEach(modal => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      });
      document.body.style.overflow = '';
    }
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

window.openModal = openModal;
window.closeModal = closeModal;

window.openCertModal = function(imageSrc, title, description) {
  const certModal = document.getElementById('cert-modal');
  const imgEl = document.getElementById('cert-modal-img');
  const titleEl = document.getElementById('cert-modal-title');
  const descEl = document.getElementById('cert-modal-desc');
  const linkEl = document.getElementById('cert-modal-link');

  if (certModal && imgEl && titleEl && descEl) {
    imgEl.src = imageSrc;
    imgEl.alt = title;
    titleEl.textContent = title;
    descEl.textContent = description;
    if (linkEl) linkEl.href = imageSrc;

    certModal.classList.add('active');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
};

window.closeCertModal = function() {
  const certModal = document.getElementById('cert-modal');
  if (certModal) {
    certModal.classList.remove('active');
    certModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
};

/* -------------------------------------------------------------
 * 7. VIDEO PLAYER & UN-CROPPED POSTER CONTROLS
 * ------------------------------------------------------------- */
function initVideoPlayer() {
  const video = document.getElementById('resume-video');
  const overlay = document.getElementById('video-poster-overlay');
  const icon = document.getElementById('play-btn-icon');
  const text = document.getElementById('play-btn-text');

  if (!video) return;

  // When video ends, show uncropped poster again
  video.addEventListener('ended', () => {
    if (overlay) overlay.classList.remove('hidden');
    if (icon) {
      icon.className = 'fa-solid fa-play';
    }
    if (text) text.textContent = 'Replay Video';
  });

  video.addEventListener('play', () => {
    if (overlay) overlay.classList.add('hidden');
    if (icon) {
      icon.className = 'fa-solid fa-pause';
    }
    if (text) text.textContent = 'Pause Video';
  });

  video.addEventListener('pause', () => {
    if (icon) {
      icon.className = 'fa-solid fa-play';
    }
    if (text) text.textContent = 'Play Video';
  });
}

window.startVideoPlayback = function() {
  const video = document.getElementById('resume-video');
  const overlay = document.getElementById('video-poster-overlay');
  if (!video) return;

  if (overlay) overlay.classList.add('hidden');
  video.play().catch(() => {
    // Autoplay policy fallback
  });
};

window.toggleVideoPlayback = function() {
  const video = document.getElementById('resume-video');
  const overlay = document.getElementById('video-poster-overlay');
  if (!video) return;

  if (video.paused || video.ended) {
    if (overlay) overlay.classList.add('hidden');
    video.play();
  } else {
    video.pause();
  }
};

/* -------------------------------------------------------------
 * 8. CONTACT FORM SUBMISSION & CLIPBOARD COPY
 * ------------------------------------------------------------- */
window.handleContactSubmit = function(event) {
  event.preventDefault();

  const name = document.getElementById('form-name').value.trim();
  const email = document.getElementById('form-email').value.trim();
  const subject = document.getElementById('form-subject').value.trim();
  const message = document.getElementById('form-message').value.trim();

  if (!name || !email || !message) {
    showToast('Please complete all required fields.', 'fa-circle-exclamation');
    return;
  }

  // Exact email updated: chaithra312008@gmail.com
  const recipient = "chaithra312008@gmail.com";
  const mailSubject = encodeURIComponent(subject || `Portfolio Inquiry from ${name}`);
  const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  const mailtoUrl = `mailto:${recipient}?subject=${mailSubject}&body=${mailBody}`;

  showToast('Opening your email client to send your message to Chaithra...', 'fa-paper-plane');

  setTimeout(() => {
    window.location.href = mailtoUrl;
  }, 700);

  const form = document.getElementById('contact-form');
  if (form) form.reset();
};

window.copyToClipboard = function(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied "${text}" to clipboard!`, 'fa-check-circle');

    if (btnElement) {
      const originalHtml = btnElement.innerHTML;
      btnElement.innerHTML = `<i class="fa-solid fa-check"></i> <span>Copied!</span>`;
      btnElement.style.color = '#10b981';

      setTimeout(() => {
        btnElement.innerHTML = originalHtml;
        btnElement.style.color = '';
      }, 2000);
    }
  }).catch(() => {
    showToast('Failed to copy. Please copy manually.', 'fa-circle-xmark');
  });
};

function showToast(message, iconClass = 'fa-check-circle') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const toastIcon = toast?.querySelector('.toast-icon i');

  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  if (toastIcon) {
    toastIcon.className = `fa-solid ${iconClass}`;
  }

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* -------------------------------------------------------------
 * 9. AI CHAT WIDGET & PORTFOLIO KNOWLEDGE ENGINE
 * ------------------------------------------------------------- */
window.toggleAIChat = function() {
  const chatWindow = document.getElementById('ai-chat-window');
  const openIcon = document.getElementById('trigger-open-icon');
  const closeIcon = document.getElementById('trigger-close-icon');

  if (!chatWindow) return;

  const isOpen = chatWindow.classList.contains('open');

  if (isOpen) {
    chatWindow.classList.remove('open');
    chatWindow.setAttribute('aria-hidden', 'true');
    if (openIcon) openIcon.style.display = 'inline-block';
    if (closeIcon) closeIcon.style.display = 'none';
  } else {
    chatWindow.classList.add('open');
    chatWindow.setAttribute('aria-hidden', 'false');
    if (openIcon) openIcon.style.display = 'none';
    if (closeIcon) closeIcon.style.display = 'inline-block';

    const input = document.getElementById('chat-input-text');
    if (input) setTimeout(() => input.focus(), 200);
  }
};

window.askPresetQuestion = function(questionText) {
  const input = document.getElementById('chat-input-text');
  if (input) {
    input.value = questionText;
    const form = document.getElementById('chat-input-form');
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  }
};

window.handleAIChatSubmit = function(event) {
  event.preventDefault();
  const input = document.getElementById('chat-input-text');
  if (!input) return;

  const userQuery = input.value.trim();
  if (!userQuery) return;

  // Append user message
  appendChatMessage(userQuery, 'user');
  input.value = '';

  // Show typing indicator
  showTypingIndicator();

  // Generate answer strictly from portfolio facts
  setTimeout(() => {
    removeTypingIndicator();
    const answer = generatePortfolioAnswer(userQuery);
    appendChatMessage(answer, 'bot');
  }, 650);
};

function appendChatMessage(text, sender) {
  const messagesContainer = document.getElementById('chat-messages');
  if (!messagesContainer) return;

  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender}-message`;

  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (sender === 'bot') {
    messageDiv.innerHTML = `
      <div class="message-avatar"><i class="fa-solid fa-robot"></i></div>
      <div class="message-content">
        <p>${text}</p>
        <span class="message-time">${timeStr}</span>
      </div>
    `;
  } else {
    messageDiv.innerHTML = `
      <div class="message-avatar"><i class="fa-solid fa-user"></i></div>
      <div class="message-content">
        <p>${escapeHtml(text)}</p>
        <span class="message-time">${timeStr}</span>
      </div>
    `;
  }

  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
  const messagesContainer = document.getElementById('chat-messages');
  if (!messagesContainer) return;

  const indicator = document.createElement('div');
  indicator.id = 'chat-typing-indicator';
  indicator.className = 'chat-message bot-message';
  indicator.innerHTML = `
    <div class="message-avatar"><i class="fa-solid fa-robot"></i></div>
    <div class="typing-indicator">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>
  `;
  messagesContainer.appendChild(indicator);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById('chat-typing-indicator');
  if (indicator) indicator.remove();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Natural Language Knowledge Engine
 * Restricts responses strictly to Chaithra N's actual portfolio data
 */
function generatePortfolioAnswer(query) {
  const q = query.toLowerCase();

  // 1. Identity / About / Overview
  if (q.includes('who are you') || q.includes('who is chaithra') || q.includes('about') || q.includes('intro') || q.includes('overview') || q.includes('profile')) {
    return "Chaithra N is a <strong>2nd-year Computer Science (Data Science)</strong> undergraduate at <strong>Adhichunchanagiri Institute of Technology</strong> (2025 - 29 batch). She specializes in Python, Machine Learning, and SQL, and is the creator of the <strong>CropShield AI</strong> agricultural protection system.";
  }

  // 2. Year / Status
  if (q.includes('which year') || q.includes('what year') || q.includes('final year') || q.includes('second year') || q.includes('2nd year')) {
    return "Chaithra is currently a <strong>2nd-year undergraduate student</strong> (2025 - 29 duration) pursuing B.E. in Computer Science & Engineering (Data Science).";
  }

  // 3. Technical Skills / Tech Stack
  if (q.includes('skill') || q.includes('stack') || q.includes('technolog') || q.includes('programming') || q.includes('python') || q.includes('machine learning') || q.includes('sql') || q.includes('java')) {
    return "Chaithra's core toolkit includes:<br>• <strong>Languages:</strong> Python (primary), Java (Infosys Certified), C, C++, SQL<br>• <strong>Data Science & AI:</strong> Machine Learning modeling, predictive diagnostics, data analysis<br>• <strong>Databases:</strong> MySQL, relational schema design<br>• <strong>Core Systems:</strong> Unix/Linux (Infosys Certified), Data Structures & Algorithms (DSA), Operating Systems";
  }

  // 4. CropShield AI Project
  if (q.includes('cropshield') || q.includes('crop') || q.includes('agriculture') || q.includes('plant') || q.includes('disease')) {
    return "<strong>CropShield AI</strong> is Chaithra's flagship 6-month AI project. It uses Python and Machine Learning to detect crop pathogens and foliar diseases early, providing farmers with actionable organic and chemical treatment recommendations to prevent harvest losses.";
  }

  // 5. Rural Market Project
  if (q.includes('rural') || q.includes('market') || q.includes('artisan') || q.includes('commerce') || q.includes('other project')) {
    return "Chaithra developed the <strong>Assist Rural Product Marketing</strong> platform (6 months). Built using Java, Python, and MySQL, it connects rural artisans and local producers directly with consumers to boost product visibility and eliminate middleman markups.";
  }

  // 6. Projects General
  if (q.includes('project') || q.includes('portfolio work') || q.includes('built')) {
    return "Chaithra has built two major systems:<br>1. <strong>CropShield AI:</strong> AI-driven agricultural pathogen detection and remediation platform (Python, ML).<br>2. <strong>Assist Rural Product Marketing:</strong> Direct marketplace connecting rural producers to customers (Java, Python, MySQL).";
  }

  // 7. Education / College / CGPA / Scores
  if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('cgpa') || q.includes('school') || q.includes('study') || q.includes('marks') || q.includes('percentage')) {
    return "Chaithra's academic pathway:<br>• <strong>B.E. in CSE (Data Science):</strong> Adhichunchanagiri Institute of Technology, Chikkamagaluru (2025 – 29, <strong>7.17 CGPA</strong>)<br>• <strong>PUC:</strong> St Joseph’s PU College Excellence, Bhadravathi (80.4%)<br>• <strong>SSLC (10th):</strong> St Charles Kannada High School, Bhadravathi (85.77%)";
  }

  // 8. Hackathons & Competitions
  if (q.includes('hackathon') || q.includes('adhi tantra') || q.includes('competition') || q.includes('hardware')) {
    return "Chaithra participated in the state-level <strong>ADHI TANTRA 2k26 Hardware Hackathon</strong> (May 07, 2026), organized by Adichunchanagiri University & BGS Institute of Technology in association with IEEE, CSI, AICTE, and IDEA Lab, pitching technical prototypes under competitive time constraints.";
  }

  // 9. Certifications
  if (q.includes('certificat') || q.includes('infosys') || q.includes('course') || q.includes('credential')) {
    return "Chaithra holds verified credentials in:<br>1. <strong>ADHI TANTRA 2k26 Hardware Hackathon</strong> (Adichunchanagiri Univ, IEEE, CSI)<br>2. <strong>Java Programming Fundamentals</strong> (Infosys Springboard - Oct 7, 2026)<br>3. <strong>Introduction to Unix</strong> (Infosys Springboard - Oct 6, 2026)";
  }

  // 10. Achievements
  if (q.includes('achievement') || q.includes('award') || q.includes('honor') || q.includes('milestone')) {
    return "Her notable achievements include:<br>• Participation in ADHI TANTRA 2k26 Hackathon<br>• 6-month research & prototyping of CropShield AI<br>• Dual certifications from Infosys Springboard<br>• Consistent academic record (85.77% 10th, 80.4% PUC, 7.17 B.E. CGPA)";
  }

  // 11. Resume & Video
  if (q.includes('resume') || q.includes('cv') || q.includes('download') || q.includes('video') || q.includes('pitch')) {
    return "You can download Chaithra's official resume (<a href='chaithra_resume.pdf' target='_blank' style='color:#38bdf8; text-decoration:underline;'>Chaithra_N_Resume.pdf</a>) or watch her uncropped Video Introduction pitch directly in the Resume section of this portfolio!";
  }

  // 12. Contact / Email / Phone / Social
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('call') || q.includes('hire') || q.includes('reach') || q.includes('location') || q.includes('github') || q.includes('linkedin')) {
    return "You can connect with Chaithra directly:<br>• <strong>Email:</strong> <a href='mailto:chaithra312008@gmail.com' style='color:#38bdf8;'>chaithra312008@gmail.com</a><br>• <strong>Phone:</strong> <a href='tel:+917892291145' style='color:#38bdf8;'>+91 7892291145</a><br>• <strong>GitHub:</strong> <a href='https://github.com/Chaithra-N-ship-it' target='_blank' style='color:#38bdf8;'>Chaithra-N-ship-it</a><br>• <strong>LinkedIn:</strong> <a href='https://www.linkedin.com/in/chaithra-n-a9a063398?utm_source=share_via&utm_content=profile&utm_medium=member_android' target='_blank' style='color:#38bdf8;'>chaithra-n</a><br>• <strong>Location:</strong> Karnataka, India";
  }

  // Fallback (strict guardrail)
  return "I am specialized strictly in answering questions about Chaithra N's portfolio, Data Science studies, projects (like CropShield AI), hackathons, and contact details. For other inquiries, please reach out to her directly at <a href='mailto:chaithra312008@gmail.com' style='color:#38bdf8;'>chaithra312008@gmail.com</a>!";
}

/* -------------------------------------------------------------
 * 10. ANIMATED STATS COUNTER
 * ------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        statNumbers.forEach(el => {
          const target = parseFloat(el.getAttribute('data-count'));
          if (isNaN(target)) return;

          const isDecimal = target % 1 !== 0;
          let current = 0;
          const duration = 1200;
          const stepTime = 30;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            if (isDecimal) {
              el.textContent = current.toFixed(2);
            } else {
              el.textContent = Math.floor(current) + "+";
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.about-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* -------------------------------------------------------------
 * 11. CANVAS NEURAL TECH PARTICLES
 * ------------------------------------------------------------- */
function initTechCanvas() {
  const canvas = document.getElementById('tech-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }, { passive: true });

  const particleCount = Math.min(Math.floor((width * height) / 22000), 45);
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.8 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      const isLight = document.body.classList.contains('light-theme');
      ctx.fillStyle = isLight ? 'rgba(2, 132, 199, 0.4)' : 'rgba(56, 189, 248, 0.45)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const isLight = document.body.classList.contains('light-theme');

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const alpha = (1 - dist / 130) * 0.18;
          ctx.strokeStyle = isLight 
            ? `rgba(2, 132, 199, ${alpha})` 
            : `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* -------------------------------------------------------------
 * 12. CURRENT YEAR HELPER
 * ------------------------------------------------------------- */
function initYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
