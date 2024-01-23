export function convertFormDataToJson(form: HTMLFormElement): typeof courseTemplate;
export const courseTemplate: {
  id: string;
  title: string;
  duration: string;
  img: string;
  alt: string;
  date: string;
  remote: string;
  rating: string;
  details: string;
  price: string;
};
export function createForm(form: HTMLFormElement, data: typeof courseTemplate, submitHandler: (e: Event) => void): void;