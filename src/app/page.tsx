
import { getBrands } from "./actions/brands/get-brands.action";
import { Brand } from "@/services/brandService";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";
import HeroSection from "@/components/dashboard/HeroSection";
import StatsCards from "@/components/dashboard/StatsCards";
import RecentBrands from "@/components/dashboard/RecentBrands";

export default async function Home() {
  const { brands } = await getBrands({ take: 5, skip: 1 });
  const totalBrands = brands.length;
  const activeBrands = brands.filter((brand: Brand) => brand.status).length;
  const inactiveBrands = totalBrands - activeBrands;

  return (
    <div className="min-h-screen page-gradient p-4 md:p-6 lg:p-8">
      <div className="container-optimized space-y-8">
        <DashboardBreadcrumb />
        <HeroSection />
        <StatsCards
          totalBrands={totalBrands}
          activeBrands={activeBrands}
          inactiveBrands={inactiveBrands}
        />
        <RecentBrands brands={brands} />
      </div>
    </div>
  );
}
