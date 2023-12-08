import "~styles/layout.css";
import { useNavigate } from 'react-router-dom';
import GenericItem from "~components/GenericItem";
import TabsHeader from "~components/TabsHeader";
import SectionsHeader from "~components/SectionsHeader";
import { TbWorldWww } from "react-icons/tb";
import { MdOutlineLaunch } from "react-icons/md";
import { FaUser, FaKey, } from "react-icons/fa";
import { useLazyQuery, gql } from '@apollo/client';
import { getAuthToken, getUserId } from "~services/authService";
import { useEffect, useState } from "react";

const GET_ALL_USER_LOGINS = gql`
  query GetAllLoginItems($token: String!, $uuid: String!) {
    getAllLoginItems(token: $token, uuid: $uuid) {
      uid
      uuid
      uri
      domain
      username
      notes
      password
      movedToTrash
      creationDate
      revisionDate
      lastUsed
    }
  }
`;

function Logins() {
  let navigate = useNavigate();
  const [loginItemsCount, setLoginItemsCount] = useState(0); // State to store the count

  const LoginItems = () => {
    const [loadLoginItems, { called, loading, error, data }] = useLazyQuery(GET_ALL_USER_LOGINS);

    useEffect(() => {
      const fetchAuthDetails = async () => {
        const token = await getAuthToken();
        const uuid = await getUserId();
        if (token && uuid) {
          loadLoginItems({ variables: { token, uuid } });
        }
      };

      fetchAuthDetails();
    }, []);

    if (!called || loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || !data.getAllLoginItems) return <p>No data found.</p>;

    setLoginItemsCount(data.getAllLoginItems.length);

    return data.getAllLoginItems.map((item) => (
      <GenericItem
        key={item.uid} // Make sure to provide a unique key
        title={item.domain}
        subtitle={item.username}
        prefixComponents={[<TbWorldWww size={25} />]}
        suffixComponents={[
          <MdOutlineLaunch size={28} className="action-icon" />, 
          <FaUser size={22} className="action-icon" />, 
          <FaKey size={22} className="action-icon" />
        ]}
        componentAction={() => {
          navigate('/view-login-item', { state: { loginItemData: item } });
        }}
      />
    ));
  }

  return (
      <div className="main">
        <TabsHeader prefix="back" prefixAction={() => {navigate(-1)}} />
        <div className="content">
          <SectionsHeader title="Logins" count={loginItemsCount} />
          <LoginItems />
        </div>
      </div>
  )
}

export default Logins
