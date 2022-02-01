import { partial } from "ramda";
import { v4 as UUIDv4 } from "uuid";
import LazyLoad, { ILazyLoadInstance } from "vanilla-lazyload";

import { ConversionController } from "../../pluginHelpers/Conversion/ConversionController";
import { makeToolbarElement } from "../../pluginHelpers/makeToolbarElement";
import { saveFileToServer } from "../../pluginHelpers/saveFileToServer";

import { uploadFile } from "../blockQuote/libs";
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
      const image = writer.createElement("image", { "__data-src": src, __id: UUIDv4(), src: "" });

      writer.append(image, imageStack);
    });

    return imageStackContainer;
  }

  private readonly conversion: any;
  private readonly schema: any;
  private readonly view: any;
  private readonly lazyLoadInstance: ILazyLoadInstance;

  constructor(private editor: any) {
    this.view = this.editor.editing.view;
    this.schema = this.editor.model.schema;
    this.conversion = editor.conversion;

    this.lazyLoadInstance = new LazyLoad({ data_src: "src", elements_selector: `.${SelectorsEnum.imageStack} img` });
  }

  init() {
    this.defineToolbar();
    this.defineSchema();
    this.defineConversions();
    this.defineRemoveButtons();
    this.defineLazyLoad();
  }

  private defineLazyLoad() {
    this.editor.model.document.on("change", () => this.lazyLoadInstance.update());
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

    const imagesSrc: string[] = [];

    for (const file of files) {
      await saveFileToServer(file, this.editor).then((upload) => {
        if (!upload) return;
        imagesSrc.push(upload.default);
      });
    }

    editor.model.change((writer: any) => editor.model.insertContent(ImageStackPlugin.create(imagesSrc, writer)));
    this.defineRemoveButtons();
    this.lazyLoadInstance.update();
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

    this.schema.extend("image", { allowAttributes: ["__id", "__data-src"] });
  }

  // eslint-disable-next-line max-params
  private onAddAttribute(attributeName: string, event: any, data: any, conversionApi: any) {
    this.defineRemoveButtons();
    this.lazyLoadInstance.update();
    if (!conversionApi.consumable.consume(data.item, event.name)) return;

    const writer = conversionApi.writer;
    const viewElement = conversionApi.mapper.toViewElement(data.item);

    if (data.attributeNewValue !== null) {
      writer.setAttribute(attributeName, data.attributeNewValue, viewElement);
      return;
    }

    writer.removeAttribute(attributeName, viewElement);
  }

  // eslint-disable-next-line max-params
  private onAddAttributeToImg(attributeName: string, event: any, data: any, conversionApi: any) {
    this.lazyLoadInstance.update();
    if (!conversionApi.consumable.consume(data.item, event.name)) return;

    const writer = conversionApi.writer;
    const figure = conversionApi.mapper.toViewElement(data.item);
    const img = figure.getChild(0);

    if (data.attributeNewValue !== null) {
      writer.setAttribute(attributeName, data.attributeNewValue, img);
      return;
    }

    writer.removeAttribute(attributeName, img);
  }

  private defineConversions() {
    const containerConversion = new ConversionController(this.conversion, this.view);
    const boundOnAddAttribute = this.onAddAttribute.bind(this);
    const boundOnAddAttributeToImg = this.onAddAttributeToImg.bind(this);

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

    this.editor.conversion.for("upcast").attributeToAttribute({
      view: "data-src",
      model: "__data-src",
    });

    this.editor.conversion.for("downcast").add((dispatcher: any) => {
      dispatcher.on("attribute:__id:image", partial(boundOnAddAttribute, ["id"]));
      dispatcher.on("attribute:__data-src:image", partial(boundOnAddAttributeToImg, ["data-src"]));
    });
  }
}

export { ImageStackPlugin };
