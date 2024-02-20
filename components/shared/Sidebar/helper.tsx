import {
  FaNetworkWired,
  FaUsers,
  FaUser,
  FaEnvelope,
  FaMessage,
  FaImage,
} from "react-icons/fa6";

export const getSidebarItem = (locale: any) => {
  return [
    {
      id: 1,
      icon: (className = "h-5 w-5 text-primary"): any => {
        return <FaNetworkWired className={className} />;
      },
      text: "Workspaces",
      path: `/${locale}/workspaces`,
      active: false,
    },
    {
      id: 2,
      icon: (className = "h-5 w-5 text-primary"): any => {
        return <FaUser className={className} />;
      },
      text: "Users",
      path: `/${locale}/users`,
      active: false,
    },
    {
      id: 3,
      icon: (className = "h-5 w-5 text-primary"): any => {
        return <FaUsers className={className} />;
      },
      text: "Admins",
      path: `/${locale}/admins`,
      active: false,
    },
    {
      id: 4,
      icon: (className = "h-5 w-5 text-primary"): any => {
        return <FaEnvelope className={className} />;
      },
      text: "Emails",
      path: `/${locale}/emails`,
      active: false,
    },
    {
      id: 5,
      icon: (className = "h-5 w-5 text-primary"): any => {
        return <FaMessage className={className} />;
      },
      text: "Descriptions",
      path: `/${locale}/descriptions`,
      active: false,
    },
    {
      id: 6,
      icon: (className = "h-5 w-5 text-primary"): any => {
        return <FaImage className={className} />;
      },
      text: "Designs",
      path: `/${locale}/designs`,
      active: false,
    },
  ];
};
