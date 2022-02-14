import { CommandInterface } from "./command/CommandInterface";

export class InsertCommand implements CommandInterface {
  constructor(private readonly editor: any, private readonly callback: (writer: any) => any) {}

  execute() {
    this.editor.model.change((writer: any) => {
      this.editor.model.insertContent(this.callback(writer));
    });
  }
  refresh() {}
  destroy() {}
}
