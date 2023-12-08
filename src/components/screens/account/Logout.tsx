import "~styles/layout.css";
import { useNavigate } from 'react-router-dom';
import { removeAuthCredentials } from "~services/authService";
import TabsHeader from "~components/TabsHeader";

const Logout = () => {
  let navigate = useNavigate();

  return (
    <div className="main">
      <TabsHeader isTitle={true} titleName="Logout" prefix="Close" prefixAction={() => {navigate(-1)}} />
      <div className="content">
        <button
          onClick={async () => {
            await removeAuthCredentials();
            navigate('/login');
          }}
        >Logout</button>
      </div>
    </div>
  );
}

export default Logout;