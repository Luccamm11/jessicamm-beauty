/* ==========================================================================
   INTERACTIVITY LOGIC - JÉSSICA MIRANDA BEAUTY
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initScrollReveal();
  initFaqAccordion();
  initActiveNavTracking();
});

/**
 * Adiciona uma classe ao cabeçalho quando o usuário rola a página,
 * permitindo um efeito de fundo desfocado e redução de tamanho.
 */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const toggleHeaderState = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Verifica o estado inicial ao carregar
  toggleHeaderState();
  
  // Ouve o evento de scroll
  window.addEventListener('scroll', toggleHeaderState);
}

/**
 * Inicializa o menu sanduíche mobile com transição suave.
 */
function initMobileMenu() {
  const burger = document.querySelector('.burger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!burger || !navMenu) return;

  const toggleMenu = () => {
    navMenu.classList.toggle('active');
    burger.classList.toggle('toggle');
  };

  burger.addEventListener('click', toggleMenu);

  // Fecha o menu ao clicar em qualquer link de navegação
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
}

/**
 * Implementa animações de scroll-reveal otimizadas por hardware
 * usando a API IntersectionObserver.
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null, // viewport do navegador
    threshold: 0.15, // elemento precisa estar 15% visível para disparar
    rootMargin: '0px 0px -50px 0px' // dispara ligeiramente antes de entrar totalmente na tela
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        // Uma vez revelado, não precisamos observar mais
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Gerencia o acordeão do FAQ (Perguntas Frequentes) com animações
 * de altura máxima dinâmicas.
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length === 0) return;

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const wrapper = item.querySelector('.faq-answer-wrapper');
    const answer = item.querySelector('.faq-answer');

    if (!btn || !wrapper || !answer) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fecha todos os outros itens do FAQ
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer-wrapper').style.maxHeight = '0px';
        }
      });

      // Alterna o estado do item atual
      if (isActive) {
        item.classList.remove('active');
        wrapper.style.maxHeight = '0px';
      } else {
        item.classList.add('active');
        // Calcula a altura real do conteúdo interno para transição suave
        const answerHeight = answer.scrollHeight;
        wrapper.style.maxHeight = `${answerHeight}px`;
      }
    });
  });
}

/**
 * Atualiza dinamicamente o link de navegação ativo com base na
 * seção atual que está visível na tela durante a rolagem.
 */
function initActiveNavTracking() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (sections.length === 0 || navLinks.length === 0) return;

  const trackActiveSection = () => {
    let currentActiveId = '';
    const scrollPosition = window.scrollY + 200; // Offset para detectar antes do topo físico

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentActiveId = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentActiveId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', trackActiveSection);
  trackActiveSection(); // Executa uma vez no início
}
