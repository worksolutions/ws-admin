import React from "react";

import Modal, { ModalSize } from "primitives/Modal";

import { useEventEmitter } from "libs/events";

import globalEventBus from "modules/globalEventBus";
import BlockRenderer from "modules/screen/BlockRenderer";

import { PageModalInterface } from "../types";

function Modals({ modals = {} }: { modals?: Record<string, PageModalInterface> }) {
  const [openedModalName, setOpenedModalName] = React.useState<string | null>(null);
  const modal = openedModalName ? modals[openedModalName] : null;

  useEventEmitter(globalEventBus, "OPEN_PAGE_MODAL", ({ name }) => {
    setOpenedModalName(name);
  });
  useEventEmitter(globalEventBus, "CLOSE_PAGE_MODAL", () => setOpenedModalName(null));

  const closeModal = () => globalEventBus.emit("CLOSE_PAGE_MODAL", null!);

  return (
    <Modal
      size={modal?.size || ModalSize.SMALL}
      opened={!!modal}
      title={modal?.title || ""}
      subTitle={modal?.subTitle || ""}
      actionBlock={modal?.actionBlock ? <BlockRenderer {...modal.actionBlock} /> : null}
      secondaryActionText="Отменить"
      onSecondaryAction={closeModal}
      onClose={closeModal}
    >
      {() => (modal ? <BlockRenderer {...modal.block} /> : null)}
    </Modal>
  );
}

export default React.memo(Modals);
