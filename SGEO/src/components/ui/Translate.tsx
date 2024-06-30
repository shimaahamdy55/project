import React from "react";
import locale from "../../locale";

type TranslateProps = {
    text: string;
}

const Translate: React.FC<TranslateProps> = ({ text }) => {
    const lang = sessionStorage.getItem('lang') || 'en';
    return (
        <>{locale[lang]?.[text] || text }</>
    );
}

export default Translate;