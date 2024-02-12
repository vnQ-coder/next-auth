import { useTranslations } from "next-intl";
import LeftContent from "../shared/LeftContent";
import Layout from "../layout";
import RightContent from "../shared/RightBar";
import Form from "./Form";
import RedirectButton from "../shared/RedirectButton";

const ForgotPassword = () => {
  const t = useTranslations("auth");
  return (
    <Layout
      RightContent={
        <RightContent
          title1={t("forget-description-h1")}
          title2={t("forget-description-h2")}
          description={t("forget-description2-h2")}
          loginSubTitle={t("forget-description1-h1")}
        />
      }
    >
      <LeftContent
        title={t("forgot-password") + "!"}
        description={t("forgot-password-desc")}
      />
      <Form />
      <RedirectButton href={`login`} text="loginButton" />
    </Layout>
  );
};

export default ForgotPassword;
