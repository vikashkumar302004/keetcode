// Google Analytics (GA4) Event & Pageview Tracker Utility

export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-QXX0K4814Q';
  if (window.gtag) return;

  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', { send_page_view: true });
  `;
  document.head.appendChild(script2);
};

export const trackPageView = (path, title) => {
  if (window.gtag) {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-QXX0K4814Q';
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
      send_to: measurementId
    });
  }
};

export const trackEvent = (action, category, label, value) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};
