import Form from "./Form";
import { useTranslations } from "next-intl";
import LeftContent from "../shared/LeftContent";
import Layout from "../layout";
import RightContent from "../shared/RightBar";
import RedirectButton from "../shared/RedirectButton";

type LoginProps = {
  params: {
    params: { locale: string };
  };
};

const Login = ({ params }: LoginProps) => {
  const t = useTranslations("auth");
  return (
    <Layout
      RightContent={
        <RightContent
          title={t("welcome")}
          loginSubTitle1={t("description1")}
          loginSubTitle2={t("description2")}
          loginSubTitle3={t("description3")}
          description={t("description")}
        />
      }
    >
      <LeftContent title={t("login")} description={t("welcome")} />
      <Form locale={params?.params?.locale} />
      <RedirectButton href={`forgotPassword`} text="forgot-password?" />
    </Layout>
  );
};

export default Login;

// "use client";

// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Typography,
//   Input,
//   Checkbox,
//   Button,
// } from "@material-tailwind/react";

// // Reusable component for the card header
// function LoginCardHeader() {
//   return (
//     <CardHeader
//       placeholder={undefined}
//       variant="gradient"
//       color="gray"
//       className="mb-4 grid h-28 place-items-center"
//     >
//       <Typography variant="h3" color="white" placeholder={undefined}>
//         Sign In
//       </Typography>
//     </CardHeader>
//   );
// }

// // Reusable component for the card body
// function LoginCardBody() {
//   return (
//     <CardBody className="flex flex-col gap-4" placeholder={undefined}>
//       <Input label="Email" size="lg" placeholder={""} crossOrigin={""} />
//       <Input
//         label="Password"
//         size="lg"
//         type={"password"}
//         placeholder={undefined}
//         crossOrigin={undefined}
//       />
//       <div className="-ml-2.5">
//         <Checkbox
//           label="Remember Me"
//           placeholder={undefined}
//           crossOrigin={undefined}
//         />
//       </div>
//     </CardBody>
//   );
// }

// // Reusable component for the card footer
// function LoginCardFooter() {
//   return (
//     <CardFooter className="pt-0" placeholder={undefined}>
//       <Button variant="gradient" fullWidth placeholder={undefined}>
//         Sign In
//       </Button>
//       <Typography
//         variant="small"
//         className="mt-6 flex justify-center"
//         placeholder={undefined}
//       >
//         Don&apos;t have an account?
//         <Typography
//           as="a"
//           href="#signup"
//           variant="small"
//           color="blue-gray"
//           className="ml-1 font-bold"
//           placeholder={undefined}
//         >
//           Sign up
//         </Typography>
//       </Typography>
//     </CardFooter>
//   );
// }

// // Reusable component for the login card
// export default function Login() {
//   return (
//     <div className="flex h-screen w-full justify-center items-center">
//       <form action="">
//         <Card className="w-96" placeholder={undefined}>
//           <LoginCardHeader />
//           <LoginCardBody />
//           <LoginCardFooter />
//         </Card>
//       </form>
//     </div>
//   );
// }
