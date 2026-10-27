import { Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

import SiteLayout from "../components/policybazaar/SiteLayout";
import VehicleInsurancePage from "../pages/policybazaar/VehicleInsurancePage";
import ClaimsSupportPage from "../pages/policybazaar/ClaimsSupportPage";
import HealthInsurancePage from "../pages/policybazaar/HealthInsurancePage";
import HomePage from "../pages/policybazaar/HomePage";
import CompareQuotesPage from "../pages/policybazaar/CompareQuotesPage";
import LifeInsurancePage from "../pages/policybazaar/LifeInsurancePage";
import InvestmentSavingsPage from "../pages/policybazaar/InvestmentSavingsPage";
import TravelInsurancePage from "../pages/policybazaar/TravelInsurancePage";
import HomeInsurancePage from "../pages/policybazaar/HomeInsurancePage";
import CalculatorsPage from "../pages/CalculatorsPage";

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/health-insurance"
            element={<HealthInsurancePage />}
          />

          <Route
            path="/car-insurance"
            element={
              <Navigate
                to="/vehicle-insurance?variant=car"
                replace
              />
            }
          />

          <Route
            path="/vehicle-insurance"
            element={<VehicleInsurancePage />}
          />

          <Route
            path="/life-insurance"
            element={<LifeInsurancePage />}
          />

          <Route
            path="/investment-savings"
            element={<InvestmentSavingsPage />}
          />

          <Route
            path="/travel-insurance"
            element={<TravelInsurancePage />}
          />

          <Route
            path="/claims-support"
            element={<ClaimsSupportPage />}
          />

          <Route
            path="/compare-quotes"
            element={<CompareQuotesPage />}
          />

          <Route
            path="/home-insurance"
            element={<HomeInsurancePage />}
          />

          <Route
            path="/calculators"
            element={<CalculatorsPage />}
          />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}