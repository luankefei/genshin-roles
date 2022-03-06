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

export const Characters = styled.div`
  padding: 0 100px;

  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      flex: 1;
      margin: 10px;

      img {
        width: 80px;
        height: auto;
      }
    }
  }
`;

export default { Page };
