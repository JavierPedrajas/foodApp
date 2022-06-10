/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import SpanishMessages from "langs/es.json";
import EnglishMessages from "langs/en.json";
import { getUserDoc } from "lib/services";

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

  const SuppressTranslationErrors = true;

  return (
    <Context.Provider value={{ locale: localeState, selectLanguage }}>
      <IntlProvider
        locale={localeState}
        messages={messages}
        onError={(e) => {
          if (!SuppressTranslationErrors) {
            console.warn(e);
          }
        }}
      >
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
};

export default LangContextWrapper;
