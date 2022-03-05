import styled from "@emotion/styled";

const Header = styled.header`
  height: 40px;
  line-height: 40px;
  // background: #444;
  padding: 0 100px;
  border-bottom: 1px solid #f5f5f5;
  box-shadow: 0 0 3px #aaa;

  .logo {
    float: left;
    width: 300px;
    // color: #fff;
  }
`;

const Container = styled.nav`
  display: inline-block;
  width: 300px;

  ul {
    width: 600px;
    display: flex;
  }

  li {
    list-style: none;
    display: inline-block;
    padding: 0 30px;
    cursor: pointer;

    > a {
      text-decoration: none;
    }

    > span {
      color: #fff;
      text-decoration: none;
    }

    .active {
      color: #ed4441;
    }
  }
`;

const User = styled.div`
  float: right;
  width: 100px;
  display: flex;
  align-items: center;

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
  }

  span {
    margin-right: 12px;
    color: #fff;
    font-size: 12px;
  }
`;

export { Header, Container, User };
