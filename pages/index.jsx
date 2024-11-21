import Slider from "@/components/index/slider/slider";
// import TreeStep from "@/components/index/treestep/treestep";
// import Villa from "@/components/index/villa/villa";
// import Regions from "@/components/index/region/region";
// import Apart from "@/components/index/apart/apart";
// import Service from "@/components/index/service/service";
// import Blog from "@/components/index/blog/blog";
// import VillaRent from "@/components/index/villaRentInfo/villaRentInfo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

//const Slider = lazy(() => import('@/components/index/slider/slider'));
const TreeStep = lazy(() => import("@/components/index/treestep/treestep"));
const Villa = lazy(() => import("@/components/index/villa/villa"));
const Regions = lazy(() => import("@/components/index/region/region"));
const Apart = lazy(() => import("@/components/index/apart/apart"));
const Service = lazy(() => import("@/components/index/service/service"));
const Blog = lazy(() => import("@/components/index/blog/blog"));
const VillaRent = lazy(() =>
  import("@/components/index/villaRentInfo/villaRentInfo")
);

import "@/styles/styles.css";
import {
  getVillas,
  getNewVillas,
  getVillasHome,
  getHotels,
} from "@/services/villa";
import { getCategoriesHome } from "@/services/category";
import Seo from "@/components/seo";
import { getRegions } from "@/services/region";
import { getBlogs } from "@/services/blog";
import { getTestimonials } from "@/services/testimonial";
import { lazy, Suspense } from "react";

export default function Home({
  villa,
  categories,
  regions,
  blogs,
  newVillas,
  testimonials,
  aparts,
}) {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;
  return (
    <>
      <Seo
        pageTitle={"Labirent Fethiye"}
        pageDesc={"Labirent Fethiye Villalar"}
      />

      <Slider />
      <Suspense fallback={<div>loading</div>}>
        <section id="contentContainer">
          <TreeStep />
          <Villa category={categories} villas={villa} />
          <Regions homePage={true} regions={regions} />
          <Apart aparts={aparts} />
          <Service />
          {/* <NewVillas villas={newVillas} /> */}
          {/* <Testimonial testimonials={testimonials} /> */}
          <Blog blog={blogs} />
          <VillaRent />
        </section>
      </Suspense>
    </>
  );
}
// export async function getServerSideProps() {
//   const categories = await getCategoriesHome();
//   const villa = await getVillasHome(8, 0, categories?.data[0]?.id);
//   const aparts = await getHotels(0, 4);
//   const regions = await getRegions();
//   const blogs = await getBlogs();
//   //const newVillas = await getNewVillas()
//   //const testimonials = await getTestimonials()
//   return { props: { villa, categories, blogs, regions, aparts } };
// }

export async function getServerSideProps({ locale }) {
  // API çağrılarını paralel olarak başlat
  const categories = await getCategoriesHome();

  const [villa, aparts, regions, blogs] = await Promise.all([
    getVillasHome(8, 0, categories?.data[0]?.id),
    getHotels(0, 4),
    getRegions(),
    getBlogs(),
  ]);

  // Gerekiyorsa yeni veriler için yorum satırlarını açabilirsiniz
  // const newVillas = await getNewVillas()
  // const testimonials = await getTestimonials()

  return {
    props: {
      villa,
      categories,
      blogs,
      regions,
      aparts,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
