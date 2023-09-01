import React, { useContext, useEffect, useState } from "react";
import styles from "./Admin.module.css";
import logo from "../Components/Assets/protax-solutions-logo-cropped.jpg";
import { useNavigate } from "react-router-dom";
import ConfirmAdmin from "../Components/ConfirmAdmin";
import { AuthContext } from "../Context/AuthContextProvider";
let Admin = () => {
  let { showQueryData, setShowQueryData } = useContext(AuthContext);
  let [queryData, setQueryData] = useState([]);
  let [filteredData, setFilteredData] = useState({});
  let navigate = useNavigate();
  let [totalDataLength, setTotalDataLength] = useState(0);
  let [resolvedDataLength, setResolvedDataLength] = useState(0);
  let [notResolvedDataLength, setNotResolvedDataLength] = useState(0);
  let [showConfirmDeleteDiv, setShowConfirmDeleteDiv] = useState(false);
  let [confirmDeleteDivPersonName, setConfirmDeleteDivPersonName] =
    useState("");
  let [deletePersonData, setDeletePersonData] = useState({});
  useEffect(() => {
    let storedData = localStorage.getItem("pprotaxSolution");
    if (storedData) {
      let { authenticated, expiry } = JSON.parse(storedData);
      let currentTime = new Date().getTime();
      if (authenticated && currentTime < expiry) {
        setShowQueryData(true);
      } else {
        localStorage.removeItem("pprotaxSolution");
        setShowQueryData(false);
      }
    }
  }, []);
  let fetchData = () => {
    fetch(
      "https://protax-solutions-query-d-39931-default-rtdb.firebaseio.com/data.json"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let filteredData = Object.entries(data).filter(
          ([itemId, item]) => item !== "dummy"
        );
        setQueryData(Object.fromEntries(filteredData));
        setTotalDataLength(filteredData.length);
        setResolvedDataLength(
          filteredData.filter(([, item]) => item.resolved_status).length
        );
        setNotResolvedDataLength(
          filteredData.filter(([, item]) => !item.resolved_status).length
        );
        setFilteredData({});
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(()=>{
    fetchData();
  },[]);
  useEffect(() => {
    let intervalId = setInterval(() => {
      fetchData();
    }, 15 * 60 * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  let sortData = (order) => {
    let sortedData = Object.entries(queryData).sort(
      (a, b) =>
        new Date(a[1].date_DAY_MM_DD_YY + " " + a[1].time_HH_MM_SS) -
        new Date(b[1].date_DAY_MM_DD_YY + " " + b[1].time_HH_MM_SS)
    );

    if (order === "oldest") {
      sortedData.reverse();
    }

    setQueryData(Object.fromEntries(sortedData));
    setFilteredData(Object.fromEntries(sortedData));
  };
  let filterResolved = (resolvedStatus) => {
    if (resolvedStatus === "all") {
      setFilteredData(queryData);
    } else {
      let filtered = Object.entries(queryData).filter(
        ([itemId, item]) => item.resolved_status === resolvedStatus
      );
      setFilteredData(Object.fromEntries(filtered));
    }
  };
  let statusHandler = async (itemId) => {
    if (queryData[itemId]) {
      try {
        let updatedStatus = !queryData[itemId].resolved_status;
        await fetch(
          `https://protax-solutions-query-d-39931-default-rtdb.firebaseio.com/data/${itemId}.json`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ resolved_status: updatedStatus }),
          }
        );
        setQueryData((prevData) => ({
          ...prevData,
          [itemId]: { ...prevData[itemId], resolved_status: updatedStatus },
        }));
        if (updatedStatus) {
          setResolvedDataLength((prevLength) => prevLength + 1);
          setNotResolvedDataLength((prevLength) => prevLength - 1);
        } else {
          setResolvedDataLength((prevLength) => prevLength - 1);
          setNotResolvedDataLength((prevLength) => prevLength + 1);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  let personDeleteHandler = (itemId) => {
    setDeletePersonData(itemId);
    setShowConfirmDeleteDiv(true);
    setConfirmDeleteDivPersonName(queryData[itemId].name);
  };
  let confirmDeleteHandler = () => {
    fetch(
      `https://protax-solutions-query-d-39931-default-rtdb.firebaseio.com/data/${deletePersonData}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(() => {
        setShowConfirmDeleteDiv(false);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {!showQueryData ? (
        <ConfirmAdmin />
      ) : (
        <React.Fragment>
          <div className={styles.navbar}>
            <img
              className={styles.logoImage}
              src={logo}
              onClick={() => navigate("/")}
            />
          </div>
          <div className={styles.optionsDiv}>
            <button
              className={styles.option}
              onClick={() => filterResolved("all")}
            >
              All
            </button>
            <button
              className={styles.option}
              onClick={() => sortData("oldest")}
            >
              Newest
            </button>
            <button
              className={styles.option}
              onClick={() => sortData("newest")}
            >
              Oldest
            </button>
            <button
              className={styles.option}
              onClick={() => filterResolved(true)}
            >
              Resolved
            </button>
            <button
              className={styles.option}
              onClick={() => filterResolved(false)}
            >
              Pending
            </button>
          </div>
          <div className={styles.lengthDiv}>
            <p className={styles.lengthText}>
              Total Queries :{" "}
              <span className={styles.lengthDigitText}>{totalDataLength}</span>
            </p>
            <p className={styles.lengthText}>
              Resolved Queries :{" "}
              <span className={styles.lengthDigitText}>
                {resolvedDataLength}
              </span>
            </p>
            <p className={styles.lengthText}>
              Pending Queries :{" "}
              <span className={styles.lengthDigitText}>
                {notResolvedDataLength}
              </span>
            </p>
          </div>
          <div className={styles.main}>
            {Object.keys(filteredData).length === 0 ? (
              <p className={styles.emptyDataText}>
                Click on any button to see results
              </p>
            ) : (
              Object.keys(filteredData).map((item) => {
                return (
                  <div
                    className={
                      queryData[item].resolved_status
                        ? styles.resolvedSingleQueryDiv
                        : styles.notResolvedSingleQueryDiv
                    }
                    key={item}
                  >
                    <div className={styles.queryTextDiv}>
                      <p className={styles.queryFieldsText}>Person Name :</p>
                      <p className={styles.queryDetailsText}>
                        {queryData[item].name}
                      </p>
                    </div>
                    <div className={styles.queryTextDiv}>
                      <p className={styles.queryFieldsText}>Mobile Number :</p>
                      <p className={styles.queryDetailsText}>
                        {queryData[item].mobile_number}
                      </p>
                    </div>
                    <div className={styles.queryTextDiv}>
                      <p className={styles.queryFieldsText}>Person Email :</p>
                      <p className={styles.queryDetailsText}>
                        {queryData[item].email}
                      </p>
                    </div>
                    <div className={styles.queryTextDiv}>
                      <p className={styles.queryFieldsText}>Person Query :</p>
                      <p className={styles.queryText}>
                        {queryData[item].query}
                      </p>
                    </div>
                    <div className={styles.queryTextDiv}>
                      <p className={styles.queryFieldsText}>
                        Submission Date :
                      </p>
                      <p className={styles.queryDetailsText}>
                        {queryData[item].date_DAY_MM_DD_YY}
                      </p>
                    </div>
                    <div className={styles.queryTextDiv}>
                      <p className={styles.queryFieldsText}>
                        Submission Time :
                      </p>
                      <p className={styles.queryDetailsText}>
                        {queryData[item].time_HH_MM_SS}
                      </p>
                    </div>
                    <div className={styles.queryTextDiv}>
                      <p className={styles.queryFieldsText}>Status :</p>
                      <p
                        className={styles.queryDetailsText}
                        style={
                          queryData[item].resolved_status
                            ? { color: "green" }
                            : { color: "rgb(224, 1, 1)" }
                        }
                      >
                        {queryData[item].resolved_status
                          ? "Resolved"
                          : "Not Resolved"}
                      </p>
                      <button
                        className={styles.reslovedButton}
                        onClick={() => statusHandler(item)}
                        style={
                          queryData[item].resolved_status
                            ? {
                                color: "rgb(197, 3, 3)",
                                border: "1px solid rgb(197, 3, 3)",
                              }
                            : { color: "green", border: "1px solid green" }
                        }
                      >
                        Change to{" "}
                        {queryData[item].resolved_status
                          ? "Not Resolved"
                          : "Resloved"}
                      </button>
                    </div>
                    <div
                      className={
                        queryData[item].resolved_status
                          ? styles.bottomSectionDivForDeleteButton
                          : styles.bottomSectionDiv
                      }
                    >
                      {!queryData[item].resolved_status ? (
                        <a
                          className={styles.responseText}
                          href={`mailto:${queryData[item].email}`}
                          target="_blank"
                        >
                          Respond Now
                        </a>
                      ) : null}
                      <button
                        className={styles.deleteButton}
                        onClick={() => personDeleteHandler(item)}
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {showConfirmDeleteDiv ? (
            <div className={styles.confirmDeleteDiv}>
              <div className={styles.mainConfirmDeleteDiv}>
                <div className={styles.topSectionDiv}>
                  <p className={styles.confirmDeleteHeading}>
                    Confirm Your Request
                  </p>
                  <p
                    className={styles.crossSymbol}
                    onClick={() => setShowConfirmDeleteDiv(false)}
                  >
                    ✖
                  </p>
                </div>
                <p className={styles.confirmPara}>
                  Are you sure you want to Delete{" "}"
                  <span className={styles.deletedPersonName}>
                    {confirmDeleteDivPersonName} 's
                  </span>{" "}
                  " query ? This record will be Deleted permanently.
                </p>
                <div className={styles.deleteButtonDiv}>
                  <button
                    className={styles.yesConfirmDeleteButton}
                    onClick={confirmDeleteHandler}
                  >
                    Yes
                  </button>
                  <button
                    className={styles.noConfirmDeleteButton}
                    onClick={() => setShowConfirmDeleteDiv(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </React.Fragment>
      )}
    </>
  );
};
export default Admin;
