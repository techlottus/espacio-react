import React, { useEffect } from "react";
import "./ChatBot.scss";
const ChatBot = () => {
  // Utils
  const get = (selector, root = document) => {
    return root.querySelector(selector);
  };

  const formatDate = (date) => {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();

    return `${h.slice(-2)}:${m.slice(-2)}`;
  };

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

 
  const BOT_MSGS = [
    "Hola, como estas?",
    "Oh.. no te entiendo",
    "Me gusta jugar juegos... Pero no se como jugar.",
    "Perdon si mi respuesta no es relevante :))",
    "Tengo sueño! :(",
  ];

  // Icons made by Freepik from www.flaticon.com
  const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
  const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
  const BOT_NAME = "BOT";
  const PERSON_NAME = "Xabier";

  useEffect(() => {
    const msgerForm = get(".msger-inputarea");
    const msgerInput = get(".msger-input");
    msgerForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const msgText = msgerInput.value;
      if (!msgText) return;

      appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
      msgerInput.value = "";

      botResponse();
    });
  }, []);

  const appendMessage = (name, img, side, text) => {
    const msgerChat = get(".msger-chat");

    //   Simple solution for small apps
    const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
  };

  const botResponse = () => {
    const r = random(0, BOT_MSGS.length - 1);
    const msgText = BOT_MSGS[r];
    const delay = msgText.split(" ").length * 100;

    setTimeout(() => {
      appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
    }, delay);
  };

  return (
    <div className="chatbot-body">
      <section className="msger">
        <header className="msger-header">
          <div className="msger-header-title">
            <i className="fas fa-comment-alt"></i> ChatBot
          </div>
          <div className="msger-header-options">
            <span>
              <i className="fas fa-cog"></i>
            </span>
          </div>
        </header>

        <main className="msger-chat">
          <div className="msg left-msg">
            <div
              className="msg-img"
              style={{
                backgroundImage:
                  "url(https://image.flaticon.com/icons/svg/327/327779.svg)",
              }}
            ></div>

            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">BOT</div>
                <div className="msg-info-time">{formatDate(new Date())}</div>
              </div>

              <div className="msg-text">
                ¡Hola! ¿bienvenido, en que te puedo ayudar? 😄
              </div>
            </div>
          </div>

          <div className="msg right-msg">

          </div>
        </main>

        <form className="msger-inputarea">
          <input
            type="text"
            className="msger-input"
            placeholder="Escribe tu mensaje..."
          />
          <button type="submit" className="msger-send-btn">
            Enviar
          </button>
        </form>
      </section>
    </div>
  );
};

export default ChatBot;
