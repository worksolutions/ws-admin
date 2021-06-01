import { BlockQuote } from "../index";
import { CommandInterface } from "../../../core/command/CommandInterface";

export class InsertBlockQuoteCommand implements CommandInterface {
  constructor(private readonly editor: any) {}

  execute() {
    this.editor.model.change((writer: any) => {
      this.editor.model.insertContent(BlockQuote.create(writer));
    });
  }
  refresh() {}
  destroy() {}
}
