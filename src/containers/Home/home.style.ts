import styled from "@emotion/styled";

export const Page = styled.div`
  padding-top: 80px;
  text-align: center;

  img {
    width: 240px;
    height: 280px;
  }

  div {
    font-size: 14px;
    padding-top: 40px;
  }
`;

export const CharacterModal = styled.div`
  width: 100%;
  height: 100%;
  background: rgb(30, 41, 59);
  // background: rgb(226, 232, 240);
`;

export const Characters = styled.div`
  padding: 0 20px;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    li {
      width: 96px;
      flex: 1;
      margin: 5px;
      text-align: center;
      flex-grow: 0;

      img {
        width: 80px;
        height: auto;
      }

      span {
        color: rgb(226, 232, 240);
      }
    }
  }
`;

export const Elements = styled.div`
  height: 36px;
  text-align: center;
  padding-top: 20px;
  margin-bottom: 16px;

  ul {
    display: flex;
    justify-content: center;

    li {
      flex: 1;
      flex-grow: 0;
      padding: 0 5px;

      img {
        width: 36px;
        height: auto;
      }
    }
  }
`;

// export default { Page, CharacterModal, Characters, Elements };
