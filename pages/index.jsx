import Slider from "@/components/index/slider/slider"
import TreeStep from "@/components/index/treestep/treestep"
import Villa from "@/components/index/villa/villa"
import Regions from "@/components/index/region/region"
import Apart from "@/components/index/apart/apart"
import Service from "@/components/index/service/service"
import NewVillas from "@/components/index/newest/newest"
import Testimonial from "@/components/index/testimonial/testimonial"
import Blog from "@/components/index/blog/blog";
import VillaRent from "@/components/index/villaRentInfo/villaRentInfo";

import "@/styles/styles.css"
import { getVillas, getNewVillas, getVillasHome } from "@/services/villa"
import { getCategoriesHome } from "@/services/category"
import Seo from "@/components/seo"
import { getRegions } from "@/services/region"
import { getBlogs } from "@/services/blog"
import { getTestimonials } from "@/services/testimonial"

export default function Home({ villa, categories, regions, blogs, newVillas, testimonials }) {
    return (
        <>
            <Seo pageTitle={'Labirent Fehiye'} pageDesc={'Labirent Fethiye Villalar'} />
            <Slider />
            <section id="contentContainer">
                <TreeStep />
                <Villa category={categories} villas={villa} />
                {/* <Regions homePage={true} regions={regions} /> */}
                <Apart />
                <Service />
                {/* <NewVillas villas={newVillas} /> */}
                {/* <Testimonial testimonials={testimonials} /> */}
                {/* <Blog blog={blogs} /> */}
                <VillaRent />
            </section>
        </>
    )
}
export async function getServerSideProps() {
    const categories = await getCategoriesHome()
    const villa = await getVillasHome(8, 1, categories?.data[0]?.id)
    //const regions = await getRegions()
    //const blogs = await getBlogs()
    //const newVillas = await getNewVillas()
    //const testimonials = await getTestimonials()
    return { props: { villa, categories } }
}
