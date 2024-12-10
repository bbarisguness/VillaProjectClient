import Slider from "@/components/index/slider/slider";
import TreeStep from "@/components/index/treestep/treestep";
import Villa from "@/components/index/villa/villa";
import Activates from "@/components/index/aktiviteler/activate";
// import Regions from "@/components/index/region/region";
import Apart from "@/components/index/apart/apart";
import Service from "@/components/index/service/service";
import Blog from "@/components/index/blog/blog";
import VillaRent from "@/components/index/villaRentInfo/villaRentInfo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

//const Slider = lazy(() => import('@/components/index/slider/slider'));
//const TreeStep = lazy(() => import("@/components/index/treestep/treestep"));
//const Villa = lazy(() => import("@/components/index/villa/villa"));
//const Regions = lazy(() => import("@/components/index/region/region"));
//const Activates = lazy(() => import("@/components/index/aktiviteler/activate"));
//const Apart = lazy(() => import("@/components/index/apart/apart"));
//const Service = lazy(() => import("@/components/index/service/service"));
//const Blog = lazy(() => import("@/components/index/blog/blog"));
//const VillaRent = lazy(() => import("@/components/index/villaRentInfo/villaRentInfo"));

import { getVillasHome, getHotels } from "@/services/villa";
import { getCategoriesHome } from "@/services/category";
import Seo from "@/components/seo";
//import { getRegions } from "@/services/region";
import { getBlogs } from "@/services/blog";
//import { lazy, Suspense } from "react";
import { getActivates } from "@/services/activite";

export default function Home({
  villa,
  categories,
  regions,
  blogs,
  newVillas,
  testimonials,
  aparts,
  activates,
}) {
  return (
    <>
      <Seo
        pageTitle={"Labirent Fethiye"}
        pageDesc={"Labirent Fethiye Villalar"}
      />

      <Slider />
      <section id="contentContainer">
        <TreeStep />
        <Villa category={categories} villas={villa} />
        {/* <Regions homePage={true} regions={regions} /> */}
        <Activates homePage={true} activates={activates} />
        <Apart aparts={aparts} />
        <Service />
        {/* <NewVillas villas={newVillas} /> */}
        {/* <Testimonial testimonials={testimonials} /> */}
        <Blog blog={blogs} />
        <VillaRent />
      </section>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  // API çağrılarını paralel olarak başlat
  const categories = await getCategoriesHome(locale);

  const [villa, aparts, activates, blogs] = await Promise.all([
    getVillasHome(8, 0, categories?.data[0]?.id),
    getHotels(0, 4),
    getActivates(locale),
    getBlogs(locale),
  ]);

  return {
    props: {
      villa,
      categories,
      blogs,
      aparts,
      activates,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
