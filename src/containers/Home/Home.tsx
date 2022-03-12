import React, { useEffect, useState, useContext, ReactEventHandler } from "react";

import { ClientContext } from "../../context/ClientProvider";
import genshinData from "../../utils/data";
import { Page, Header, Container, CharacterModal, Characters, Elements, ElementFilter } from "./home.style";

import Modal from "../../components/Modal";
// import logo from "./logo.svg";

const Home = () => {
  const client = useContext(ClientContext);
  const [visible, setVisible] = useState(false);
  const [modalCharacter, setModalCharacter] = useState("");
  const [elementFilter, setElementFilter] = useState("");

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

  const onModalClose = () => {
    setVisible(false);
    setElementFilter("");
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
          <ElementFilter>
            <Elements onClick={clickElementFilter}>
              <ul>{renderElementFilter()}</ul>
            </Elements>
          </ElementFilter>
          <Characters>
            <ul>{renderCharacterList()}</ul>
          </Characters>
          <button></button>
        </CharacterModal>
      </Modal>
    </Page>
  );
};

export default Home;
