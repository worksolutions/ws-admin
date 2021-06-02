import { BlockQuotePlugin } from "../index";
import { CommandInterface } from "../../../pluginHelpers/command/CommandInterface";

export class InsertBlockQuoteCommand implements CommandInterface {
  constructor(private readonly editor: any) {}

  execute() {
    this.editor.model.change((writer: any) => {
      this.editor.model.insertContent(BlockQuotePlugin.create(writer));
    });
  }
  refresh() {}
  destroy() {}
}
