import { partial } from "ramda";
import { v4 as UUIDv4 } from "uuid";

import { ConversionController } from "../../pluginHelpers/Conversion/ConversionController";
import { makeToolbarElement } from "../../pluginHelpers/makeToolbarElement";

import { uploadFile } from "../blockQuote/libs";
import { getBase64FromFile } from "./utils";
import { getImageStackImageModels, getImageStackImageNodes } from "./helpers";
import { imageStackIcon, removeIcon } from "../../icons";

import { ModelsEnum, SelectorsEnum } from "./enums";

type UploadEventHandler = Parameters<typeof uploadFile>[0];
type UploadEvent = Parameters<UploadEventHandler>[0];

type TargetImage = {
  id: string | null;
  src: string | null;
};

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

      buttonIcon.innerHTML = removeIcon;
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
