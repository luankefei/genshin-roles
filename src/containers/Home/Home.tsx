import React, { useEffect, useState, useContext } from "react";

import { ClientContext } from "../../context/ClientProvider";
import genshinData from "../../utils/data";
import {
  Page,
  Header,
  Container,
  CharacterModal,
  Characters,
  CharacterDetail,
  Item,
  GroupItem,
  Elements,
  ElementFilter,
} from "./home.style";

import Modal from "../../components/Modal";
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
  const [visible, setVisible] = useState(false);
  const [modalCharacter, setModalCharacter] = useState("");
  const [elementFilter, setElementFilter] = useState("");
  const [characterDetail, setCharacterDetail] = useState({});

  useEffect(() => {
    console.log("genshin.dev");
    client.get("https://api.genshin.dev/characters").then((res) => {
      console.log("res", res);
    });
  });

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

  // 角色浮层的元素筛选
  const renderElementFilter = () => {
    // 风 冰 草 雷 岩 水 火
    const elements = ["anemo", "cryo", "dendro", "electro", "geo", "hydro", "pyro"];

    return elements.map((item) => (
      <li className={item === elementFilter ? "selected" : ""} data-name={item} key={item}>
        <img src={`/elements/${item}.png`} alt={item} />
      </li>
    ));
  };

  const showModal = () => {
    console.log("showModal");
    setVisible(true);
  };

  // TODO: 这里注意一定要清理全部表单状态
  const onModalClose = () => {
    setVisible(false);
    setElementFilter("");
    setModalCharacter("");
  };

  const clickElementFilter = (e: any) => {
    let node = e.target;
    while (node.nodeName && node.nodeName !== "LI") node = node.parentNode;

    const element = node.dataset.name || "";

    if (elementFilter === element) return setElementFilter("");
    setElementFilter(node.dataset.name || "");
  };

  const clickModalCharacter = (name: string, index: number) => {
    setModalCharacter(name);
    console.log("clickModalCharacter", name, index);
  };

  return (
    <Page>
      <Header>
        <button className="add-character" onClick={showModal}>
          添加角色
        </button>
        <Elements>
          <ul>{renderElementFilter()}</ul>
        </Elements>
      </Header>

      <Container>
        <div>
          <table>
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
            <tr>
              <td width="7%">1</td>
              <td width="20%" className="left middle">
                <img className="icon" src="/weapons/kaguras-verity/icon" alt="kaguras-verity" />
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
              <td width="16%">
                <span>神乐之真意</span>
                <span>5</span>
                <span>90</span>
              </td>
              <td width="12%">60</td>
            </tr>
          </table>
        </div>
      </Container>

      <Modal visible={visible} onClose={onModalClose}>
        <CharacterModal>
          {!modalCharacter ? (
            <>
              <ElementFilter>
                <Elements onClick={clickElementFilter}>
                  <ul>{renderElementFilter()}</ul>
                </Elements>
              </ElementFilter>
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

              {/* <GroupItem>
                <legend>武器</legend>
                <Item>
                  <dt>
                    <img className="icon" src="/weapons/kaguras-verity/icon" alt="kaguras-verity" />
                    <span>神乐之真意</span>
                  </dt>
                  <dd>
                    <label htmlFor="">白值</label>
                    <input type="text" placeholder="0" />
                  </dd>
                  <dd>
                    <label htmlFor="refining">精炼</label>
                    <input id="refining" type="text" placeholder="1" />
                  </dd>
                </Item>
              </GroupItem> */}
              <Item>
                <dt>武器</dt>
                <section>
                  <dd className="multi">
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
        </CharacterModal>
      </Modal>
    </Page>
  );
};

export default Home;
