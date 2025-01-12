import Head from "next/head";

import styles from "../styles/Home.module.css";

import Layout from "../components/Layout";

import { RightIcon } from "../components/Icons";
import { useState } from "react";
import { useRouter } from "next/router";
import PayComponent from "../components/PayComponent";

export default function Home() {
  const router = useRouter();

  const [upi, setUPI] = useState();
  const [name, setName] = useState();
  const [amountList, setAmountList] = useState([]);
  function handleList(el) {
    if (amountList.includes(Number(el))) {
      const newlist = amountList.filter((e) => e !== Number(el));
      setAmountList([...newlist]);
    }
    if ((amountList.length < 4) & !amountList.includes(Number(el))) {
      const amoutList = amountList.length === null ? true : false;
      if (amoutList) {
        setAmountList([el]);
      } else {
        const newList = [...amountList, el];
        const mapList = newList.map((el) => Number(el));
        const rightList = mapList.sort(function (a, b) {
          return a - b;
        });

        setAmountList(rightList);
      }
    }
  }
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Create a Donate Via UPI Button </title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <article className="container">
          <main className="main">
            <h1>Create a Donate Via UPI Button/Link !</h1>

            <div className="flex" style={{ gap: "50px" }}>
              <div>
                <form>
                  <div className="flex column">
                    <label>Name*</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="your name "
                    />
                  </div>
                  <div className="flex column">
                    <label>UPI ID*</label>
                    <input
                      value={upi}
                      onChange={(e) => setUPI(e.target.value)}
                      placeholder="your upi id"
                    />
                  </div>
                  <div className="flex column max">
                    <label>
                      Select four amounts that you would like to get receive
                      .(₹){" "}
                    </label>
                    <div
                      className="flex"
                      style={{ flexWrap: "wrap", gap: "10px" }}
                    >
                      {[
                        "10",
                        "20",
                        "50",
                        "100",
                        "150",
                        "200",
                        "500",
                        "750",
                        "1000",
                        "1500",
                        "2000",
                      ].map((el) => {
                        return (
                          <div
                            tabIndex="0"
                            value={el}
                            onClick={() => handleList(el)}
                            className="listItem"
                            style={{
                              padding: "10px 10px",
                              display: "flex",
                              flexWrap: "wrap",
                              maxHeight: "100px",
                              maxWidth: "120px",
                              width: "100px",
                              justifyContent: "space-between",
                              gap: "10px",
                              listStyle: "none",
                              border: amountList.includes(Number(el))
                                ? "1px solid green"
                                : "1px solid #eee",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                            key={el}
                          >
                            <span>{"₹ " + el}</span>
                            {amountList.includes(Number(el)) && <RightIcon />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </form>
                <a
                  href={
                    "/" +
                    upi +
                    "?pn=" +
                    name +
                    "&amount_list=" +
                    amountList.join()
                  }
                  target="_blank"
                  without
                  rel="noreferrer"
                >
                  <button>Preview</button>
                </a>
              </div>
              <div className="flex column max">
                <PayComponent pn={name} amount_list={amountList} upiid={upi} />
              </div>
            </div>
          </main>
        </article>
      </div>
    </Layout>
  );
}
