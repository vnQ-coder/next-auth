import moment from "moment";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("auth");
  return (
    <div className="absolute text-sm w-full bottom-0 left-0 p-3">
      <div className="text-center text-secondary">
        <strong className="text-fontPrimary">{t("app-name")}</strong> ©
        {moment().format("YYYY")} {t("rights-reserved")} -{" "}
        <a className="text-fontPrimary" href="/privacy-policy">
          {t("privacy-policy")}
        </a>
      </div>
    </div>
  );
};

export default Footer;
