import moment from "moment";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("auth");
  return (
    <div className="p-3 text-sm">
      <strong className="text-primary">{t("app-name")}</strong> ©
      {moment().format("YYYY")} {t("rights-reserved")} -{" "}
      <a className="text-primary" href="/privacy-policy">
        {t("privacy-policy")}
      </a>
    </div>
  );
};

export default Footer;
