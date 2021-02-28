import React, { useState } from "react";
import "./EntryPage.css";
import { User } from "../../data/users";
import { InputGroup, Label, Input, Alert, Form } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import { IEntryPageProps } from "../../interfaces/ComponentsProps";
import { setTimeout } from "timers";

const EntryPage: React.FC<IEntryPageProps> = ({
  setMenuOpen,
  users,
  setCurrentUser,
  setGuestHandler,
  setLoggedHandler,
}): JSX.Element => {
  const [activeEntryPageLabel, setActiveEntryPageLabel] = useState<string>(
    "login"
  );

  const loginLabelClass =
    activeEntryPageLabel === "login"
      ? "login-label active-entry-page-label"
      : "login-label";

  const registrationLabelClass =
    activeEntryPageLabel === "registration"
      ? "registration-label active-entry-page-label"
      : "registration-label";

  const loginLabelHandler = () => {
    setActiveEntryPageLabel("login");
  };
  const registrationLabelHandler = () => {
    setActiveEntryPageLabel("registration");
  };

  const [isNewUserRegistered, setNewUserRegistered] = useState<boolean>(false);
  const [isDataFullfield, setDataFullfield] = useState<boolean>(true);
  const [isUserExist, setUserExist] = useState<boolean>(false);
  const [isPasswordWrong, setPasswordWrong] = useState<boolean>(false);
  const [isUserNotFound, setUserNotFound] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username: string = e.target.value;
    setUsername(username);
  };

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email: string = e.target.value;
    setEmail(email);
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password: string = e.target.value;
    setPassword(password);
  };

  const [
    entryPageBackgroundClassName,
    setEntryPageBackgroundClassName,
  ] = useState<string>("entry-page-background");

  const setBackgroundClose = () => {
    setEntryPageBackgroundClassName(
      "entry-page-background entry-page-background-close"
    );
  };
  const registrationHandler = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
    email: string,
    username: string,
    password: string
  ) => {
    event.preventDefault();
    if (email && username && password) {
      users.forEach((user) => {
        if (user.username === username || user.email === email) {
          setUserExist(true);
          setTimeout(() => {
            setUserExist(false);
          }, 5000);
        } else {
          users.push(new User(uuidv4(), email, username, password, []));
          localStorage.setItem(
            "paxom4ik-news-app-users",
            JSON.stringify(users)
          );
          setDataFullfield(true);
          setUsername("");
          setEmail("");
          setPassword("");
          setNewUserRegistered(!isNewUserRegistered);
          loginLabelHandler();
          setTimeout(() => {
            setNewUserRegistered(false);
          }, 3000);
        }
      });
    } else {
      setDataFullfield(false);
    }
  };

  const login = (username: string, password: string) => {
    users.forEach((user) => {
      console.log(user);
      if (username && password) {
        if (user.username === username || user.email === username) {
          if (user.password === password) {
            localStorage.setItem("paxom4ik-news-app-isLogged", "true");
            setCurrentUser(user);
            setUserNotFound(false);
            setLoggedHandler();
          } else {
            setPasswordWrong(true);
            setTimeout(() => {
              setPasswordWrong(false);
            }, 4000);
          }
        } else {
          setUserNotFound(true);
          setTimeout(() => {
            setUserNotFound(false);
          }, 3000);
        }
      } else {
        setDataFullfield(false);
        setUserNotFound(false);
        setTimeout(() => {
          setDataFullfield(true);
        }, 4000);
      }
    });
  };

  const loginContent = (
    <>
      <Form>
        <InputGroup>
          <Label for="email">Введите ваше имя пользователя или E-mail</Label>
          <Input
            placeholder="Username or E-mail"
            id="email"
            value={username}
            onChange={(e) => usernameHandler(e)}
          />
        </InputGroup>
        <InputGroup>
          <Label for="password">Введите пароль</Label>
          <Input
            placeholder="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => passwordHandler(e)}
          />
        </InputGroup>
        <br />
        <InputGroup className="entry-btn">
          <Input
            className="entry-page-btn"
            type="submit"
            value="Войти"
            onClick={() => login(username, password)}
          />
        </InputGroup>
      </Form>
    </>
  );

  const registrationContent = (
    <>
      <Form>
        <InputGroup>
          <Label for="username">Ваше имя пользователя</Label>
          <Input
            placeholder="Username"
            id="username"
            value={username}
            onChange={(e) => usernameHandler(e)}
          />
        </InputGroup>
        <InputGroup>
          <Label for="email">Ваш E-mail</Label>
          <Input
            type="email"
            placeholder="E-mail"
            id="email"
            value={email}
            onChange={(e) => emailHandler(e)}
          />
        </InputGroup>
        <InputGroup>
          <Label for="password">Ваш пароль</Label>
          <Input
            placeholder="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => passwordHandler(e)}
          />
        </InputGroup>
        <br />
        <InputGroup className="entry-btn">
          <Input
            className="entry-page-btn"
            type="submit"
            value="Зарегистрироваться"
            onClick={(event) =>
              registrationHandler(event, email, username, password)
            }
          />
        </InputGroup>
      </Form>
    </>
  );
  return (
    <div className={entryPageBackgroundClassName}>
      <div className="entry-page-container">
        <div className="login-registration-field">
          <div className="login-registration-content">
            <div className="login-registration-header">
              <span
                className={loginLabelClass}
                onClick={() => loginLabelHandler()}
              >
                Войти
              </span>
              <span
                className={registrationLabelClass}
                onClick={() => registrationLabelHandler()}
              >
                Зарегистрироваться
              </span>
            </div>
            <div className="selected-entry-content">
              {activeEntryPageLabel === "login"
                ? loginContent
                : registrationContent}
              <div
                className="entry-as-guest-btn"
                onClick={() => {
                  setMenuOpen();
                  setBackgroundClose();
                  setTimeout(() => {
                    setGuestHandler();
                  }, 400);
                }}
              >
                или продолжить как гость
              </div>
              <br />
              {isUserNotFound ? (
                <Alert color="primary">
                  Пользователь с такими данными не найден
                </Alert>
              ) : (
                " "
              )}
              {isPasswordWrong ? (
                <Alert color="danger">
                  Пароль неверный. Попробуйте ещё раз
                </Alert>
              ) : (
                " "
              )}
              {isDataFullfield ? (
                " "
              ) : (
                <Alert color="danger">Заполните все поля формы</Alert>
              )}
              {isNewUserRegistered ? (
                <Alert color="success">
                  Вы успешно зарегистрированы! Войдите в свой аккаунт
                </Alert>
              ) : (
                ""
              )}
              {isUserExist ? (
                <Alert color="primary">
                  Такое имя пользователя или E-mail уже существует. Попробуйте
                  восстановить пароль, либо зарегистрируйтесь под другим
                  никнеймом
                </Alert>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
