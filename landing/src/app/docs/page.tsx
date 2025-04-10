import Header from "../global/Header";
import Wrapper from "../global/Wrapper";
import ApiReference from "./components/ApiReference";
import GettingStarted from "./components/GettingStarted";
import InstallationSetup from "./components/InstallationSetup";
import UserManual from "./components/UserManual";

export default function Docs() {
  return (
    <Wrapper>
      <Header
        title="Documentation"
        description="Our documentation is designed to help you understand and utilize our projects effectively.
          Whether you're a beginner or an experienced user, you'll find valuable information and resources here."
      />

      <div>
        <GettingStarted />
        <InstallationSetup />
        <ApiReference />
        <UserManual />
      </div>
    </Wrapper>
  );
}
