import { InsertCommand } from "../../pluginHelpers/InsertCommand";
import { getFile, isNotImage, uploadFile } from "./libs";
import { ConversionController } from "../../pluginHelpers/Conversion/ConversionController";
import { makeToolbarElement } from "../../pluginHelpers/makeToolbarElement";

export const BLOCK_QUOTE_NAME = "blockQuoteName";
export const BLOCK_QUOTE_CONTAINER = "blockQuoteContainer";
export const BLOCK_QUOTE_POSITION = "blockQuotePosition";
export const BLOCK_QUOTE_TEXT = "blockQuoteText";
export const BLOCK_QUOTE_WRAPPER_TOP = "blockQuoteWrapperTop";
export const BLOCK_QUOTE_WRAPPER_TOP_TEXT = "blockQuoteWrapperTopText";

export const BLOCK_QUOTE_NAME_CLASS = "block-quote-name";
export const BLOCK_QUOTE_CONTAINER_CLASS = "block-quote-container";
export const BLOCK_QUOTE_POSITION_CLASS = "block-quote-position";
export const BLOCK_QUOTE_TEXT_CLASS = "block-quote-text";
export const BLOCK_QUOTE_WRAPPER_TOP_CLASS = "block-quote-wrapper-top";
export const BLOCK_QUOTE_WRAPPER_TOP_TEXT_CLASS = "block-quote-wrapper-top-text";

export const DATA_BLOCK_QUOTE_WRAPPER_TOP = "data-block-quote-wrapper-top";

const svg = `
    <svg width="24" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.8672 1.824L7.26431 24L0.5271 21.696L10.9957 0L15.8672 1.824ZM31 1.824L22.6044 24L15.6599 21.696L26.1285 0L31 1.824Z" fill="#A3B3CC"/>
    </svg>
`;

export class BlockQuotePlugin {
  static create(writer: any) {
    const blockQuoteImage = writer.createElement("image", { src: "none" });

    const blockQuoteContainer = writer.createElement(BLOCK_QUOTE_CONTAINER);
    const blockQuoteWrapperTop = writer.createElement(BLOCK_QUOTE_WRAPPER_TOP);
    const blockQuoteWrapperTopText = writer.createElement(BLOCK_QUOTE_WRAPPER_TOP_TEXT);
    const blockQuoteName = writer.createElement(BLOCK_QUOTE_NAME);
    const blockQuotePosition = writer.createElement(BLOCK_QUOTE_POSITION);
    const blockQuoteText = writer.createElement(BLOCK_QUOTE_TEXT);

    writer.append(blockQuoteName, blockQuoteWrapperTopText);
    writer.append(blockQuotePosition, blockQuoteWrapperTopText);

    writer.append(blockQuoteImage, blockQuoteWrapperTop);
    writer.append(blockQuoteWrapperTopText, blockQuoteWrapperTop);

    writer.append(blockQuoteWrapperTop, blockQuoteContainer);
    writer.append(blockQuoteText, blockQuoteContainer);

    return blockQuoteContainer;
  }

  private readonly conversion: any;
  private readonly schema: any;
  private readonly view: any;
  private readonly selection: any;

  constructor(private editor: any) {
    this.view = this.editor.editing.view;
    this.schema = this.editor.model.schema;
    this.conversion = editor.conversion;
    this.selection = this.editor.model.document.selection;
  }

  init() {
    this.defineToolbar();
    this.defineCommands();
    this.defineSchema();
    this.defineConversions();
    this.defineListeners();
  }
  private defineToolbar() {
    makeToolbarElement(this.editor, svg, () => this.editor.execute("insertBlockQuote"));
  }

  private defineCommands() {
    const insertCallback = BlockQuotePlugin.create;

    this.editor.commands.add("insertBlockQuote", new InsertCommand(this.editor, insertCallback));
  }

  private defineSchema() {
    this.schema.register(BLOCK_QUOTE_CONTAINER, {
      isObject: true,
      allowWhere: "$block",
    });

    this.schema.register(BLOCK_QUOTE_WRAPPER_TOP, {
      isLimit: true,
      allowContentOf: "$root",
      allowWhere: "$block",
      allowIn: BLOCK_QUOTE_CONTAINER,
    });

    this.schema.register(BLOCK_QUOTE_WRAPPER_TOP_TEXT, {
      isLimit: true,
      allowContentOf: "$root",
      allowWhere: "$block",
      allowIn: BLOCK_QUOTE_CONTAINER,
    });

    this.schema.register(BLOCK_QUOTE_NAME, {
      isObject: true,
      allowContentOf: "$block",
      allowWhere: "$block",
      allowIn: BLOCK_QUOTE_WRAPPER_TOP_TEXT,
    });

    this.schema.register(BLOCK_QUOTE_POSITION, {
      isLimit: true,
      allowContentOf: "$block",
      allowWhere: "$block",
      allowIn: BLOCK_QUOTE_WRAPPER_TOP_TEXT,
    });

    this.schema.register(BLOCK_QUOTE_TEXT, {
      isLimit: true,
      allowContentOf: "$root",
      allowWhere: "$block",
      allowIn: BLOCK_QUOTE_CONTAINER,
    });

    this.schema.addChildCheck((context: any, childDefinition: any) => {
      if (context.endsWith(BLOCK_QUOTE_POSITION) && childDefinition.name == BLOCK_QUOTE_CONTAINER) {
        return false;
      }
    });
  }

  private defineConversions() {
    const containerConversion = new ConversionController(this.conversion, this.view);

    containerConversion.containerConversions({
      model: BLOCK_QUOTE_CONTAINER,
      name: "section",
      classes: BLOCK_QUOTE_CONTAINER_CLASS,
      useWidget: true,
    });

    containerConversion.containerConversions({
      model: BLOCK_QUOTE_WRAPPER_TOP,
      name: "div",
      classes: BLOCK_QUOTE_WRAPPER_TOP_CLASS,
      attributes: { [DATA_BLOCK_QUOTE_WRAPPER_TOP]: "true" },
    });

    containerConversion.containerConversions({
      model: BLOCK_QUOTE_WRAPPER_TOP_TEXT,
      name: "div",
      classes: BLOCK_QUOTE_WRAPPER_TOP_TEXT_CLASS,
    });

    containerConversion.editableConversions({
      model: BLOCK_QUOTE_NAME,
      name: "div",
      classes: BLOCK_QUOTE_NAME_CLASS,
      placeholder: "Имя",
    });

    containerConversion.editableConversions({
      model: BLOCK_QUOTE_POSITION,
      name: "div",
      classes: BLOCK_QUOTE_POSITION_CLASS,
      placeholder: "Должность",
    });

    containerConversion.editableConversions({
      model: BLOCK_QUOTE_TEXT,
      name: "div",
      classes: BLOCK_QUOTE_TEXT_CLASS,
      placeholder: "Текст",
    });
  }

  private defineListeners() {
    this.editor.listenTo(this.view.document, "click", (_: any, { target }: any) => {
      if (isNotImage(target)) return;

      uploadFile(async ({ target: htmlTarget }) => {
        const file = getFile(htmlTarget);
        if (!file) return;

        const upload = await this.createLoader(file);
        if (!upload?.default) return;

        this.editor.model.change((writer: any) =>
          writer.setAttribute("src", upload.default, this.selection.getSelectedElement()),
        );
      });
    });
  }

  private async createLoader(file: File): Promise<{ default: string } | null> {
    try {
      const loader = await this.editor.plugins.get("FileRepository").createLoader(file);
      await loader.read();
      return await loader.upload();
    } catch (e) {
      return null;
    }
  }
}
