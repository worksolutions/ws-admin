import React from "react";

import Modal, { ModalSize } from "primitives/Modal";

import { useEventEmitter } from "libs/events";

import { useActions } from "modules/context/actions/useActions";
import globalEventBus from "modules/globalEventBus";
import BlockRenderer from "modules/screen/BlockRenderer";
import { useAppContext } from "modules/context/hooks/useAppContext";

import { PageModalInterface } from "../types";

function Modals({ modals = {} }: { modals?: Record<string, PageModalInterface<"close">> }) {
  const appContext = useAppContext();
  const [openedModalName, setOpenedModalName] = React.useState<string | null>(null);
  const modal = openedModalName ? modals[openedModalName] : null;
  const modalsResultAction = Object.fromEntries(
    Object.entries(modals).map(([name, modal]) => [name, useActions(modal?.actions!, appContext)]),
  );

  useEventEmitter(globalEventBus, "OPEN_PAGE_MODAL", ({ name }) => {
    setOpenedModalName(name);
  });
  useEventEmitter(globalEventBus, "CLOSE_PAGE_MODAL", () => {
    const resultAction = modalsResultAction[openedModalName!];
    if (resultAction?.close) {
      resultAction.close.run();
    }
    setOpenedModalName(null);
  });

  const closeModal = () => globalEventBus.emit("CLOSE_PAGE_MODAL", null!);

  return (
    <Modal
      size={modal?.size || ModalSize.SMALL}
      opened={!!modal}
      title={modal?.title || ""}
      subTitle={modal?.subTitle || ""}
      actionBlock={modal?.actionBlock ? <BlockRenderer {...modal.actionBlock} /> : null}
      secondaryActionText={modal?.secondaryActionText || "Закрыть"}
      onSecondaryAction={closeModal}
      onClose={closeModal}
    >
      {() => (modal ? <BlockRenderer {...modal.block} /> : null)}
    </Modal>
  );
}

export default React.memo(Modals);
