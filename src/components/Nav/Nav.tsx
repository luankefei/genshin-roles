import { Outlet } from "react-router";
import ActiveLink from "../ActiveLink/ActiveLink";
import { Header, Container, User } from "./nav.style";

const Nav = () => (
  <div>
    <Header>
      <div className="logo">原神练度工具</div>
      <Container>
        <ul>
          <li>
            <ActiveLink to="/">
              <span>角色</span>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink to="/artifact">
              <span>圣遗物</span>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink to="/me">
              <span>我的</span>
            </ActiveLink>
          </li>
        </ul>
      </Container>
      <User>
        <span>马拉非</span>
        <img
          className="avatar"
          src="https://imgxiaolai.laiye.com/uQ7jAnAO4nMgjOSU6rtM3ZAPrR3DENNM9R7iaUicGO6js7PUfGH145pf23Twswqh370RJTpam9uBvuUC4blCpjaw.jpeg"
          alt="avatar"
        />
      </User>
    </Header>
    <Outlet />
  </div>
);

export default Nav;
