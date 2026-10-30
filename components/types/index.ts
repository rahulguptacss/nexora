import data from '../data/data.json';

export interface LinkType {
  name: string;
  href: string;
  sublinks?: LinkType[];
}

export interface TopbarData {
  contact_info: { icon: string; value: string }[];
  socials: { icon: string; href: string }[];
}

export interface HeaderData {
  logo_image: string;
  logo_text: string;
  logo_subtext?: string;
  links: LinkType[];
  button_text: string;
  button_link: string;
}

export interface FooterData {
  logo_image: string;
  logo_text: string;
  logo_subtext?: string;
  description: string;
  socials: { icon: string; href: string }[];
  quick_links: LinkType[];
  our_services?: LinkType[];
  contact: { address: string; phone: string; email: string; hours?: string };
  copyright: string;
}

export interface HeroSectionData {
  slides: {
    subtitle: string;
    title_line1: string;
    title_highlight: string;
    title_line2?: string;
    description: string;
    primary_button: { text: string; href: string };
    image: string;
  }[];
}

export interface AboutSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  image: string;
  features: { icon: string; title: string; description: string }[];
  button: { text: string; href: string };
}

export interface ServicesSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  items: { icon: string; color: string; title: string; description: string }[];
}

export interface WhyChooseSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  title_line2?: string;
  image: string;
  items: { icon: string; title: string; description: string }[];
}

export interface ProjectsSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  items: { title: string; category: string; image: string; href: string }[];
}

export interface TestimonialsSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  reviews: { text: string; author: string; role: string; avatar: string; image: string }[];
}

export interface FaqData {
  crumb: string;
  badge: string;
  title: string;
  title_highlight: string;
  description: string;
  points: string[];
  items: { question: string; answer: string; image?: string }[];
}

export interface ContactData {
  eyebrow: string;
  title: string;
  description: string;
  form_eyebrow: string;
  form_title: string;
  form_text: string;
  placeholders: { name: string; email: string; phone: string; service: string; message: string };
  services: string[];
  submit: string;
  privacy: string;
  office_image: string;
  office_title: string;
  office_text: string;
  address_label: string;
  address: string;
  hours_label: string;
  hours: string;
  phone: string;
  phone_href: string;
}

export interface PageComponentItem {
  key: string;
  component: string;
}

export interface HomePageData {
  title: string;
  pageName: string;
  metadata: {
    title: string;
    description: string;
  };
  components: PageComponentItem[];
}

export const common = data.common;
export const template = data.categories.Software.templateComponents['template-1'];
export const pages = template.pages;
export const sections = {
  ...template.sections,
  whychoose: template.sections.why_choose,
};
