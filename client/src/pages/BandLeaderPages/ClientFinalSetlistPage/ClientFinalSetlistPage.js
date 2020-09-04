import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { apiHost } from "config";
import { tokenConfig } from "actions/authActions/authActions";
import SongList from "components/SongList/SongList";
import Text from "components/Text/Text";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import styles from "./ClientFinalSetListPage.module.css";

const ClientFinalSetListPage = (props) => {
  const { clientId } = props.match.params;

  const isMounted = useRef(true);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [clientName, setClientName] = useState("");
  const [suggestedSetList, setSuggestedSetList] = useState([]);

  useEffect(() => {
    if (isMounted.current) {
      const source = axios.CancelToken.source();

      const config = tokenConfig();
      config.cancelToken = source.token;

      axios
        .get(`${apiHost}/bandleader/getClientSetListInfo/${clientId}`, config)
        .then((response) => {
          const timer = setTimeout(() => {
            setClientName(response.data.clientName);
            setSuggestedSetList(response.data.suggestedSetList);
            setIsLoading(false);
            source.cancel();
          }, 1500);
          return () => clearTimeout(timer);
        })
        .catch((err) => {
          const timer = setTimeout(() => {
            setErrorMessage(err.response.data.errorMessage);
            setIsLoading(false);
            source.cancel();
          }, 1500);
          return () => clearTimeout(timer);
        });
    }

    return () => {
      isMounted.current = false;
    };
  }, [clientId]);

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  return (
    <div className={styles.clientFinalSetListPageContainer}>
      <Text headerText={true}>Final Set List For {clientName}</Text>
      <Text>{errorMessage}</Text>
      <SongList list={suggestedSetList} />
    </div>
  );
};

export default ClientFinalSetListPage;
