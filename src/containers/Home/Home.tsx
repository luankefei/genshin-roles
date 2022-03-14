import React, { useEffect, useState, useContext, ReactEventHandler } from "react";

import { ClientContext } from "../../context/ClientProvider";
import genshinData from "../../utils/data";
import {
  Page,
  Header,
  Container,
  CharacterModal,
  Characters,
  CharacterDetail,
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
              <dl>
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
                  <dd className="talent">
                    <span>天赋</span>
                    <input type="text" placeholder="0" />
                    <input type="text" placeholder="0" />
                    <input type="text" placeholder="0" />
                  </dd>
                </section>
              </dl>
              <dl>
                <dt>武器</dt>
                <section>
                  <dd>
                    <img src="" alt="" />
                    <span>神乐之真意</span>
                    <input type="text" placeholder="精炼" />
                    <input type="text" placeholder="白值" />
                  </dd>
                </section>
              </dl>
              <dl>
                <dt>圣遗物</dt>
                <section>
                  <dd></dd>
                </section>
              </dl>
              <dl>
                <section className="center last">
                  <button className="confirm">确认修改</button>
                </section>
              </dl>
            </CharacterDetail>
          ) : null}
        </CharacterModal>
      </Modal>
    </Page>
  );
};

export default Home;
