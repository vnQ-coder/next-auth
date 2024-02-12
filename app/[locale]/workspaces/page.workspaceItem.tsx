import { WorkspaceProps } from "@/types/workspace";
import Image from "next/image";

const Workspace: React.FC<{ data: WorkspaceProps }> = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 cursor-pointer">
      <div className="flex flex-start items-center">
        <Image
          className="rounded-full object-cover"
          src={data.iconUrl || "/images/AuthLogo.svg"}
          alt="Icon"
          width={64}
          height={64}
        />
        <div className="text-xl font-bold ml-2">{data.name}</div>
      </div>
      <div className="flex justify-between mt-2">
        <div>
          <p className="text-gray-500">Products Count: {data.productsCount}</p>
          <p className="text-gray-500">Orders Count: {data.ordersCount}</p>
        </div>
      </div>
      <hr className="my-4" />
      <h3 className="text-lg font-bold mb-2">Members:</h3>
      <ul className="list-disc pl-6">
        {data.members.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Workspace;
