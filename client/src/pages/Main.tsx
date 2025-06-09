import Dashboard from "../components/Dashboard";
import MainLayout from "./layout/MainLayout";

const content = (
  <>
    <Dashboard />
  </>
);

const Main = () => {
  return <MainLayout content={content} />;
};

export default Main;
