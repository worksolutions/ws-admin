import { partial } from "ramda";
import { v4 as UUIDv4 } from "uuid";

import { ConversionController } from "../../pluginHelpers/Conversion/ConversionController";
import { makeToolbarElement } from "../../pluginHelpers/makeToolbarElement";

import { uploadFile } from "../blockQuote/libs";
import { getBase64FromFile } from "./utils";
import { getImageStackImageModels, getImageStackImageNodes } from "./helpers";

import { ModelsEnum, SelectorsEnum } from "./enums";

type UploadEventHandler = Parameters<typeof uploadFile>[0];
type UploadEvent = Parameters<UploadEventHandler>[0];

type TargetImage = {
  id: string | null;
  src: string | null;
};

const removeButtonIcon = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 18C10.2652 18 10.5196 17.8946 10.7071 17.7071C10.8946 17.5196 11 17.2652 11 17V11C11 10.7348 10.8946 10.4804 10.7071 10.2929C10.5196 10.1054 10.2652 10 10 10C9.73478 10 9.48043 10.1054 9.29289 10.2929C9.10536 10.4804 9 10.7348 9 11V17C9 17.2652 9.10536 17.5196 9.29289 17.7071C9.48043 17.8946 9.73478 18 10 18ZM20 6H16V5C16 4.20435 15.6839 3.44129 15.1213 2.87868C14.5587 2.31607 13.7956 2 13 2H11C10.2044 2 9.44129 2.31607 8.87868 2.87868C8.31607 3.44129 8 4.20435 8 5V6H4C3.73478 6 3.48043 6.10536 3.29289 6.29289C3.10536 6.48043 3 6.73478 3 7C3 7.26522 3.10536 7.51957 3.29289 7.70711C3.48043 7.89464 3.73478 8 4 8H5V19C5 19.7956 5.31607 20.5587 5.87868 21.1213C6.44129 21.6839 7.20435 22 8 22H16C16.7956 22 17.5587 21.6839 18.1213 21.1213C18.6839 20.5587 19 19.7956 19 19V8H20C20.2652 8 20.5196 7.89464 20.7071 7.70711C20.8946 7.51957 21 7.26522 21 7C21 6.73478 20.8946 6.48043 20.7071 6.29289C20.5196 6.10536 20.2652 6 20 6ZM10 5C10 4.73478 10.1054 4.48043 10.2929 4.29289C10.4804 4.10536 10.7348 4 11 4H13C13.2652 4 13.5196 4.10536 13.7071 4.29289C13.8946 4.48043 14 4.73478 14 5V6H10V5ZM17 19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20H8C7.73478 20 7.48043 19.8946 7.29289 19.7071C7.10536 19.5196 7 19.2652 7 19V8H17V19ZM14 18C14.2652 18 14.5196 17.8946 14.7071 17.7071C14.8946 17.5196 15 17.2652 15 17V11C15 10.7348 14.8946 10.4804 14.7071 10.2929C14.5196 10.1054 14.2652 10 14 10C13.7348 10 13.4804 10.1054 13.2929 10.2929C13.1054 10.4804 13 10.7348 13 11V17C13 17.2652 13.1054 17.5196 13.2929 17.7071C13.4804 17.8946 13.7348 18 14 18Z" fill="black"/>
  </svg
`;

const imageStackIcon = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.12613 1.47107C2.65338 1.47107 1.45947 2.66497 1.45947 4.13773V15.8044C1.45947 17.2771 2.65338 18.471 4.12613 18.471H5.54077V19.5289C5.54077 21.1858 6.88392 22.5289 8.54077 22.5289H19.5408C21.1976 22.5289 22.5408 21.1858 22.5408 19.5289V8.52893C22.5408 6.87208 21.1976 5.52893 19.5408 5.52893H18.4594V4.13773C18.4594 2.66497 17.2655 1.47107 15.7928 1.47107H4.12613ZM18.4594 7.52893V15.8044C18.4594 17.2771 17.2655 18.471 15.7928 18.471H7.54077V19.5289C7.54077 20.0812 7.98849 20.5289 8.54077 20.5289H19.5408C20.0931 20.5289 20.5408 20.0812 20.5408 19.5289V8.52893C20.5408 7.97665 20.0931 7.52893 19.5408 7.52893H18.4594ZM3.45947 4.13773C3.45947 3.76954 3.75795 3.47107 4.12613 3.47107H15.7928C16.1609 3.47107 16.4594 3.76954 16.4594 4.13773V11.1868L15.2115 9.93884C14.1683 8.89563 12.4769 8.89563 11.4337 9.93884L10.7901 10.5825L8.52764 8.27777L8.52111 8.27123C7.47791 7.22803 5.78654 7.22803 4.74333 8.27123L4.73368 8.28088L3.45947 9.62662V4.13773ZM16.3186 16.2141L12.1913 12.0097L12.8479 11.3531C13.1101 11.0909 13.5351 11.0909 13.7973 11.3531L16.4594 14.0152V15.8044C16.4594 15.9589 16.4069 16.1011 16.3186 16.2141ZM7.10434 9.6829L13.7682 16.471H4.12613C3.75795 16.471 3.45947 16.1725 3.45947 15.8044V12.5355L6.16512 9.67799C6.42696 9.42415 6.8445 9.42579 7.10434 9.6829Z" fill="black"/>
  </svg>
`;

class ImageStackPlugin {
  static create(imagesSrc: any[], writer: any) {
    const imageStackContainer = writer.createElement(ModelsEnum.imageStackContainer);
    const imageStack = writer.createElement(ModelsEnum.imageStack);

    writer.append(imageStack, imageStackContainer);

    imagesSrc.forEach((src) => {
      const image = writer.createElement("image", { src, __id: UUIDv4() });

      writer.append(image, imageStack);
    });

    return imageStackContainer;
  }

  private readonly conversion: any;
  private readonly schema: any;
  private readonly view: any;

  constructor(private editor: any) {
    this.view = this.editor.editing.view;
    this.schema = this.editor.model.schema;
    this.conversion = editor.conversion;
  }

  init() {
    this.defineToolbar();
    this.defineSchema();
    this.defineConversions();
    this.defineRemoveButtons();
  }

  private defineRemoveButtonListener(targetImage: TargetImage, removeButton: Element) {
    removeButton.addEventListener("click", () => {
      const images = getImageStackImageModels(this.editor);

      images.forEach((image) => {
        const modelId = image.getAttribute("__id");
        const modelSrc = image.getAttribute("src");

        if (modelId !== targetImage.id && modelSrc !== targetImage.src) return;

        this.editor.model.change((writer: any) => {
          writer.remove(image);
        });
      });
    });
  }

  private defineRemoveButtons() {
    const imageNodes = getImageStackImageNodes();

    imageNodes.forEach((node) => {
      const widgetTypeAround = node.querySelector(".ck-widget__type-around");
      const removeButton = document.createElement("button");
      const buttonIcon = document.createElement("span");
      const imageId = node.getAttribute("id");
      const imgNode = node.querySelector("img");

      if (!imgNode || !widgetTypeAround) return;

      buttonIcon.innerHTML = removeButtonIcon;
      removeButton.setAttribute("class", SelectorsEnum.button);

      removeButton.append(buttonIcon);
      widgetTypeAround.append(removeButton);

      const imgSrc = imgNode.getAttribute("src");

      this.defineRemoveButtonListener({ id: imageId, src: imgSrc }, removeButton);
    });
  }

  async onUpload(editor: any, e: UploadEvent) {
    const files = e.target.files;
    if (!files) return;

    const base64Images: any[] = [];

    for (const file of files) {
      await getBase64FromFile(file).then((base64Image) => base64Images.push(base64Image));
    }

    editor.model.change((writer: any) => editor.model.insertContent(ImageStackPlugin.create(base64Images, writer)));
    this.defineRemoveButtons();
  }

  private defineToolbar() {
    const onClick = () => {
      const partialOnUpload = partial(this.onUpload.bind(this), [this.editor]);

      uploadFile(partialOnUpload, { accept: "image/png, image/jpeg", multiple: true });
    };

    makeToolbarElement(this.editor, imageStackIcon, onClick);
  }

  private defineSchema() {
    this.schema.register(ModelsEnum.imageStackContainer, {
      isObject: true,
      allowWhere: "$block",
    });

    this.schema.register(ModelsEnum.imageStack, {
      allowContentOf: "$root",
      allowWhere: "$block",
      allowIn: ModelsEnum.imageStackContainer,
    });

    this.schema.extend("image", { allowAttributes: "__id" });
  }

  private defineConversions() {
    const containerConversion = new ConversionController(this.conversion, this.view);

    containerConversion.containerConversions({
      model: ModelsEnum.imageStackContainer,
      name: "section",
      classes: SelectorsEnum.imageStackContainer,
      useWidget: true,
    });

    containerConversion.containerConversions({
      model: ModelsEnum.imageStack,
      name: "div",
      classes: SelectorsEnum.imageStack,
    });

    this.editor.conversion.for("upcast").attributeToAttribute({
      view: "id",
      model: "__id",
    });

    this.editor.conversion.for("downcast").add((dispatcher: any) => {
      dispatcher.on("attribute:__id:image", (event: any, data: any, conversionApi: any) => {
        this.defineRemoveButtons();
        if (!conversionApi.consumable.consume(data.item, event.name)) return;

        const writer = conversionApi.writer;
        const figure = conversionApi.mapper.toViewElement(data.item);

        if (data.attributeNewValue !== null) {
          writer.setAttribute("id", data.attributeNewValue, figure);
          return;
        }

        writer.removeAttribute("id", figure);
      });
    });
  }
}

export { ImageStackPlugin };
