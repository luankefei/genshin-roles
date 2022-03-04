import ActiveLink from "../ActiveLink/ActiveLink";
import { Header, Nav, User } from "./nav.style";

const AdminNav = () => (
  <Header>
    <div className="logo">管理后台</div>
    <Nav>
      <ul>
        <li>
          <ActiveLink to="/">
            <span>登录</span>
          </ActiveLink>
        </li>
      </ul>
    </Nav>
    <User>
      <span>马拉非</span>
      <img
        className="avatar"
        src="https://imgxiaolai.laiye.com/uQ7jAnAO4nMgjOSU6rtM3ZAPrR3DENNM9R7iaUicGO6js7PUfGH145pf23Twswqh370RJTpam9uBvuUC4blCpjaw.jpeg"
        alt="avatar"
      />
    </User>
  </Header>
);

export default AdminNav;
