import logo from "./../img/logo.svg";
import light from "./../img/light.svg";
import dark from "./../img/dark.svg";

const Header = (props) => {
  return (
    <div className="header">
      <a href=" " className="logo">
        <img src={logo} alt="" />
      </a>
      <a href=" " className="light" onClick={props.themeChange}>
        <img src={props.theme === "dark" ? light : dark} alt="" />
      </a>
    </div>
  );
};

export default Header;
