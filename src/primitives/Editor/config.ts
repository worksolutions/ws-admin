export const config = Object.assign(
  {},
  {
    image: {
      styles: ["full", "alignLeft", "alignRight"],
      toolbar: ["imageTextAlternative"],
    },
  },
  {
    link: {
      decorators: {},
    },
    language: "ru",
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "|",
      "alignment:left",
      "alignment:center",
      "alignment:right",
      "alignment:justify",
      "|",
      "numberedList",
      "bulletedList",
      "|",
      "link",
      "blockQuote",
      "imageUpload",
      "mediaEmbed",
      "|",
      "codeBlock",
      "|",
      "horizontalLine",
      "insertTable",
      "|",
      "undo",
      "redo",
    ],
    table: {
      contentToolbar: ["tableRow", "tableColumn"],
    },
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Заголовок h3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Заголовок h2",
          class: "ck-heading_heading2",
        },
      ],
    },
    codeBlock: {
      languages: [
        { language: "plaintext", label: "Plain text", class: "data-code-plaintext" },
        { language: "php", label: "PHP", class: "data-code-php" },
        { language: "javascript", label: "JavaScript", class: "data-code-javascript" },
        { language: "html", label: "HTML", class: "data-code-html" },
        { language: "css", label: "CSS", class: "data-code-css" },
      ],
    },
  },
);
