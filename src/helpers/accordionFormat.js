import { listStyle } from "../constants/Accordion.constant";

export const accordionFormat = (accordionContent) => {
  let content = Array.isArray(accordionContent) ? accordionContent.map((text, key) => {
    return {
      title: text.title,
      iconArrow: "expand_more",
      content: `${text.description? text.description : '' }<ul ${listStyle.ul}> ${text.list.map(
        (point) => {
          return `<li ${listStyle.li}>${point}</li> `;
        }
      )} </ul>`,
      id: key + 1,
    };
  }): [];
  const items = {items: content}
 
  return items;
};

export const accordionFormatFaqsFlow = (accordionContent) => {
  let content = Array.isArray(accordionContent) ?  accordionContent.map((text, key) => {
    return {
      title: text.question,
      iconArrow: "expand_more",
      content: text.answer,
      id: key + 1
    }
  }): [];

  const items = { items: content}

  return items;
}
