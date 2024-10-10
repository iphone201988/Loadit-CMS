import DriverDocuments from "@/components/Driver/DriverDocuments";

const DocumentsDetails = ({ params }: { params: { id: string } }) => {
  const userId = params?.id;
  return (
    <>
      <div className="m-5 font-bold text-4xl">Documents Details</div>
      <div className="flex justify-center items-center  mx-5">
        <DriverDocuments url={`admin/getDocumentsById/${userId}`} type={2}/>
      </div>
    </>
  );
};

export default DocumentsDetails;
