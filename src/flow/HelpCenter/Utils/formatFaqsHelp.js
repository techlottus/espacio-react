export const formatFaqsHelp = (faqs) => {
  const types = [];
  faqs.forEach((faq) => {
    if (!types.includes(faq.type)) {
      types.push(faq.type);
    }
  });

  let faqTypes = {};

  types.forEach((type) => {
    faqTypes[type] = faqs.filter((faq) => faq.type === type);
  });

  return faqTypes
};
