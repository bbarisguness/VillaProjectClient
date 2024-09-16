"use client";
import VillaCard from "@/components/index/villa/card/villaCard";
import { useEffect, useState } from "react";
import Seo from "@/components/seo";
const qs = require("qs");

export default function List() {
  const [villas, setVillas] = useState([]);
  const [activeListItemIndex, setActiveIndex] = useState(0);

  const changeIndex = (operation) => {
    if (operation == "+") {
      setActiveIndex(activeListItemIndex + 1);
    } else {
      setActiveIndex(activeListItemIndex - 1);
    }
  };

  const query = qs.stringify(
    {
      filters: {
        isApart: {
          $eq: true,
        },
      },
      populate: {
        distance_rulers: {
          fields: ["name", "value"],
        },
        gallery: {
          populate: {
            image: {
              //populate: "*"
              //fields: ["url"],
              populate: {
                formats: {
                  populate: ["small", "thumbnail", "medium"],
                },
              },
              sort: ["name:asc"],
            },
          },
        },
        region: {
          fields: ["name"],
        },
        price_tables: {
          sort: ["line:asc"],
          fields: [
            "title",
            "description",
            "price",
            "firstTime",
            "lastTime",
            "line",
          ],
          populate: {
            price_type: {
              fields: ["slug"],
            },
          },
        },
      },

      //populate: ["gallery.image", "price_tables.price_type", "region", "localizations"]
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  // useEffect(() => {
  //   fetch(`http://3.127.136.179:1337/api/villas?${query}`)
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         setVillas(result.data);
  //         //console.log(result.data);
  //       },
  //       (error) => {}
  //     );
  // }, []);

  // useEffect(() => {
  //   console.log("Sayfa sırası: " + (activeListItemIndex + 1));
  // }, [activeListItemIndex]);

  return (
    <>
      <Seo
        pageTitle={"Kiralık Apartlar"}
        pageDesc={"Labirent Fethiye Kiralık Apartlar"}
      />
      <section className="listPage_contentDetail listPage_villasDetail">
        <div className="villas">
          <div className="listPage_container">
            <div className="box">
              <div className="top">
                <div className="titleBox">
                  <div className="title">Tüm Apartlar</div>
                  <div className="subTitle">
                    Toplam {villas.length} adet apart listelendi.
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="row">
                  <ul>
                    {villas.map((villa, index) => (
                      <VillaCard key={index} data={villa} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="listItemsContainer">
                <div className="listItemsContainer_box">
                    <div onClick={() => changeIndex("-")}>sol</div>
                    <ul>
                        <li onClick={() => setActiveIndex(0)} className={activeListItemIndex == 0 ? "listItemActive" : null}>
                            1
                        </li>
                        <li onClick={() => setActiveIndex(1)} className={activeListItemIndex == 1 ? "listItemActive" : null}>
                            2
                        </li>
                        <li onClick={() => setActiveIndex(2)} className={activeListItemIndex == 2 ? "listItemActive" : null}>
                            3
                        </li>
                        <li onClick={() => setActiveIndex(3)} className={activeListItemIndex == 3 ? "listItemActive" : null}>
                            4
                        </li>
                        <li>
                            ...
                        </li>
                        <li>
                            10
                        </li>
                    </ul>
                    <div onClick={() => changeIndex("+")}>sag</div>
                </div>
            </div> */}
    </>
  );
}
