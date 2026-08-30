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

const pageName = window.location.pathname.split('/').pop() || 'index.html';
const inArabicFolder = window.location.pathname.includes('/ar/');
const contactPath = isArabic ? (inArabicFolder ? 'contact.html' : 'ar/contact.html') : 'contact.html';
const serviceParam = serviceVisuals[serviceKey] ? `?service=${encodeURIComponent(serviceKey)}` : '';

document.querySelectorAll('.site-header a[href="#contact"]').forEach((link) => {
  link.href = `${contactPath}${serviceParam}`;
});

const enquiryForm = document.querySelector('[data-enquiry-form]');
if (enquiryForm) {
  const language = enquiryForm.dataset.language === 'ar' ? 'ar' : 'en';
  const startedAt = Date.now();
  const statusBox = enquiryForm.querySelector('[data-form-status]');
  const submitButton = enquiryForm.querySelector('[data-submit-button]');
  const whatsappButton = enquiryForm.querySelector('[data-whatsapp-button]');
  const serviceSelect = enquiryForm.querySelector('[data-service-select]');
  const serviceLabel = enquiryForm.querySelector('[data-service-label]');
  const messageField = enquiryForm.querySelector('textarea[name="message"]');
  const characterCount = enquiryForm.querySelector('[data-character-count]');
  const humanCheck = enquiryForm.querySelector('[data-human-check]');
  const startedAtField = enquiryForm.querySelector('[data-started-at]');
  const numberFormatter = new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', { useGrouping: false });
  const copy = language === 'ar' ? {
    required: 'يرجى إكمال الحقول المطلوبة والموافقة على التواصل.',
    verification: 'يرجى إدخال الإجابة الصحيحة لسؤال التحقق.',
    tooFast: 'يرجى مراجعة المعلومات للحظات ثم إعادة الإرسال.',
    rateLimit: 'تم إرسال طلب مؤخراً من هذا الجهاز. يرجى الانتظار دقيقة واحدة أو المتابعة عبر واتساب.',
    links: 'للحماية من الرسائل المزعجة، يرجى إزالة الروابط المتعددة من وصف التحدي.',
    sending: 'جارٍ إرسال الطلب…',
    submit: 'إرسال الطلب',
    success: 'شكراً لك. تم استلام طلبك وسيتواصل معك فريق ديجي لينك خلال يوم عمل واحد. يمكنك أيضاً متابعة نفس الطلب عبر واتساب.',
    failure: 'تعذر إرسال النموذج الآن. لم تفقد بياناتك؛ يرجى المتابعة عبر واتساب أو مراسلتنا على info@digilink.sa.',
    whatsappIntro: 'مرحباً ديجي لينك، أرغب في مناقشة احتياج مصنعنا.',
    labels: { name: 'الاسم', company: 'المصنع', service: 'الخدمة', stage: 'المرحلة', city: 'المدينة', message: 'الأولوية' }
  } : {
    required: 'Please complete the required fields and confirm your consent.',
    verification: 'Please enter the correct answer to the verification question.',
    tooFast: 'Please take a moment to review the information, then submit again.',
    rateLimit: 'An enquiry was recently sent from this device. Please wait one minute or continue on WhatsApp.',
    links: 'For spam protection, please remove multiple links from the challenge description.',
    sending: 'Sending enquiry…',
    submit: 'Send Enquiry',
    success: 'Thank you. Your enquiry has been received and DigiLink will respond within one business day. You can also continue the same enquiry on WhatsApp.',
    failure: 'The form could not be sent right now. Your information is still here—please continue on WhatsApp or email info@digilink.sa.',
    whatsappIntro: 'Hello DigiLink, I would like to discuss our factory requirement.',
    labels: { name: 'Name', company: 'Factory', service: 'Service', stage: 'Stage', city: 'City', message: 'Priority' }
  };

  startedAtField.value = new Date(startedAt).toISOString();

  const setStatus = (message, type) => {
    statusBox.textContent = message;
    statusBox.className = `form-status visible ${type}`;
  };

  const normalizeDigits = (value) => value.replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)));

  const updateCount = () => {
    characterCount.textContent = numberFormatter.format(messageField.value.length);
  };

  const selectedRadioValue = (name) => enquiryForm.querySelector(`input[name="${name}"]:checked`)?.value || '';

  const updateWhatsApp = () => {
    const data = new FormData(enquiryForm);
    const selectedService = serviceSelect.value ? (serviceSelect.options[serviceSelect.selectedIndex]?.text || '') : '';
    const lines = [copy.whatsappIntro];
    const values = [
      [copy.labels.name, data.get('name')],
      [copy.labels.company, data.get('company')],
      [copy.labels.service, selectedService],
      [copy.labels.stage, selectedRadioValue('factory_stage')],
      [copy.labels.city, data.get('city')],
      [copy.labels.message, data.get('message')]
    ];
    values.forEach(([label, value]) => {
      if (String(value || '').trim()) lines.push(`${label}: ${String(value).trim()}`);
    });
    whatsappButton.href = `https://wa.me/966500334664?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const requestedService = new URLSearchParams(window.location.search).get('service');
  if (requestedService && [...serviceSelect.options].some((option) => option.value === requestedService)) {
    serviceSelect.value = requestedService;
  }

  enquiryForm.querySelectorAll('input, select, textarea').forEach((field) => {
    field.addEventListener('input', () => {
      field.removeAttribute('aria-invalid');
      updateWhatsApp();
      if (field === messageField) updateCount();
    });
    field.addEventListener('change', updateWhatsApp);
  });

  enquiryForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    statusBox.className = 'form-status';
    enquiryForm.querySelectorAll('[aria-invalid="true"]').forEach((field) => field.removeAttribute('aria-invalid'));

    if (!enquiryForm.checkValidity()) {
      enquiryForm.querySelectorAll(':invalid').forEach((field) => field.setAttribute('aria-invalid', 'true'));
      setStatus(copy.required, 'error');
      enquiryForm.querySelector(':invalid')?.focus();
      return;
    }

    if (normalizeDigits(humanCheck.value.trim()) !== '7') {
      humanCheck.setAttribute('aria-invalid', 'true');
      setStatus(copy.verification, 'error');
      humanCheck.focus();
      return;
    }

    if (enquiryForm.elements._honey.value) {
      setStatus(copy.success, 'success');
      return;
    }

    if (Date.now() - startedAt < 3000) {
      setStatus(copy.tooFast, 'error');
      return;
    }

    const linksInMessage = (messageField.value.match(/https?:\/\/|www\./gi) || []).length;
    if (linksInMessage > 1) {
      messageField.setAttribute('aria-invalid', 'true');
      setStatus(copy.links, 'error');
      messageField.focus();
      return;
    }

    try {
      const lastSubmission = Number(localStorage.getItem('digilink-last-enquiry') || 0);
      if (Date.now() - lastSubmission < 60000) {
        setStatus(copy.rateLimit, 'error');
        return;
      }
    } catch (_) {
      // Continue when private browsing blocks local storage.
    }

    serviceLabel.value = serviceSelect.options[serviceSelect.selectedIndex]?.text || '';
    updateWhatsApp();
    submitButton.disabled = true;
    submitButton.textContent = copy.sending;

    try {
      const response = await fetch(enquiryForm.action, {
        method: 'POST',
        body: new FormData(enquiryForm),
        headers: { Accept: 'application/json' }
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false) throw new Error('Submission failed');
      try { localStorage.setItem('digilink-last-enquiry', String(Date.now())); } catch (_) {}
      setStatus(copy.success, 'success');
    } catch (_) {
      setStatus(copy.failure, 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = copy.submit;
    }
  });

  updateCount();
  updateWhatsApp();
}
