/**
 * 通用Modal组件
 */
import { FC, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { canUseDOM } from "../../utils/safeHTMLElement";
import { Wrapper, CloseButton, Container } from "./modal.style";

export type ModalProps = {
  visible: boolean;
  children: ReactNode;
  showCloseButton?: boolean;
  onClise?: () => void;
};

const Modal: FC<ModalProps> = (props) => {
  const { visible } = props;
  const [open, setOpen] = useState(visible);

  let node: HTMLElement | null = null;

  useEffect(() => {
    if (!canUseDOM) return;

    node = document.createElement("div");
    node.className = "ReactModalPortal";

    document.body.appendChild(node);
  }, []);

  const onClose = () => {
    setOpen(false);
    if (props.onClise) props.onClise();
  };

  return createPortal(
    open ? (
      <Wrapper>
        <CloseButton onClick={onClose}>
          <img src="/images/close.png" alt="关闭" />
        </CloseButton>
        <Container>
          <div>{props.children}</div>
        </Container>
      </Wrapper>
    ) : null,
    node || document.body
  );
};

export default Modal;
