import React, { useEffect, useState, useContext } from "react";
import type { ChangeEvent } from "react";
// import set from 'lodash/set'

import Modal from "../Modal";
import ElementFilter from "../ElementFilter";
import { characters, characterMap } from "../../utils/data";
import { baseSet } from "../../utils";

import { ICharacter, IWeapon } from "../../interface/genshin.type";
import {
  Container,
  // ElementFilter,
  // Elements,
  Characters,
  CharacterDetail,
  Item,
} from "./character-modal.style";

export const DEFAULT_WEAPON_DETAIL: IWeapon = {
  id: "kaguras-verity",
  name: "神乐之真意",
  affix: 5,
  level: 90,
};

const DEFAULT_CHARACTER_DETAIL: ICharacter = {
  enName: "yae",
  name: "八重神子",
  level: 90,
  talents: { a: 0, e: 9, q: 9 },
  constellation: 6,
  weapon: DEFAULT_WEAPON_DETAIL,
  weaponType: "sword",
  artifacts: {
    list: ["平息鳴雷的尊者", "翠綠之影"],
    primary_attribute: [],
    critical_score: 106,
    main: 26.1,
    count: 26.1,
  },
  score: 60,
};

type IProps = {
  isOpen: boolean;
  character: ICharacter | null;
  onClose: (state?: string, character?: ICharacter) => void;
};

const CharacterModal = (props: IProps) => {
  const { isOpen, character, onClose } = props;
  // console.log("----------------------------------- character modal render", character);
  const [visible, setVisible] = useState(isOpen);
  const [modalCharacter, setModalCharacter] = useState(character);
  const [elementFilter, setElementFilter] = useState("");

  useEffect(() => {
    // console.log("useEffect", isOpen);
    setVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    // console.log("----------------------------------- character change", character);
    setModalCharacter(character);
  }, [character?.weapon]);

  const onModalClose = () => {
    // setVisible(false);
    setElementFilter("");
    setModalCharacter(null);
    onClose();
  };

  // 确认修改
  const onSubmit = () => {
    // console.log("onSubmit", character);
    if (modalCharacter) {
      onClose("onsubmit", modalCharacter);
    }
  };

  // 修改角色字段
  const onCharacterChange = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    if (!modalCharacter) return;
    baseSet(modalCharacter, key, e.target.value);
  };

  const showWeaponModal = () => {
    onClose("showWeapon", modalCharacter || undefined);
    // console.log("showWeaponModal");
    // setWeaponModalVisible(true);

    // 临时关闭角色窗口
    // setVisible(false);
  };

  const clickModalCharacter = (name: string, index: number) => {
    const obj: ICharacter = JSON.parse(JSON.stringify(DEFAULT_CHARACTER_DETAIL));

    // enName: string;
    // name: string;
    // level: number;
    // talents: { [key: string]: number };
    // constellation: number;
    // weapon: IWeapon;
    // artifacts: {
    //   list: string[];
    //   primary_attribute: string[];
    //   critical_score: number;
    //   main: number;
    //   count: number;
    // };
    // score: number
    obj.enName = name;
    obj.name = characterMap[name].name;
    obj.weaponType = characterMap[name].weapon_type.toLowerCase();

    setModalCharacter(obj);

    // 临时保存，将character带回上层，注意这里不会触发关闭
    onClose("onselect", obj);

    // console.log("clickModalCharacter", name, index);
  };

  const renderCharacterList = () => {
    let characterList = characters;

    if (elementFilter)
      characterList = characters.filter((name: string) => {
        const vision = (characterMap[name]?.vision || "").toLowerCase();
        return vision === elementFilter;
      });

    return characterList.map((c: string, index: number) => {
      const avatar = `${process.env.PUBLIC_URL}/characters/${c}/icon`;
      const bgClassName = "character-bg-" + characterMap[c]?.rarity || "4";

      return (
        <li
          className={modalCharacter?.name === c ? "selected" : undefined}
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
              style={{
                backgroundImage: `url(https://seelie.inmagi.com/img/characters/bg/${modalCharacter.enName}.png)`,
              }}
            >
              <img src={`/characters/${modalCharacter.enName}/icon`} alt={modalCharacter.enName} />
              <span>{modalCharacter.name}</span>
            </div>
            <Item>
              <dt>角色信息</dt>
              <section>
                <dd>
                  <span>等级</span>
                  <input type="text" placeholder="90" onChange={onCharacterChange("level")} />
                </dd>
                <dd>
                  <span>命座</span>
                  <input type="text" placeholder="0" onChange={onCharacterChange("constellation")} />
                </dd>
                <dd className="multi">
                  <span>天赋</span>
                  <input type="text" placeholder="0" onChange={onCharacterChange("talents.a")} />
                  <input type="text" placeholder="0" onChange={onCharacterChange("talents.e")} />
                  <input type="text" placeholder="0" onChange={onCharacterChange("talents.q")} />
                </dd>
              </section>
            </Item>
            <Item>
              <dt>武器</dt>
              <section>
                <dd className="multi">
                  <div onClick={showWeaponModal}>
                    <img
                      className="icon"
                      src={`/weapons/${modalCharacter.weapon.id}/icon`}
                      alt={modalCharacter.weapon.name}
                    />
                    <span>{modalCharacter.weapon.name}</span>
                  </div>

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
                <button className="confirm" onClick={onSubmit}>
                  确认修改
                </button>
              </section>
            </Item>
          </CharacterDetail>
        ) : null}
      </Container>
    </Modal>
  );
};

export default CharacterModal;
