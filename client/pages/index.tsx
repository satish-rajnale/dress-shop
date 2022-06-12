import { InferGetStaticPropsType } from 'next';

import { Categories } from '@/components/category';
import { Meta, MobileBottomMenu } from '@/components/core';
import { ProductOverviewSection } from '@/components/home';
import { Banners, Container, Heading } from '@/components/ui';
import { useScrollRestoration } from '@/hooks';
import { BannerService, CategoryService, ProductService } from '@/services';
import UPIQR from './upiQR';

const Home = ({
  banners,
  categories,
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  useScrollRestoration();

 

  

 





  return (
    <>
      <Meta />
      <script src="https://unpkg.com/qrcode@1.4.4/build/qrcode.js" charSet="utf-8"></script>
      <Banners banners={banners} />
      <Container>
        <UPIQR/>
      <button>
              <a href="upi://pay?pa=9136757599@upi&pn=SATISH RAJNALE&am=10&cu=INR" id="__UPI_BUTTON__">
                Pay using UPI
              </a>
            </button>
        <Heading>Categories</Heading>
        <Categories categories={categories} />
        <ProductOverviewSection initialProducts={products} />
      </Container>
      <MobileBottomMenu />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const PAGE = 1;
  const LIMIT = 12;

  const banners = await BannerService.getBanners();
  const categories = await CategoryService.getCategories();
  const products = await ProductService.getProducts({ page: PAGE, limit: LIMIT });

  return {
    props: {
      banners,
      categories,
      products,
    },
    revalidate: 60,
  };
}
