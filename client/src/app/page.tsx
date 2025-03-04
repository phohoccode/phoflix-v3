import SlideShow from "@/components/slide-show/SlideShow";
import { fetchSlideShow } from "@/lib/actions/fetchDataMovie";

const Page = async () => {
  // const data = await fetchSlideShow();
  // console.log(data);

  return (
    <div>
      <SlideShow />
      <div></div>
    </div>
  );
};

export default Page;
