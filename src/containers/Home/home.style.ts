import styled from "@emotion/styled";

export const Page = styled.div`
  padding-top: 80px;

  img {
    width: 240px;
    height: 280px;
  }

  div {
    font-size: 14px;
    padding-top: 40px;
  }
`;

export const Header = styled.div`
  padding: 0 80px;

  .add-character {
    height: 36px;
    border: none;
    font-size: 15px;
    color: #fff;
    padding: 0 20px;
    border-radius: 6px;
    background: #ed4441;
  }
`;

export const Container = styled.div``;

export const CharacterModal = styled.div`
  width: 100%;
  height: 100%;
  background: rgb(30, 41, 59);
  padding: 20px 0;
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
      cursor: pointer;

      &.selected {
        outline: 1px solid #ed4441;
        border-radius: 6px;
      }

      .character-bg-5,
      .character-bg-4 {
        border-radius: 6px;
        overflow: hidden;
        background-image: linear-gradient(to bottom right, #d2832a 20%, #5a3911 85%, rgba(210, 131, 42, 0));
      }

      .character-bg-4 {
        background-image: linear-gradient(to bottom right, #7b4faf 20%, #251e4c 85%, rgba(123, 79, 175, 0));
      }

      img {
        width: 80px;
        height: auto;
      }

      span {
        color: rgb(226, 232, 240);
        line-height: 22px;
      }
    }
  }
`;

export const Elements = styled.div`
  height: 36px;

  ul {
    display: flex;
    // justify-content: center;

    li {
      flex: 1;
      flex-grow: 0;
      padding: 4px;
      height: 28px;
      border-radius: 6px;
      margin: 0 2px;

      img {
        width: 28px;
        height: auto;
      }
    }
  }
`;

export const ElementFilter = styled.div`
  margin-bottom: 16px;
  // text-align: center;

  ul {
    justify-content: center;

    li.selected {
      background: rgba(234, 179, 8);
    }
  }
`;

// export default { Page, CharacterModal, Characters, Elements };
