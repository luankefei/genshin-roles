import { useEffect, useContext } from "react";

import { ClientContext } from "../../context/ClientProvider";
import genshinData from "../../utils/data";
import { Page, CharacterModal, Characters, Elements } from "./home.style";

import Modal from "../../components/Modal";
// import logo from "./logo.svg";

const Home = () => {
  const client = useContext(ClientContext);

  useEffect(() => {
    console.log("genshin.dev");
    client.get("https://api.genshin.dev/characters").then((res) => {
      console.log("res", res);
    });
  });

  const renderCharacterList = () => {
    return genshinData.characters.map((c) => {
      const avatar = `${process.env.PUBLIC_URL}/characters/${c}/icon`;
      return (
        <li key={c}>
          <img alt={c} src={avatar} />
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
      <li>
        <img src={`/elements/${item}.png`} alt={item} />
      </li>
    ));
  };

  return (
    <Page>
      <Modal visible={true}>
        <CharacterModal>
          <Elements>
            <ul>{renderElementFilter()}</ul>
          </Elements>
          <Characters>
            <ul>{renderCharacterList()}</ul>
          </Characters>
        </CharacterModal>
      </Modal>
    </Page>
  );
};

export default Home;
