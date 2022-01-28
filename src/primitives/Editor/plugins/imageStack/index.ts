import { partial } from "ramda";
import { v4 as UUIDv4 } from "uuid";

import { ConversionController } from "../../pluginHelpers/Conversion/ConversionController";
import { makeToolbarElement } from "../../pluginHelpers/makeToolbarElement";

import { uploadFile } from "../blockQuote/libs";
import { getBase64FromFile } from "./utils";

import { ModelsEnum, SelectorsEnum } from "./enums";

type UploadEventHandler = Parameters<typeof uploadFile>[0];
type UploadEvent = Parameters<UploadEventHandler>[0];

class ImageStackPlugin {
  static create(imagesSrc: any[], writer: any) {
    const imageStackContainer = writer.createElement(ModelsEnum.imageStackContainer);
    const imageStack = writer.createElement(ModelsEnum.imageStack);

    writer.append(imageStack, imageStackContainer);

    imagesSrc.forEach((src) => {
      const image = writer.createElement("image", { src });

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
    this.defineMoveListeners();
  }

  private defineMoveListeners() {
    const imageStackNodes = document.querySelectorAll(`.${SelectorsEnum.imageStack}`);

    imageStackNodes.forEach((node) => {
      const moveBottomButton = node.querySelector(".ck-widget__type-around__button_after");
      const imageNode = node.querySelector("figure");
      const imageId = UUIDv4();

      if (!moveBottomButton || !imageNode) return;

      imageNode.setAttribute("id", imageId);

      moveBottomButton.addEventListener("click", () => {
        const selection = this.editor.model.createSelection(ModelsEnum.imageStack);

        this.editor.model.deleteContent(selection);
      });
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
    this.defineMoveListeners();
  }

  private defineToolbar() {
    const onClick = () => {
      const partialOnUpload = partial(this.onUpload.bind(this), [this.editor]);

      uploadFile(partialOnUpload, { accept: "image/png, image/jpeg", multiple: true });
    };

    makeToolbarElement(this.editor, "Hello world!", onClick);
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
      isLimit: true,
    });
  }

  private defineConversions() {
    const containerConversion = new ConversionController(this.conversion, this.view);

    containerConversion.containerConversions({
      model: ModelsEnum.imageStackContainer,
      name: "section",
      classes: "",
      useWidget: true,
    });

    containerConversion.containerConversions({
      model: ModelsEnum.imageStack,
      name: "div",
      classes: SelectorsEnum.imageStack,
    });
  }
}

export { ImageStackPlugin };
