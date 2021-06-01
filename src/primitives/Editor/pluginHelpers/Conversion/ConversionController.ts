import { toWidget } from "../utils/toWidget";
import { ConversionTypes } from "./ConversionTypesEnum";
import { ContainerConversionsInterface, EditableConversionsInterface } from "./types";
import { enablePlaceholder } from "../utils/enablePlaceholder";
import { toWidgetEditable } from "../utils/toWidgetEditable";

function checkModelController(viewCallback: any) {
  return (modelElement: any, modelController: any) => {
    if (!modelController) return;
    if (!modelController.writer) return;

    return viewCallback(modelElement, modelController);
  };
}

export class ConversionController {
  constructor(private conversion: any, private view: any) {}

  containerConversions({ model, name, classes, useWidget = false, attributes = {} }: ContainerConversionsInterface) {
    const conversionData = { model, view: { name, classes } };

    this.for(ConversionTypes.UPCAST).elementToElement(conversionData);
    this.for(ConversionTypes.DATA_DOWNCAST).elementToElement(conversionData);
    this.for(ConversionTypes.EDITING_DOWNCAST).elementToElement({
      model,
      view: checkModelController((modelElement: any, modelController: any) => {
        const editable = modelController.writer.createContainerElement(name, { class: classes, ...attributes });

        return useWidget ? toWidget(editable, modelController.writer) : editable;
      }),
    });
  }

  editableConversions({ model, name, classes, placeholder }: EditableConversionsInterface) {
    const conversionData = { model, view: { name, classes } };

    this.for(ConversionTypes.UPCAST).elementToElement(conversionData);
    this.for(ConversionTypes.DATA_DOWNCAST).elementToElement(conversionData);
    this.for(ConversionTypes.EDITING_DOWNCAST).elementToElement({
      model,
      view: checkModelController((modelElement: any, modelController: any) => {
        const editable = modelController.writer.createEditableElement(name, { class: classes });

        if (placeholder)
          enablePlaceholder({
            view: this.view,
            element: editable,
            text: placeholder,
          });

        return toWidgetEditable(editable, modelController.writer);
      }),
    });
  }

  for(conversionType: ConversionTypes) {
    return this.conversion.for(conversionType);
  }
}
