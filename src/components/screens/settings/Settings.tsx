import "~styles/settings/style.css"
import { useNavigate } from 'react-router-dom';
import TabsHeader from "~components/TabsHeader";
import GenericItem from "~components/GenericItem";
import { BsChevronDoubleRight } from "react-icons/bs";

export const Settings = () => {
  let navigate = useNavigate();

  return (
    <div>
      <TabsHeader isTitle={true} titleName="Settings" prefix="Close" suffix="Edit" />
      <div className="content-body">
      <GenericItem
          title="Logout"
          suffixComponents={[<BsChevronDoubleRight size={23} />]}
          componentAction={() => {
            navigate("/logout");
          }}
        />
      </div>
    </div>
  );
};
