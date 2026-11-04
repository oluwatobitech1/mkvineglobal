import { site, company } from "@/config/site";

// DRAFT legal text. Have it reviewed and confirmed by the company (and legal counsel) before launch.
// Set to true only after the company has confirmed the text and had it legally reviewed.
// While false, the legal pages are hidden from search engines and left out of the sitemap.
export const LEGAL_REVIEWED = false;

export type LegalDoc = { slug: string; title: string; sections: { h: string; p: string }[] };

const who = `${company.legalName}, trading as ${company.tradingName}, a company registered in ${company.jurisdiction} (company number ${company.number})`;
const email = site.contact.email;

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    sections: [
      { h: "Who we are", p: `This website is operated by ${who}. For anything in this policy, contact us at ${email}.` },
      { h: "What we collect", p: "When you send a project enquiry or a message, we collect what you give us: your name, company, email address, phone number (optional), preferred contact method, and the details of your project, budget and timeline. Our hosting provider may also keep standard technical logs, such as your IP address, for security and reliability." },
      { h: "How we use it", p: "We use your information to review your enquiry, reply to you, and prepare a quotation. Our legal bases are taking steps at your request before a contract, and our legitimate interest in running our business. We do not sell your information and we do not use it for automated decision making." },
      { h: "How enquiries reach us", p: "Our forms do not send anything by themselves. When you finish a form, your device opens your own email app with a message addressed to us, and nothing reaches us until you press Send. We then receive it as a normal email. We do not keep enquiries in a website database. Your email provider, and ours, handle the message as they handle any email, and may do so outside the UK with appropriate safeguards. The website itself is run by a hosting provider." },
      { h: "How long we keep it", p: "Enquiry emails that do not lead to a project are kept for 12 months and then deleted. If we work together, we keep project and payment records for as long as needed to deliver the work and to meet legal and accounting requirements, usually up to six years." },
      { h: "Your rights", p: `You can ask us to give you a copy of your information, correct it, delete it, restrict or object to how we use it, or move it to someone else. Contact ${email} and we will respond within one month. You can also complain to the Information Commissioner's Office at ico.org.uk.` },
      { h: "Changes", p: "We may update this policy from time to time. The latest version is always on this page." },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    sections: [
      { h: "Current use", p: "This website currently uses only the cookies and storage needed for it to work. We do not use analytics or advertising cookies." },
      { h: "If this changes", p: "If we add analytics or other non-essential tracking, we will ask for your consent first and provide a way to change your preferences." },
    ],
  },
  {
    slug: "terms",
    title: "Website Terms and Conditions",
    sections: [
      { h: "Who we are", p: `This website is operated by ${who}. You can reach us at ${email}.` },
      { h: "Use of this website", p: "By using this website you agree to use it lawfully and not to interfere with its operation or try to gain unauthorised access to it." },
      { h: "Content and prices", p: "Information on this website is for general information. Prices are indicative and are not a binding quotation. A final quotation is provided after we review your project." },
      { h: "Links", p: "We may link to other websites. We are not responsible for their content or privacy practices." },
      { h: "Our liability", p: "We do not exclude or limit liability for death or personal injury caused by negligence, for fraud, or for anything else the law does not allow us to exclude. Otherwise, we are not liable for loss arising from your use of, or inability to use, this website." },
      { h: "Changes", p: "We may update this website and these terms from time to time." },
      { h: "Governing law", p: "These terms are governed by the law of England and Wales, and the courts of England and Wales have jurisdiction, without affecting any rights you have under the law of where you live." },
    ],
  },
  {
    slug: "service-terms",
    title: "Service Terms",
    sections: [
      { h: "Agreed scope", p: "Each project is carried out according to a written scope and quotation agreed with the client. Work outside the agreed scope is quoted separately." },
      { h: "Quotations and third party costs", p: "A final quotation is provided after we review your project. Hosting, domains, developer account fees, premium plugins and other third party costs are separate unless the quotation says otherwise." },
      { h: "Payment", p: "A deposit, as stated in the quotation, is payable before work starts. The balance is payable on delivery or at the milestones stated in the quotation. Invoices are due within the period stated on the invoice. We may pause work while a payment is overdue." },
      { h: "Revisions", p: "The number of revision rounds is stated in the quotation. Further revisions, or changes to the agreed scope, are quoted separately." },
      { h: "Timelines", p: "Timelines are estimates agreed in the quotation. They depend on you giving timely feedback, approvals and materials, and they are not guaranteed. Delays caused by late feedback or materials can move the delivery date." },
      { h: "Client responsibilities", p: "You confirm that you have the right to use any text, images, logos and other materials you give us, and that they do not infringe anyone else's rights." },
      { h: "Our liability", p: "We do not exclude or limit liability for death or personal injury caused by negligence, for fraud, or for anything else the law does not allow us to exclude. Otherwise, our total liability for a project is limited to the fees you paid for that project, and we are not liable for indirect or consequential loss or loss of profit." },
      { h: "Cancellation and refunds", p: "These are set out in our Refund and Cancellation Policy." },
      { h: "Ownership", p: "Ownership of delivered work is set out in our Intellectual Property page." },
      { h: "Governing law", p: "These terms are governed by the law of England and Wales, and the courts of England and Wales have jurisdiction." },
    ],
  },
  {
    slug: "refund-policy",
    title: "Refund and Cancellation Policy",
    sections: [
      { h: "How to cancel", p: `Cancel by sending written notice by email to ${email}. Your cancellation takes effect when we receive it.` },
      { h: "Before work starts", p: "If you cancel before we have started work, we will refund your deposit, less any third party costs we have already committed on your behalf." },
      { h: "After work starts", p: "Once work has started, the deposit is non-refundable. If you cancel part way through a project, you pay for the work completed up to the date of cancellation, and we refund any amount you have paid beyond that." },
      { h: "If we cannot deliver", p: "If we are unable to deliver part of the agreed work, we will refund the amount paid for the part we have not delivered." },
      { h: "How refunds are paid", p: "Agreed refunds are paid to the original payment method, normally within 14 days." },
      { h: "Your legal rights", p: "If you are an individual buying for personal rather than business purposes, you may have statutory rights, including the right to cancel within 14 days of agreeing a distance contract. If you ask us to start work within that period, you pay for the work done up to the time you cancel. Nothing in this policy affects your statutory rights." },
    ],
  },
  {
    slug: "intellectual-property",
    title: "Intellectual Property",
    sections: [
      { h: "Our website", p: "The design, text and code of this website belong to MKVINE DESIGN LTD unless stated otherwise." },
      { h: "Delivered work", p: "Once we have received full payment, ownership of the final delivered work passes to the client. Until then it remains ours and may be used only as agreed. This does not cover third party materials such as fonts, stock images, plugins and open source software, which stay under their own licences." },
      { h: "Our tools and methods", p: "We keep ownership of our pre existing tools, templates, code libraries and know how, and give the client the right to use them as part of the delivered work." },
      { h: "Portfolio", p: `We may show completed work in our portfolio and marketing. If you would rather we did not, tell us in writing at ${email} and we will respect that.` },
      { h: "Reporting a problem", p: `If you believe something on this website infringes your rights, contact ${email}.` },
    ],
  },
  {
    slug: "disclaimer",
    title: "Website Disclaimer",
    sections: [
      { h: "General", p: "We aim to keep the information on this website accurate, but we make no guarantee that it is complete or current. Prices are indicative and may change." },
      { h: "External links", p: "We are not responsible for the content of external websites we link to." },
      { h: "Nothing here is advice", p: "Articles and information on this website are general and are not professional, legal or financial advice." },
    ],
  },
];
