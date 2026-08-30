const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

document.querySelectorAll('[data-year]').forEach((item) => {
  item.textContent = new Date().getFullYear();
});

const serviceKey = window.location.pathname.split('/').pop().replace('.html', '');
const isArabic = document.documentElement.dir === 'rtl';
const serviceVisuals = {
  'future-factories': {
    icons: ['fa-industry', 'fa-bullseye', 'fa-route', 'fa-chart-line', 'fa-gears', 'fa-people-group'],
    en: ['Future Factories transformation map', 'A connected view from readiness to realization', ['Current baseline', 'Target maturity', 'Prioritized roadmap', 'Execution governance']],
    ar: ['خارطة تحول مصانع المستقبل', 'رؤية مترابطة من الجاهزية إلى تحقيق الأثر', ['خط الأساس الحالي', 'النضج المستهدف', 'خارطة ذات أولويات', 'حوكمة التنفيذ']]
  },
  'siri-assessment': {
    icons: ['fa-diagram-project', 'fa-microchip', 'fa-users-gear', 'fa-compass-drafting', 'fa-magnifying-glass-chart', 'fa-route'],
    en: ['SIRI assessment lens', 'One evidence-based view of smart-industry maturity', ['Process', 'Technology', 'Organization', 'Prioritization']],
    ar: ['عدسة تقييم SIRI', 'رؤية واحدة قائمة على الأدلة لنضج الصناعة الذكية', ['العمليات', 'التقنية', 'التنظيم', 'تحديد الأولويات']]
  },
  'aimri-assessment': {
    icons: ['fa-bullseye', 'fa-database', 'fa-shield-halved', 'fa-user-gear', 'fa-lightbulb', 'fa-road'],
    en: ['AI readiness operating system', 'The foundations required before responsible AI adoption', ['Strategy', 'Data', 'Governance', 'People & skills']],
    ar: ['نظام جاهزية الذكاء الاصطناعي', 'الأسس المطلوبة قبل التبني المسؤول للذكاء الاصطناعي', ['الاستراتيجية', 'البيانات', 'الحوكمة', 'الأفراد والمهارات']]
  },
  'transformation-pmo': {
    icons: ['fa-route', 'fa-list-check', 'fa-handshake', 'fa-chart-line', 'fa-scale-balanced', 'fa-people-arrows'],
    en: ['Transformation control tower', 'Keep decisions, delivery and value aligned', ['Scope & requirements', 'Vendor alignment', 'Delivery control', 'Benefits tracking']],
    ar: ['مركز تحكم التحول', 'إبقاء القرارات والتنفيذ والقيمة في مسار واحد', ['النطاق والمتطلبات', 'مواءمة الموردين', 'ضبط التنفيذ', 'متابعة المنافع']]
  },
  'feasibility-studies': {
    icons: ['fa-chart-area', 'fa-industry', 'fa-coins', 'fa-triangle-exclamation', 'fa-calculator', 'fa-calendar-check'],
    en: ['Industrial investment model', 'A balanced decision across opportunity, capability and return', ['Demand case', 'Technical concept', 'Financial return', 'Risk & sensitivity']],
    ar: ['نموذج الاستثمار الصناعي', 'قرار متوازن بين الفرصة والقدرة والعائد', ['حالة الطلب', 'المفهوم الفني', 'العائد المالي', 'المخاطر والحساسية']]
  },
  'reliability-asset-management': {
    icons: ['fa-screwdriver-wrench', 'fa-clock-rotate-left', 'fa-warehouse', 'fa-gauge-high', 'fa-magnifying-glass', 'fa-chart-column'],
    en: ['Asset performance cockpit', 'Connect maintenance discipline with operational outcomes', ['Asset criticality', 'Work management', 'Failure elimination', 'Performance KPIs']],
    ar: ['لوحة قيادة أداء الأصول', 'ربط انضباط الصيانة بالنتائج التشغيلية', ['أهمية الأصول', 'إدارة العمل', 'إزالة أسباب الأعطال', 'مؤشرات الأداء']]
  }
};

const visual = serviceVisuals[serviceKey];
if (visual) {
  const content = isArabic ? visual.ar : visual.en;
  const artifactSection = document.createElement('section');
  artifactSection.className = 'section section-muted service-artifact-section';
  artifactSection.innerHTML = `
    <div class="container">
      <div class="visual-artifact reveal visible">
        <div class="artifact-head">
          <div><strong>${content[0]}</strong><p>${content[1]}</p></div>
          <span class="artifact-status">${isArabic ? 'إطار عمل ديجي لينك' : 'DIGILINK FRAMEWORK'}</span>
        </div>
        <div class="artifact-grid">
          ${content[2].map((label, index) => `<div class="artifact-item"><div class="artifact-icon"><i class="fa-solid ${visual.icons[index]}"></i></div><span>${String(index + 1).padStart(2, '0')}</span><strong>${label}</strong></div>`).join('')}
        </div>
      </div>
    </div>`;
  const firstContentSection = document.querySelector('.service-hero + .section');
  firstContentSection?.insertAdjacentElement('afterend', artifactSection);

  document.querySelectorAll('.detail-card').forEach((card, index) => {
    const label = card.querySelector('span');
    label?.insertAdjacentHTML('afterbegin', `<i class="fa-solid ${visual.icons[index % visual.icons.length]}"></i> `);
  });
  document.querySelectorAll('.deliverable-card span').forEach((badge, index) => {
    badge.innerHTML = `<i class="fa-solid ${visual.icons[index % visual.icons.length]}"></i>`;
    badge.setAttribute('aria-hidden', 'true');
  });
}
