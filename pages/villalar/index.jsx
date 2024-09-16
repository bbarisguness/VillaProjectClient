import VillaCard from "@/components/index/villa/card/villaCard";
import { useState } from "react";
import "@/styles/styles.css";
import Seo from "@/components/seo";
import { getVillas } from "@/services/villa";
import Pagination from "@/components/pagination/Pagination";
import { useEffect } from "react";
import { useRouter } from "next/router";


export default function List({ villas, totalPage }) {
  const router = useRouter();
  const activePage = parseInt(router?.query?.p) || 1

  return (
    <>
      <Seo
        pageTitle={"Kiralık Villalar"}
        pageDesc={"Labirent Fethiye Villalar"}
      />
      <section className="listPage_contentDetail listPage_villasDetail">
        <div className="villas">
          <div className="listPage_container">
            <div className="box">
              <div className="top">
                <div className="titleBox">
                  <div className="title">Kiralık Villalar</div>
                  <div className="subTitle">
                    Toplam {villas?.meta?.pagination?.total} adet tesis bulunmaktadır.
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="row">
                  <ul>
                    {villas?.data.map((villa, index) => (
                      <VillaCard listPage={true} key={index} data={villa} photos={villa.attributes.photos.data} />
                    ))}
                  </ul>
                </div>
              </div>
              <Pagination
                //setNewActivePage={setNewActivePage}
                newActivePage={activePage}
                pageCount={totalPage}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const villas = await getVillas(12, parseInt(query.p) || 1);
  const totalPage = villas?.meta?.pagination?.pageCount;
  return { props: { villas, totalPage } };
}
