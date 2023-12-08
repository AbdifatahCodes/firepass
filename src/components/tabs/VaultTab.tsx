// VaultTab.tsx
import "~styles/vault/vault-tab.css";
import { useNavigate } from 'react-router-dom';
import GenericItem from "~components/GenericItem";
import TabsHeader from "~components/TabsHeader";
import SectionsHeader from "~components/SectionsHeader";
import { TbWorldWww } from "react-icons/tb";
import { MdOutlineLaunch } from "react-icons/md";
import { FaUser, FaKey, FaImage, FaTrashAlt } from "react-icons/fa";
import { BsChevronDoubleRight } from "react-icons/bs";
import { GrNotes } from "react-icons/gr";

const VaultTab: React.FC = () => {
  let navigate = useNavigate();
  
  // Content for the Vault tab
  return (
    <div>
      <TabsHeader />
      <div className="content-body">
        <SectionsHeader title="Types" count={3} />
        <GenericItem
          title="Login"
          prefixComponents={[<TbWorldWww size={25} />]}
          suffixComponents={[<p>22</p>, <BsChevronDoubleRight size={23} />]}
          componentAction={() => {
            navigate("/logins");
          }}
        />
        <GenericItem
          title="Secure Note"
          prefixComponents={[<GrNotes size={25} />]}
          suffixComponents={[<p>22</p>, <BsChevronDoubleRight size={23} />]}
        />
        <GenericItem
          title="Secure Image"
          prefixComponents={[<FaImage size={25} />]}
          suffixComponents={[<p>22</p>, <BsChevronDoubleRight size={23} />]}
        />
        <SectionsHeader title="Others" count={1} />
        <GenericItem
          title="Trash"
          prefixComponents={[<FaTrashAlt size={25} />]}
          suffixComponents={[<p>22</p>, <BsChevronDoubleRight size={23} />]}
        />
        <GenericItem
          title="example.com"
          subtitle="example-email@email.com"
          prefixComponents={[<TbWorldWww size={25} />]}
          suffixComponents={[
            <MdOutlineLaunch size={28} className="action-icon" />, 
            <FaUser size={22} className="action-icon" />, 
            <FaKey size={22} className="action-icon" />
          ]}
        />
      </div>
    </div>
  );
};
  
export default VaultTab;