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

// import charactersLocale from "../../utils/characters_cn.json";
// import logo from "./logo.svg";

const DEFAULT_CHARACTER_DETAIL = {
  name: "aloy",
  level: 90,
  talents: { a: 0, e: 0, q: 0 },
  weapon: "",
  artifacts: {
    list: ["平息鳴雷的尊者", "翠綠之影"],
    primary_attribute: [],
  },
};

const Home = () => {
  const client = useContext(ClientContext);
  const [characterModalVisible, setCharacterModalVisible] = useState(false);
  // const [modalCharacter, setModalCharacter] = useState("");
  // const [elementFilter, setElementFilter] = useState("");
  // const [characterDetail, setCharacterDetail] = useState({});
  // const [weaponModalVisible, setWeaponModalVisible] = useState(false);

  useEffect(() => {
    console.log("genshin.dev");
    client.get("https://api.genshin.dev/characters").then((res) => {
      console.log("res", res);
    });
  });

  const showCharacterModal = () => {
    console.log("showModal");
    setCharacterModalVisible(true);
    // setVisible(true);
  };

  // TODO: 这里注意一定要清理全部表单状态
  // const onModalClose = () => {
  // setVisible(false);
  // setElementFilter("");
  // setModalCharacter("");
  // };

  return (
    <Page>
      <Header>
        <button className="add-character" onClick={showCharacterModal}>
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
            <tbody>
              <tr>
                <td width="7%">1</td>
                <td width="20%" className="left middle">
                  <img className="icon" src="/characters/yae/icon" alt="kaguras-verity" />
                  <span>八重神子</span>
                </td>
                <td width="8%">90</td>
                <td width="10%">0/9/9</td>
                <td width="7%">6</td>
                <td width="20%" className="left">
                  <ul>
                    <li>有效词条：30.4</li>
                    <li>主词条：24.5</li>
                    <li>双爆：160.1</li>
                    <li>套装：如雷2 / 吸能2</li>
                  </ul>
                </td>
                <td width="16%" className="left">
                  <ul>
                    <li>名称：神乐之真意</li>
                    <li>精炼：5</li>
                    <li>等级：90</li>
                  </ul>
                </td>
                <td width="12%">60</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
      <CharacterModal isOpen={characterModalVisible} />
    </Page>
  );
};

export default Home;
