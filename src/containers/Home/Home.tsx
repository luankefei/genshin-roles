import { useEffect, useContext } from "react";

import { ClientContext } from "../../context/ClientProvider";
import genshinData from "../../utils/data";
import { Page, Characters } from "./home.style";
import logo from "./logo.svg";

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
        <li>
          <img alt={c} src={avatar} />
          <span>{c}</span>
        </li>
      );
    });
  };

  return (
    <Page>
      <Characters>
        <ul>{renderCharacterList()}</ul>
      </Characters>
    </Page>
  );
};

export default Home;
