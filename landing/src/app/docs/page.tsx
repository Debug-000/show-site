import Wrapper from "../global/Wrapper";
import ApiReference from "./components/ApiReference";
import GettingStarted from "./components/GettingStarted";
import InstallationSetup from "./components/InstallationSetup";
import UserManual from "./components/UserManual";

export default function Docs() {
  return (
    <Wrapper>
      <div>
        <GettingStarted />
        <InstallationSetup />
        <ApiReference />
        <UserManual />
      </div>
    </Wrapper>
  );
}
