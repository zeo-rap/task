import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    supportedLngs: ["cn", "pt"],
    fallbackLng: "cn",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      cn: {
        translation: {
          phone_title: "电话号码",
          phone_place: "电话号码",
          verify_title: "输入验证码",
          verify_place: "验证码",
          verify_send: "发送",
          login: "登录",
        },
      },
      pt: {
        translation: {
          phone_title: "Número de telefone",
          phone_place: "Número de telefone",
          verify_title: "Insira o código de verificação",
          verify_place: "Código de verificação",
          verify_send: "Enviar",
          login: "Conecte-se",
        },
      },
    },
  });

export default i18n;
