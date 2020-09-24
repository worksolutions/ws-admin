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
      decorators: {
        addTargetToExternalLinks: {
          mode: "automatic",
          callback: (url: string) => /^(https?:)?\/\//.test(url),
          attributes: {
            target: "_blank",
            rel: "nofollow noopener noreferrer",
          },
        },
      },
    },
    language: "ru",
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "|",
      "alignment",
      "|",
      "numberedList",
      "bulletedList",
      "|",
      "code",
      "horizontalLine",
      "link",
      "imageUpload",
      "insertTable",
      "mediaEmbed",
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
          model: "heading2",
          view: "h2",
          title: "Заголовок h2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Заголовок h3",
          class: "ck-heading_heading3",
        },
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
      ],
    },
  },
);
