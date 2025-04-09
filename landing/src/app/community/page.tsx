import Wrapper from "../global/Wrapper";
import ContributinGuide from "./components/ContributionGuide";
import Discussions from "./components/Discussions";

export default function Community() {
  return (
    <Wrapper>
      <div>
        <ContributinGuide />
        <Discussions />
      </div>
    </Wrapper>
  );
}
