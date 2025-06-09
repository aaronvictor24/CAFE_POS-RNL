import Sidebar from "../../components/Sidebar";

interface MainLayoutProps {
  content: React.ReactNode;
}

const MainLayout = ({ content }: MainLayoutProps) => {
  return (
    <div className="container-fluid mt-3">
      <div className="row g-2">
        <div className="col-4 col-md-2">
          <Sidebar />
        </div>
        <div className="col-8 col-md-10">
          <div className="border bg-white p-3">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
