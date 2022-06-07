import React, { useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import SpanishMessages from "Langs/es.json";
import EnglishMessages from "Langs/en.json";
import { getUserDoc } from "Utils/Services";

const locale = navigator.language;
let langMessages = EnglishMessages;

if (locale === "es-ES") {
  langMessages = SpanishMessages;
}

export type LangType = "es-ES" | "en-US";

export const Context = React.createContext({
  locale,
  selectLanguage: (lang: LangType) => {},
});

const LangContextWrapper: React.FC<{ loginStatus: string }> = (props) => {
  const { loginStatus } = props;
  const [localeState, setLocaleState] = useState<LangType>(locale as LangType);
  const [messages, setMessages] = useState(langMessages);

  const getUserLang = async () => {
    const currentUser = await getUserDoc();
    if (currentUser) {
      selectLanguage(currentUser.config.language);
    }
  };

  useEffect(() => {
    getUserLang();
  }, [loginStatus]);

  const selectLanguage = (lang: LangType) => {
    setLocaleState(lang);
    if (lang === "en-US") {
      setMessages(EnglishMessages);
    } else if (lang === "es-ES") {
      setMessages(SpanishMessages);
    }
  };

  return (
    <Context.Provider value={{ locale: localeState, selectLanguage }}>
      <IntlProvider locale={localeState} messages={messages}>
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
};

export default LangContextWrapper;
