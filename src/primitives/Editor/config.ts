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
        decorator1: {
          mode: "automatic",
          callback: (url: string) => url.startsWith("http") && new URL(url).hostname !== "worksolutions.ru",
          attributes: {
            target: "_blank",
            rel: "nofollow noopener noreferrer",
          },
        },
        decorator2: {
          mode: "automatic",
          callback: (url: string) => url.startsWith("http"),
          attributes: {},
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
      "alignment:left",
      "alignment:center",
      "alignment:right",
      "alignment:justify",
      "|",
      "numberedList",
      "bulletedList",
      "|",
      "link",
      "imageUpload",
      "mediaEmbed",
      "code",
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
  },
);
