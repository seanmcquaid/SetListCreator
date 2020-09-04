import React, { useState, useEffect, useRef } from "react";
import { tokenConfig } from "actions/authActions/authActions";
import axios from "axios";
import { apiHost } from "config";
import Text from "components/Text/Text";
import SongList from "components/SongList/SongList";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import styles from "./FinalizedSetListPage.module.css";

const FinalizedSetListPage = () => {
  const isMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [setListInfo, setSetListInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isMounted.current) {
      const source = axios.CancelToken.source();

      const config = tokenConfig();
      config.cancelToken = source.token;

      axios
        .get(`${apiHost}/client/getCompletedSetList`, config)
        .then((response) => {
          const timer = setTimeout(() => {
            setSetListInfo(response.data);
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
  }, []);

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  return (
    <div className={styles.finalizedSetListPageContainer}>
      <Text headerText={true}>Final Set List</Text>
      {errorMessage.length > 0 ? (
        <Text>{errorMessage}</Text>
      ) : (
        <SongList list={setListInfo.suggestedSetList} />
      )}
    </div>
  );
};

export default FinalizedSetListPage;
