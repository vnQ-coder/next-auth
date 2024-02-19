import CustomText from "../CustomText";

function getComponentName(url: string) {
  const pathSegments = url.split("/");
  const potentialComponentSegments = pathSegments.filter((segment) =>
    /^[a-zA-Z0-9]+$/.test(segment)
  );
  const componentName =
    potentialComponentSegments[potentialComponentSegments.length - 1];
  return componentName;
}

export default function Breadcrumb({ currentPath }: any) {
  return (
    <CustomText className="capitalize">
      {getComponentName(currentPath)}
    </CustomText>
  );
}
