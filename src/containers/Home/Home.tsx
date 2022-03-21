import React, { useEffect, useState, useContext } from "react";

// import Modal from "../../components/Modal";
import ElementFilter from "../../components/ElementFilter";
import CharacterModal from "../../components/CharacterModal";

import { ClientContext } from "../../context/ClientProvider";
import genshinData from "../../utils/data";
import {
  Page,
  Header,
  Container,
  // CharacterModal,
  // Characters,
  // CharacterDetail,
  // Item,
  // GroupItem,
  // Elements,
  // ElementFilter,
} from "./home.style";
import WeaponModal from "../../components/WeaponModal";

import { IWeapon, ICharacter } from "../../interface/genshin.type";

// import charactersLocale from "../../utils/characters_cn.json";
// import logo from "./logo.svg";

const Home = () => {
  const client = useContext(ClientContext);
  const [character, setCharacter] = useState(null);
  // const [modalCharacter, setModalCharacter] = useState("");
  const [characterModalVisible, setCharacterModalVisible] = useState(false);
  const [weaponModalVisible, setWeaponModalVisible] = useState(false);
  // const [elementFilter, setElementFilter] = useState("");
  // const [weaponModalVisible, setWeaponModalVisible] = useState(false);

  useEffect(() => {
    console.log("genshin.dev");
    client.get("https://api.genshin.dev/characters").then((res) => {
      console.log("api.genshin.dev res count: ", res.length);
    });
  });

  const showCharacterModal = () => {
    console.log("showModal");
    setCharacterModalVisible(true);
    // setVisible(true);
  };

  const addCharacter = () => {
    setCharacter(null);
    showCharacterModal();
  };

  const onCharacterModalClose = (state?: string, character?: ICharacter) => {
    console.log("onCharacterModalClose");
    if (state === "onsubmit" && character) {
      const obj = JSON.parse(JSON.stringify(character));

      console.log("set character", obj);
      setCharacter(obj);
    }

    if (state === "showWeapon") {
      setWeaponModalVisible(true);
    }
    setCharacterModalVisible(false);
  };

  const onWeaponModalClose = (state?: string, weapon?: string) => {
    if (state === "onselect" && weapon) {
      // const obj: IWeapon = JSON.parse(JSON.stringify(DEFAULT_WEAPON_DETAIL));

      // console.log("onWeaponModal close", obj);
      // obj.name = weapon;
      // character.weapon = obj;

      setCharacter(character);

      // TODO: 更新列表
      // setCharacterModalVisible(true);
      console.log(weapon);
    }

    setWeaponModalVisible(false);
    console.log("onWeaponModalClose");
  };

  // TODO: 这里注意一定要清理全部表单状态
  // const onModalClose = () => {
  // setVisible(false);
  // setElementFilter("");
  // setModalCharacter("");
  // };

  const renderCharacterList = () => {
    const characters: ICharacter[] = [];
    return characters.map((c, index) => {
      const talent = Object.keys(c.talents)
        .map((k: string) => c.talents[k])
        .join(" / ");

      return (
        <tr key={c.en_name}>
          <td width="7%">{index + 1}</td>
          <td width="20%" className="left middle">
            <img className="icon" src={`/characters/${c.en_name}/icon`} alt={c.en_name} />
            <span>{c.name}</span>
          </td>
          <td width="8%">{c.level}</td>
          <td width="10%">{talent}</td>
          <td width="7%">{c.constellation}</td>
          <td width="20%" className="left">
            <ul>
              <li>有效词条：{c.artifacts.count}</li>
              <li>主词条：{c.artifacts.main}</li>
              <li>双爆：{c.artifacts.critical_score}</li>
              <li>套装：{c.artifacts.list.join(" / ")}</li>
            </ul>
          </td>
          <td width="16%" className="left">
            <ul>
              <li>名称：{c.weapon.name}</li>
              <li>精炼：{c.weapon.affix}</li>
              <li>等级：{c.weapon.level}</li>
            </ul>
          </td>
          <td width="12%">{c.score}</td>
        </tr>
      );
    });
  };

  return (
    <Page>
      <Header>
        <button className="add-character" onClick={addCharacter}>
          添加角色
        </button>
        <div className="element-filter-wrapper">
          <ElementFilter />
        </div>
      </Header>

      <Container>
        <div>
          <table>
            <thead>
              <tr>
                <th>序号</th>
                <th>角色</th>
                <th>等级</th>
                <th>天赋</th>
                <th>命座</th>
                <th>圣遗物（有效词条、充能、套装）</th>
                <th>武器</th>
                <th>练度打分（0-100）</th>
              </tr>
            </thead>
            <tbody>{renderCharacterList()}</tbody>
          </table>
        </div>
      </Container>
      <CharacterModal isOpen={characterModalVisible} character={character} onClose={onCharacterModalClose} />
      <WeaponModal isOpen={weaponModalVisible} character={character} onClose={onWeaponModalClose} />
    </Page>
  );
};

export default Home;
