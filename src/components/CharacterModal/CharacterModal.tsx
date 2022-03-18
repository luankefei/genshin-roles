import React, { useEffect, useState, useContext } from "react";

import Modal from "../../components/Modal";
import ElementFilter from "../ElementFilter";
import genshinData from "../../utils/data";
import {
  Container,
  // ElementFilter,
  // Elements,
  Characters,
  CharacterDetail,
  Item,
} from "./character-modal.style";

type IProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CharacterModal = (props: IProps) => {
  const { isOpen, onClose } = props;
  const [visible, setVisible] = useState(isOpen);
  const [modalCharacter, setModalCharacter] = useState("");
  const [elementFilter, setElementFilter] = useState("");
  const [weaponModalVisible, setWeaponModalVisible] = useState(false);

  useEffect(() => {
    console.log("useEffect", isOpen);
    setVisible(isOpen);
  }, [isOpen]);

  const onModalClose = () => {
    // setVisible(false);
    setElementFilter("");
    setModalCharacter("");
    onClose();
  };

  const showWeaponModal = () => {
    console.log("showWeaponModal");
    setWeaponModalVisible(true);

    // 临时关闭角色窗口
    setVisible(false);
  };

  const clickModalCharacter = (name: string, index: number) => {
    setModalCharacter(name);
    console.log("clickModalCharacter", name, index);
  };

  const renderCharacterList = () => {
    let characters = genshinData.characters;
    if (elementFilter)
      characters = characters.filter((name) => {
        const vision = (genshinData.characterMap[name]?.vision || "").toLowerCase();
        return vision === elementFilter;
      });
    return characters.map((c, index) => {
      const avatar = `${process.env.PUBLIC_URL}/characters/${c}/icon`;
      const bgClassName = "character-bg-" + genshinData.characterMap[c]?.rarity || "4";
      return (
        <li
          className={modalCharacter === c ? "selected" : undefined}
          key={c}
          onClick={() => clickModalCharacter(c, index)}
        >
          <div className={bgClassName}>
            <img alt={c} src={avatar} />
          </div>
          <span>{c}</span>
        </li>
      );
    });
  };

  return (
    <Modal visible={visible} onClose={onModalClose}>
      <Container>
        {!modalCharacter ? (
          <>
            <ElementFilter />

            <Characters>
              <ul>{renderCharacterList()}</ul>
            </Characters>
          </>
        ) : null}
        {modalCharacter ? (
          <CharacterDetail>
            <div
              className="header"
              style={{ backgroundImage: `url(https://seelie.inmagi.com/img/characters/bg/${modalCharacter}.png)` }}
            >
              {/* <img src={`https://seelie.inmagi.com/img/characters/bg/${modalCharacter}.png`} alt="card-bg" /> */}
              <img src={`/characters/${modalCharacter}/icon`} alt={modalCharacter} />
              <span>{modalCharacter}</span>
            </div>
            <Item>
              <dt>角色信息</dt>
              <section>
                <dd>
                  <span>等级</span>
                  <input type="text" placeholder="90" />
                </dd>
                <dd>
                  <span>命座</span>
                  <input type="text" placeholder="0" />
                </dd>
                <dd className="multi">
                  <span>天赋</span>
                  <input type="text" placeholder="0" />
                  <input type="text" placeholder="0" />
                  <input type="text" placeholder="0" />
                </dd>
              </section>
            </Item>
            <Item>
              <dt>武器</dt>
              <section>
                <dd className="multi" onClick={showWeaponModal}>
                  <img className="icon" src="/weapons/kaguras-verity/icon" alt="kaguras-verity" />
                  <span>神乐之真意</span>

                  <label htmlFor="refining">精炼</label>
                  <input id="refining" type="text" placeholder="1" />
                  <label htmlFor="">白值</label>
                  <input id="attack" type="text" placeholder="0" />
                </dd>
              </section>
            </Item>
            <Item>
              <dt>圣遗物</dt>
              <section>
                <dd></dd>
              </section>
            </Item>
            <Item>
              <section className="center last">
                <button className="confirm">确认修改</button>
              </section>
            </Item>
          </CharacterDetail>
        ) : null}
      </Container>
    </Modal>
  );
};

export default CharacterModal;
