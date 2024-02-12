import LoadingSpinner from "../../../components/shared/Spinner";

export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-1 text-fontSecondary">Please Wait...</div>
        <LoadingSpinner wrapperClass="text-fontSecondary" />
      </div>
    </div>
  );
}
