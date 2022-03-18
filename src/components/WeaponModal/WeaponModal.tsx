import React, { useEffect, useState, useContext } from "react";
import Modal from "../../components/Modal";
import { Container } from "./weapon-modal.style";

type IProps = {
  isOpen: boolean;
  character: any;
  onClose: (state?: string) => void;
};

const WeaponModal = (props: IProps) => {
  const { isOpen, character, onClose } = props;
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen !== visible) setVisible(isOpen);
  }, [isOpen]);

  return (
    <Modal visible={visible}>
      <Container>
        <div
          className="header"
          style={{ backgroundImage: `url(https://seelie.inmagi.com/img/characters/bg/${character}.png)` }}
        >
          {/* <img src={`https://seelie.inmagi.com/img/characters/bg/${modalCharacter}.png`} alt="card-bg" /> */}
          {/* <img src={`/characters/${modalCharacter}/icon`} alt={modalCharacter} />
          <span>{modalCharacter}</span> */}
          <img className="icon" src="/weapons/kaguras-verity/icon" alt="kaguras-verity" />
          <span>神乐之真意</span>
        </div>

        <div>
          <ul>
            <li>
              <img className="icon" src="/weapons/kaguras-verity/icon" alt="kaguras-verity" />
              <span>神乐之真意</span>
            </li>
            <li>
              <img className="icon" src="/weapons/kaguras-verity/icon" alt="kaguras-verity" />
              <span>神乐之真意</span>
            </li>
            <li>
              <img className="icon" src="/weapons/kaguras-verity/icon" alt="kaguras-verity" />
              <span>神乐之真意</span>
            </li>
          </ul>
        </div>
      </Container>
    </Modal>
  );
};

export default WeaponModal;
